// Coding stats, backed by WakaTime.
//
// WakaTime's own docs say never to put the API key on a public site, so it
// stays server-side and the browser only ever sees the trimmed summary below.
// The key identifies the account, which is why the upstream path is
// /users/current — no username needs to be configured anywhere.
//
// Set WAKATIME_API_KEY in the Vercel project to switch this on. Without it the
// route reports 501 and the card simply doesn't render, same as the comments
// store before it was configured.
//
// GET /api/wakatime[?range=last_7_days] -> { range, total, dailyAverage, languages, editor }

const ALLOWED_RANGES = new Set([
  'last_7_days', 'last_30_days', 'last_6_months', 'last_year', 'all_time',
]);
const TIMEOUT_MS = 8000;

export default async function handler(req, res) {
  const key = process.env.WAKATIME_API_KEY;
  if (!key) return res.status(501).json({ error: 'WakaTime not configured' });

  const range = ALLOWED_RANGES.has(req.query.range) ? req.query.range : 'last_7_days';

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  try {
    const r = await fetch(`https://wakatime.com/api/v1/users/current/stats/${range}`, {
      headers: { Authorization: `Basic ${Buffer.from(key).toString('base64')}` },
      signal: ctrl.signal,
    });

    if (!r.ok) {
      return res.status(502).json({ error: `Upstream ${r.status}` });
    }

    const d = (await r.json())?.data;
    if (!d) return res.status(502).json({ error: 'Unexpected upstream payload' });

    // WakaTime recalculates in the background and serves partial numbers while
    // it does; surface that so the UI can say so rather than show a wrong total.
    const stale = d.is_up_to_date === false;

    // Deliberately narrow: the raw payload carries account details that have no
    // business reaching the browser.
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');
    return res.json({
      range,
      stale,
      total: d.human_readable_total || '0 hrs',
      totalSeconds: d.total_seconds ?? 0,
      dailyAverage: d.human_readable_daily_average || '0 hrs',
      languages: (d.languages || [])
        .slice(0, 5)
        .map((l) => ({ name: l.name, percent: Math.round(l.percent * 10) / 10, text: l.text })),
      editor: d.editors?.[0]?.name || null,
    });
  } catch (e) {
    const timedOut = e.name === 'AbortError';
    return res.status(timedOut ? 504 : 502).json({ error: timedOut ? 'Upstream timed out' : e.message });
  } finally {
    clearTimeout(timer);
  }
}
