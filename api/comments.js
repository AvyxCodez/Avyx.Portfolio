// Comments API backed by Vercel/Upstash Redis (REST).
// GET    /api/comments                 -> { comments: [...] }
// POST   /api/comments {name, message} -> { comment }
// DELETE /api/comments?id=<id>         -> { deleted } (requires x-admin-key header matching ADMIN_KEY env)

const store = () => {
  const env = process.env;
  if (env.KV_REST_API_URL && env.KV_REST_API_TOKEN) return { url: env.KV_REST_API_URL, token: env.KV_REST_API_TOKEN };
  if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) return { url: env.UPSTASH_REDIS_REST_URL, token: env.UPSTASH_REDIS_REST_TOKEN };
  // Any custom prefix from the Vercel integration: <PREFIX>_REST_API_URL + <PREFIX>_REST_API_TOKEN
  const urlKey = Object.keys(env).find((k) => k.endsWith('_REST_API_URL') && env[k.replace(/_URL$/, '_TOKEN')]);
  if (urlKey) return { url: env[urlKey], token: env[urlKey.replace(/_URL$/, '_TOKEN')] };
  return null;
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

    if (req.method === 'DELETE') {
      const adminKey = process.env.ADMIN_KEY;
      if (!adminKey) return res.status(501).json({ error: 'Moderation not configured' });
      if (req.headers['x-admin-key'] !== adminKey) return res.status(401).json({ error: 'Invalid admin key' });

      const id = String(req.query.id || '');
      if (!id) return res.status(400).json({ error: 'id required' });

      // Find the exact stored string for this id, then remove that one entry
      const raw = (await cmd(s, ['LRANGE', 'comments', '0', '499'])) || [];
      const target = raw.find((x) => { try { return JSON.parse(x).id === id; } catch { return false; } });
      if (!target) return res.status(404).json({ error: 'Comment not found' });
      await cmd(s, ['LREM', 'comments', '1', target]);
      return res.json({ deleted: id });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(502).json({ error: e.message });
  }
}
