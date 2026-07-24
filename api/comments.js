// Comments API backed by Vercel/Upstash Redis (REST).
// GET  /api/comments        -> { comments: [...] }
// POST /api/comments {name, message} -> { comment }

const store = () => {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
};

const cmd = async (s, command) => {
  const r = await fetch(s.url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${s.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  if (!r.ok) throw new Error(`store ${r.status}`);
  return (await r.json()).result;
};

export default async function handler(req, res) {
  const s = store();
  if (!s) return res.status(503).json({ error: 'Comments store not configured yet' });

  try {
    if (req.method === 'GET') {
      const raw = (await cmd(s, ['LRANGE', 'comments', '0', '499'])) || [];
      const comments = raw
        .map((x) => { try { return JSON.parse(x); } catch { return null; } })
        .filter(Boolean);
      res.setHeader('Cache-Control', 'no-store');
      return res.json({ comments });
    }

    if (req.method === 'POST') {
      const { name, message } = req.body || {};
      const cleanName = String(name || '').trim().slice(0, 32);
      const cleanMsg = String(message || '').trim().slice(0, 200);
      if (!cleanName || !cleanMsg) return res.status(400).json({ error: 'Name and message required' });

      // Light anti-spam: one comment per IP per 30s
      const ip = String(req.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim();
      const firstInWindow = await cmd(s, ['SET', `cooldown:${ip}`, '1', 'EX', '30', 'NX']);
      if (firstInWindow !== 'OK') return res.status(429).json({ error: 'Slow down — try again in a moment.' });

      const comment = {
        id: crypto.randomUUID(),
        name: cleanName,
        message: cleanMsg,
        created_at: new Date().toISOString(),
      };
      await cmd(s, ['LPUSH', 'comments', JSON.stringify(comment)]);
      await cmd(s, ['LTRIM', 'comments', '0', '499']);
      return res.status(201).json({ comment });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(502).json({ error: e.message });
  }
}
