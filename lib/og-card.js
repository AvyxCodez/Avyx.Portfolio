// Element tree and data for the link-preview card.
//
// Kept apart from api/og.js so it carries no @vercel/og import: that package
// only loads under the Edge runtime, and keeping this module plain lets the
// card be rendered and checked locally through satori directly.
//
// No JSX on purpose — `h` produces exactly what JSX compiles to, so this needs
// no transpile step and behaves identically in both places.

export const DISCORD_USER_ID = '825785012468056155';
export const ACCENT = '#60a5fa';
export const SPOTIFY_GREEN = '#1DB954';
export const FONT_BASE = 'https://cdn.jsdelivr.net/npm/@fontsource/geist@5.0.1/files';
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export const h = (type, props, ...children) => ({
  type,
  props: { ...props, ...(children.length ? { children: children.flat().filter(Boolean) } : {}) },
});

const STATUS = {
  online: { color: '#34d399', label: 'Online' },
  idle: { color: '#fbbf24', label: 'Idle' },
  dnd: { color: '#f87171', label: 'Do Not Disturb' },
  offline: { color: '#71717a', label: 'Offline' },
};

// Nothing here may take the image down — a generic card beats a broken one.
const safeJson = async (url) => {
  try {
    const r = await fetch(url);
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  }
};

export async function fetchCardData(origin) {
  const [lanyard, counter] = await Promise.all([
    safeJson(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`),
    origin ? safeJson(`${origin}/api/counter?action=get`) : null,
  ]);

  const p = lanyard?.data || {};
  const user = p.discord_user || {};
  return {
    status: STATUS[p.discord_status] || STATUS.offline,
    spotify: p.listening_to_spotify ? p.spotify : null,
    views: typeof counter?.count === 'number' ? counter.count.toLocaleString('en-US') : null,
    avatar: user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
      : 'https://cdn.discordapp.com/embed/avatars/3.png',
  };
}

export function buildCard({ status, spotify, views, avatar }) {
  const row = (...kids) => h('div', { style: { display: 'flex', alignItems: 'center' } }, ...kids);

  return h(
    'div',
    {
      style: {
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '72px 80px',
        background: 'linear-gradient(135deg, #0a0d16 0%, #05060a 55%, #08080c 100%)',
        color: '#ffffff', fontFamily: 'Geist',
      },
    },

    // Identity
    row(
      h('img', {
        src: avatar, width: 168, height: 168,
        style: { borderRadius: 84, border: `4px solid ${ACCENT}55` },
      }),
      h('div', { style: { display: 'flex', flexDirection: 'column', marginLeft: 40 } },
        h('div', { style: { display: 'flex', fontSize: 72, fontWeight: 600, letterSpacing: -2 } }, 'AvyxCodez'),
        h('div', { style: { display: 'flex', alignItems: 'center', marginTop: 14, fontSize: 28, color: '#a1a1aa' } },
          h('div', { style: { width: 16, height: 16, borderRadius: 8, background: status.color, marginRight: 12 } }),
          status.label,
          h('div', { style: { display: 'flex', margin: '0 14px', color: '#3f3f46' } }, '/'),
          'Developer, Denver'
        )
      )
    ),

    // What's happening right now, when there's something to say
    spotify
      ? row(
          spotify.album_art_url
            ? h('img', { src: spotify.album_art_url, width: 96, height: 96, style: { borderRadius: 16 } })
            : null,
          h('div', { style: { display: 'flex', flexDirection: 'column', marginLeft: 24 } },
            h('div', { style: { display: 'flex', fontSize: 22, color: SPOTIFY_GREEN, letterSpacing: 2 } }, 'LISTENING ON SPOTIFY'),
            h('div', { style: { display: 'flex', fontSize: 34, fontWeight: 600, marginTop: 8 } },
              String(spotify.song || '').slice(0, 46)),
            h('div', { style: { display: 'flex', fontSize: 26, color: '#a1a1aa', marginTop: 4 } },
              String(spotify.artist || '').replace(/;\s*/g, ', ').slice(0, 52))
          )
        )
      : h('div', { style: { display: 'flex', fontSize: 32, color: '#71717a', maxWidth: 900 } },
          'Building things for the web — open to work.'),

    // Footer
    h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 26 } },
      h('div', { style: { display: 'flex', color: ACCENT, fontWeight: 600 } }, 'avyx.lol'),
      h('div', { style: { display: 'flex', color: '#52525b' } }, views ? `${views} views` : '')
    )
  );
}

export async function loadFonts() {
  const [regular, semibold] = await Promise.all([
    fetch(`${FONT_BASE}/geist-latin-400-normal.woff`).then((r) => r.arrayBuffer()),
    fetch(`${FONT_BASE}/geist-latin-600-normal.woff`).then((r) => r.arrayBuffer()),
  ]);
  return [
    { name: 'Geist', data: regular, weight: 400, style: 'normal' },
    { name: 'Geist', data: semibold, weight: 600, style: 'normal' },
  ];
}
