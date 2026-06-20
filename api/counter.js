export default async function handler(req, res) {
  const { action } = req.query;
  if (action !== 'get' && action !== 'hit') {
    return res.status(400).json({ error: 'Invalid action' });
  }

  const base = 'https://api.counterapi.dev/v1/avyx-bio/views';
  const url = action === 'hit' ? `${base}/up` : base;

  try {
    const r = await fetch(url);
    const text = await r.text();
    if (!r.ok) {
      return res.status(502).json({ error: `Upstream ${r.status}`, detail: text.slice(0, 300) });
    }
    const data = JSON.parse(text);
    res.setHeader('Cache-Control', 'no-store');
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
}
