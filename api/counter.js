// View counter, backed by CounterAPI v2.
//
// CounterAPI retired v1 on 2026-08-07 — it now answers every request with 410,
// which is what silently blanked the counter on the site. Three things changed
// with the move to /v2/<workspace>/<counter>:
//   - counters live in a workspace you create on counterapi.dev, and neither
//     the workspace nor the counter is created on first hit (both 404 instead)
//   - the payload is {code, data: {up_count, down_count, ...}} — the flat
//     `count` field v1 returned is gone
//   - increments are cache-buffered upstream, so the value echoed back by /up
//     can briefly lag the write
//
// The v1 total didn't survive the cutover and isn't recoverable through the
// API, so VIEW_OFFSET is added to whatever v2 reports to keep the number the
// site displays continuous with what it showed before.
//
// GET /api/counter?action=get -> { count }  read, no increment
// GET /api/counter?action=hit -> { count }  increment, then report

const WORKSPACE = process.env.COUNTER_WORKSPACE || 'avyxjss-team-4973';
// The counter's URL slug, not its display name — this is the one CounterAPI
// created at signup ("First Counter"); renaming it in the dashboard is fine,
// but changing the slug means updating this.
const COUNTER = process.env.COUNTER_NAME || 'first-counter-4973';
// v1's total (~200 at the cutover) is gone and unrecoverable, so carry it as a
// baseline on top of the fresh v2 count rather than visibly restarting at zero.
// Checked for NaN rather than falsiness so COUNTER_OFFSET=0 can switch it off.
const parsedOffset = Number.parseInt(process.env.COUNTER_OFFSET ?? '', 10);
const VIEW_OFFSET = Number.isNaN(parsedOffset) ? 200 : parsedOffset;

export default async function handler(req, res) {
  const { action } = req.query;
  if (action !== 'get' && action !== 'hit') {
    return res.status(400).json({ error: 'Invalid action' });
  }

  // CounterAPI caches reads server-side per URL path (10 min on the paths they
  // document), so a plain read can sit frozen well after the count has moved —
  // which reads as "the counter is broken again". A unique param per request
  // sidesteps that cache; at one call per page load this site stays far below
  // the 600 req/min limit. Writes are still buffered upstream regardless, so
  // the value echoed back can trail the visitor's own hit by a moment.
  const base = `https://api.counterapi.dev/v2/${WORKSPACE}/${COUNTER}`;
  const url = `${action === 'hit' ? `${base}/up` : base}?_=${Date.now()}`;

  // Public counters read and increment anonymously; a key is only needed if the
  // counter is private. Send it when it's configured so either setup works.
  const headers = {};
  if (process.env.COUNTER_API_KEY) {
    headers.Authorization = `Bearer ${process.env.COUNTER_API_KEY}`;
  }

  try {
    const r = await fetch(url, { headers });
    const text = await r.text();
    if (!r.ok) {
      return res.status(502).json({ error: `Upstream ${r.status}`, detail: text.slice(0, 300) });
    }

    const up = JSON.parse(text)?.data?.up_count;
    if (typeof up !== 'number') {
      return res.status(502).json({ error: 'Unexpected upstream payload', detail: text.slice(0, 300) });
    }

    res.setHeader('Cache-Control', 'no-store');
    res.json({ count: up + VIEW_OFFSET });
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
}
