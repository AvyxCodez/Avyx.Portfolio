export default async function handler(req, res) {
  const { action } = req.query;
  if (action !== 'get' && action !== 'hit') {
    return res.status(400).json({ error: 'Invalid action' });
  }

  try {
    const r = await fetch(`https://api.counterapi.dev/${action}/avyx-bio/views`);
    const data = await r.json();
    res.setHeader('Cache-Control', 'no-store');
    res.json(data);
  } catch {
    res.status(502).json({ error: 'Failed to reach counter API' });
  }
}
