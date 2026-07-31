// Server-side proxy for LRCLIB (synced lyrics).
// Keeps the browser out of CORS territory and lets us send the User-Agent
// LRCLIB asks integrations to identify themselves with.
//
// GET /api/lrclib?endpoint=get&artist_name=..&track_name=..[&duration=]
// GET /api/lrclib?endpoint=search&q=..

const ALLOWED = new Set(['get', 'search']);
const UPSTREAM = 'https://lrclib.net/api';
const TIMEOUT_MS = 8000;

export default async function handler(req, res) {
  const { endpoint, ...params } = req.query;
  if (!ALLOWED.has(endpoint)) {
    return res.status(400).json({ error: 'Invalid endpoint' });
  }

  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    const val = Array.isArray(v) ? v[0] : v;
    if (val != null && val !== '') qs.set(k, val);
  }

  // LRCLIB has been known to hang rather than fail fast — don't let a stuck
  // upstream hold the function open for the full platform timeout.
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  try {
    const r = await fetch(`${UPSTREAM}/${endpoint}?${qs}`, {
      headers: { 'User-Agent': 'avyx.lol (https://github.com/AvyxCodez/Avyx.Portfolio)' },
      signal: ctrl.signal,
    });

    // 404 is a real answer ("no such track"), not an error — cache it briefly.
    if (r.status === 404) {
      res.setHeader('Cache-Control', 'public, s-maxage=300');
      return res.status(404).json({ error: 'Not found' });
    }
    if (!r.ok) return res.status(502).json({ error: `Upstream ${r.status}` });

    // Lyrics don't change. Cache hard at the edge so an LRCLIB outage doesn't
    // take the feature down for tracks we've already resolved once.
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(await r.text());
  } catch (e) {
    const timedOut = e.name === 'AbortError';
    return res.status(504).json({ error: timedOut ? 'Upstream timed out' : e.message });
  } finally {
    clearTimeout(timer);
  }
}
