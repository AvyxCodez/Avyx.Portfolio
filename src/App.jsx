import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, animate } from "motion/react";
import { Particles } from './components/Particles';
import useCanvasCursor from "./components/useCanvasCursor";
import Comments from "./components/Comments";
import Oneko from "./components/Oneko";


function DiscordBadgeIcon({ icon }) {
  const W = 'white';
  const badges = {
    'nitro': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3 L14.5 9 L21 9.5 L16.5 14 L18 20 L12 16.8 L6 20 L7.5 14 L3 9.5 L9.5 9 Z" fill={W}/>
      </svg>
    ),
    'hypesquad-bravery': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2 L21 7 L21 14 L12 21 L3 14 L3 7 Z" fill={W} opacity="0.15"/>
        <path d="M12 2 L21 7 L21 14 L12 21 L3 14 L3 7 Z" stroke={W} strokeWidth="1.5" fill="none"/>
        <path d="M12 7.5 L16 10 L16 14.5 L12 17 L8 14.5 L8 10 Z" fill={W}/>
      </svg>
    ),
    'hypesquad-brilliance': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2 L21 7 L21 14 L12 21 L3 14 L3 7 Z" fill={W} opacity="0.15"/>
        <path d="M12 2 L21 7 L21 14 L12 21 L3 14 L3 7 Z" stroke={W} strokeWidth="1.5" fill="none"/>
        <path d="M12 7.5 L16 10 L16 14.5 L12 17 L8 14.5 L8 10 Z" fill={W}/>
      </svg>
    ),
    'hypesquad-balance': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2 L21 7 L21 14 L12 21 L3 14 L3 7 Z" fill={W} opacity="0.15"/>
        <path d="M12 2 L21 7 L21 14 L12 21 L3 14 L3 7 Z" stroke={W} strokeWidth="1.5" fill="none"/>
        <path d="M12 7.5 L16 10 L16 14.5 L12 17 L8 14.5 L8 10 Z" fill={W}/>
      </svg>
    ),
    'hypesquad-events': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2 L21 7 L21 17 L12 22 L3 17 L3 7 Z" stroke={W} strokeWidth="1.5" fill={W} fillOpacity="0.15"/>
        <text x="12" y="16" textAnchor="middle" fill={W} fontSize="9" fontFamily="Arial Black,sans-serif" fontWeight="900">H</text>
      </svg>
    ),
    'early-supporter': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19 L5.5 12.5 C3.5 10.5 3.5 7.5 5.5 5.5 C7.5 3.5 10.5 3.5 12 5.5 C13.5 3.5 16.5 3.5 18.5 5.5 C20.5 7.5 20.5 10.5 18.5 12.5 Z" fill={W}/>
      </svg>
    ),
    'bug-hunter': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="14" rx="5" ry="6" fill={W}/>
        <circle cx="12" cy="7.5" r="2.5" fill={W}/>
        <line x1="7" y1="11" x2="3.5" y2="9" stroke={W} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="17" y1="11" x2="20.5" y2="9" stroke={W} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="7" y1="14" x2="3.5" y2="14" stroke={W} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="17" y1="14" x2="20.5" y2="14" stroke={W} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'bug-hunter-gold': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="14" rx="5" ry="6" fill={W}/>
        <circle cx="12" cy="7.5" r="2.5" fill={W}/>
        <line x1="7" y1="11" x2="3.5" y2="9" stroke={W} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="17" y1="11" x2="20.5" y2="9" stroke={W} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="7" y1="14" x2="3.5" y2="14" stroke={W} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="17" y1="14" x2="20.5" y2="14" stroke={W} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'active-developer': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 9 L4.5 12 L8 15" stroke={W} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 9 L19.5 12 L16 15" stroke={W} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="13.5" y1="7" x2="10.5" y2="17" stroke={W} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    'early-verified-developer': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 9 L4.5 12 L8 15" stroke={W} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 9 L19.5 12 L16 15" stroke={W} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="13.5" y1="7" x2="10.5" y2="17" stroke={W} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    'discord-staff': (
      <svg viewBox="0 0 24 24" fill={W} xmlns="http://www.w3.org/2000/svg">
        <path d="M20.32 4.37A19.8 19.8 0 0 0 16.1 3c-.17.3-.37.7-.51 1.02a18.3 18.3 0 0 0-5.18 0A10.7 10.7 0 0 0 9.9 3a19.6 19.6 0 0 0-4.23 1.38C3.89 7.06 3.47 9.7 3.67 12.3a19.9 19.9 0 0 0 5.95 2.96 15.3 15.3 0 0 0 1.34-2.14 13 13 0 0 1-2.1-.99c.18-.13.35-.26.51-.4a14.3 14.3 0 0 0 12.26 0c.17.14.34.27.51.4-.67.39-1.38.72-2.11 1a15.3 15.3 0 0 0 1.34 2.14 19.8 19.8 0 0 0 5.96-2.97c.25-2.98-.43-5.6-1.91-7.93ZM8.68 10.78c-.63 0-1.15-.57-1.15-1.27s.5-1.27 1.15-1.27c.64 0 1.16.57 1.15 1.27 0 .7-.51 1.27-1.15 1.27Zm6.64 0c-.64 0-1.15-.57-1.15-1.27s.5-1.27 1.15-1.27c.64 0 1.15.57 1.15 1.27 0 .7-.51 1.27-1.15 1.27Z"/>
      </svg>
    ),
    'partnered-server-owner': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2 L14.5 8.5 L21.5 9 L16.5 14 L18 21 L12 17.5 L6 21 L7.5 14 L2.5 9 L9.5 8.5 Z" fill={W}/>
      </svg>
    ),
    'certified-moderator': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2 L20 5.5 L20 12 C20 16.5 16.5 20 12 22 C7.5 20 4 16.5 4 12 L4 5.5 Z" fill={W} fillOpacity="0.15" stroke={W} strokeWidth="1.5"/>
        <path d="M8.5 12 L11 14.5 L15.5 9.5" stroke={W} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'quest': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19 C10 19 7 17 5.5 14.5 C4 12 4.5 9 6 7" stroke={W} strokeWidth="1.6" strokeLinecap="round"/>
        <ellipse cx="5.8" cy="8"    rx="2" ry="1.1" transform="rotate(-50 5.8 8)"    fill={W}/>
        <ellipse cx="5.2" cy="11"   rx="2" ry="1.1" transform="rotate(-30 5.2 11)"   fill={W}/>
        <ellipse cx="6.3" cy="14"   rx="2" ry="1.1" transform="rotate(-10 6.3 14)"   fill={W}/>
        <path d="M12 19 C14 19 17 17 18.5 14.5 C20 12 19.5 9 18 7" stroke={W} strokeWidth="1.6" strokeLinecap="round"/>
        <ellipse cx="18.2" cy="8"   rx="2" ry="1.1" transform="rotate(50 18.2 8)"    fill={W}/>
        <ellipse cx="18.8" cy="11"  rx="2" ry="1.1" transform="rotate(30 18.8 11)"   fill={W}/>
        <ellipse cx="17.7" cy="14"  rx="2" ry="1.1" transform="rotate(10 17.7 14)"   fill={W}/>
        <path d="M9.5 19.5 Q12 21.5 14.5 19.5" stroke={W} strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  };

  return badges[icon] || (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" fill={W}/>
    </svg>
  );
}

const SITE_CONFIG = {
  username: "AvyxCodez",
  // Stable fallback while the live Discord avatar loads (attachment links expire)
  pfp: "https://cdn.discordapp.com/embed/avatars/3.png",
  bgType: "video",
  bgValue: "https://pub-ecdd182e7e304629985ed5bec0ca9790.r2.dev/Nbr2j1.mp4",
};

const DISCORD_USER_ID = "825785012468056155";

const ACCENT = "#60a5fa";

const SPOTIFY_GREEN = "#1DB954";

const IS_DEV = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const fadeTexts = ["Welcome", "Open to work"];

// Letters lift and sharpen one after another instead of the word fading in as
// a block — a stagger reads as deliberate where a crossfade reads as flicker.
const FADE_LETTER = {
  out: { opacity: 0, y: 14, filter: 'blur(8px)' },
  in: { opacity: 1, y: 0, filter: 'blur(0px)' },
};
// Exit runs quicker and in reverse, so a word peels away from the end rather
// than replaying its entrance backwards.
const FADE_WORD = {
  in: { transition: { staggerChildren: 0.042, delayChildren: 0.04 } },
  out: { transition: { staggerChildren: 0.022, staggerDirection: -1 } },
};

const songs = [
  // lrcTitle/lrcArtist override the display metadata when looking lyrics up —
  // LRCLIB indexes canonical track titles and a single primary artist.
  {
    id: 1,
    title: "Exit Music",
    artist: "Radiohead",
    lrcTitle: "Exit Music (For a Film)",
    url: "https://lumora-io.vercel.app/f/JUFbTc.mp3",
    albumArt: "/art-exit-music.jpeg",
  },

  {
    id: 2,
    title: "Runaway",
    artist: "Kanye West",
    url: "https://lumora-io.vercel.app/f/bArxSo.mp3",
    albumArt: "/art-runaway.jpg",
  },

  {
    id: 3,
    title: "Young Forever",
    artist: "JAY-Z, Mr Hudson",
    lrcArtist: "JAY-Z",
    url: "https://lumora-io.vercel.app/f/SBwQje.mp3",
    albumArt: "/art-young-forever.jpg",
  },
];

const skills = [
  { name: 'Python',       pct: 85 },
  { name: 'JavaScript',   pct: 90 },
  { name: 'TypeScript',   pct: 98 },
  { name: 'React',        pct: 88 },
  { name: 'Tailwind CSS', pct: 92 },
  { name: 'Node.js',      pct: 72 },
];

// Icon + brand color per skill for the About tag pills
const skillMeta = {
  'Python':       { icon: 'fa-brands fa-python',  color: '#4B8BBE' },
  'JavaScript':   { icon: 'fa-brands fa-js',       color: '#F7DF1E' },
  'TypeScript':   { icon: 'fa-solid fa-code',      color: '#3178C6' },
  'React':        { icon: 'fa-brands fa-react',    color: '#61DAFB' },
  'Tailwind CSS': { icon: 'fa-solid fa-wind',      color: '#38BDF8' },
  'Node.js':      { icon: 'fa-brands fa-node-js',  color: '#3C873A' },
  'Next.js':      { icon: 'fa-brands fa-react',    color: '#ffffff' },
};

const projects = [
  {
    id: 1,
    title: 'Lumora',
    tagline: 'A cozy little home for your files.',
    description: 'Drop a file, get a link — that\'s the whole thing. Instant file sharing with no account required, optional self-destructing uploads, and zero ads or tracking.',
    tags: ['File Sharing', 'No Signup', '200MB Limit', 'Self-Destruct Uploads'],
    stack: ['Next.js', 'TypeScript', 'Node.js'],
    url: 'https://lumora-io.vercel.app/',
    icon: 'fa-solid fa-link',
    color: '#60a5fa',
  },
];

const gameLibrary = [
  {
    id: 1,
    title: "007 First Light",
    platform: "Steam",
    status: "Playing",
    year: "2026",
    genre: "Action, Adventure",
    description: "A brand new James Bond experience with intense action and cinematic storytelling.",
    cover: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3768760/dbe86ebd2edb4c77d113e9e2feefeb90189fabc9/header.jpg?t=1780990824",
    steamUrl: "https://store.steampowered.com/app/3768760/007_First_Light/"
  },
  {
    id: 2,
    title: "Alan Wake 2",
    platform: "Epic Games",
    status: "Completed",
    year: "2023",
    genre: "Survival Horror, Action",
    description: "A psychological horror game where light is your only weapon against the darkness.",
    cover: "https://www.alanwake.com/wp-content/uploads/2023/05/aw2-standard-800x404.png",
    steamUrl: "https://www.alanwake.com/buy-now-alan-wake-2/#/search&platform=epic-games-store&retail_type=digital"
  },
  {
    id: 3,
    title: "Crimson Desert",
    platform: "Steam",
    status: "Playing",
    year: "2025",
    genre: "Action, Open World",
    description: "An open-world action RPG set in a vast and beautiful fantasy world.",
    cover: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3321460/abd7dbdeaede8b6c9a6d40bf116ff2b883f2dd45/header.jpg?t=1777016399",
    steamUrl: "https://store.steampowered.com/app/3321460/Crimson_Desert/"
  },
  {
    id: 4,
    title: "Forza Horizon 6",
    platform: "Steam",
    status: "Playing",
    year: "2025",
    genre: "Racing, Open World",
    description: "The ultimate open-world racing experience with stunning graphics and hundreds of cars.",
    cover: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2483190/27abb1584a118d50d0e3950fd48d557c51981db7/header.jpg?t=1781040370",
    steamUrl: "https://store.steampowered.com/app/2483190/Forza_Horizon_6/"
  },
  {
    id: 5,
    title: "Mafia: The Old Country",
    platform: "Steam",
    status: "Completed",
    year: "2025",
    genre: "Action, Adventure",
    description: "A gritty crime story set in the brutal world of organized crime in early 1900s America.",
    cover: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1941540/extras/20d9f0060dff8c8613b938f736375f97.avif?t=1780699604",
    steamUrl: "https://store.steampowered.com/app/1941540/Mafia_The_Old_Country/"
  },
  {
    id: 6,
    title: "Undisputed",
    platform: "Steam",
    status: "Completed",
    year: "2024",
    genre: "Sports, Simulation",
    description: "The most authentic boxing simulation game ever made with realistic gameplay.",
    cover: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1451190/header.jpg?t=1766067946",
    steamUrl: "https://store.steampowered.com/app/1451190/Undisputed/"
  }
];

const BADGE_FLAGS = [
  { flag: 1,       icon: 'discord-staff',            label: 'Discord Staff' },
  { flag: 2,       icon: 'partnered-server-owner',   label: 'Partnered Server Owner' },
  { flag: 4,       icon: 'hypesquad-events',         label: 'HypeSquad Events' },
  { flag: 8,       icon: 'bug-hunter',               label: 'Bug Hunter' },
  { flag: 64,      icon: 'hypesquad-bravery',        label: 'HypeSquad Bravery' },
  { flag: 128,     icon: 'hypesquad-brilliance',     label: 'HypeSquad Brilliance' },
  { flag: 256,     icon: 'hypesquad-balance',        label: 'HypeSquad Balance' },
  { flag: 512,     icon: 'early-supporter',          label: 'Early Supporter' },
  { flag: 16384,   icon: 'bug-hunter-gold',          label: 'Bug Hunter Level 2' },
  { flag: 131072,  icon: 'early-verified-developer', label: 'Early Verified Developer' },
  { flag: 262144,  icon: 'certified-moderator',      label: 'Certified Moderator' },
  { flag: 4194304, icon: 'active-developer',         label: 'Active Developer' },
];

// Visitor's own timezone — used for the location badge and clock delta
const visitorTimeZone = (() => {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch { return ''; }
})();
const visitorCity = visitorTimeZone.includes('/')
  ? visitorTimeZone.split('/').pop().replace(/_/g, ' ')
  : (visitorTimeZone || 'Local time');
const formatGmt = (offMin) => {
  const sign = offMin >= 0 ? '+' : '−';
  const abs = Math.abs(offMin);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `GMT${sign}${h}${m ? ':' + String(m).padStart(2, '0') : ''}`;
};

// Parse an LRC blob into sorted {time, text} lines. A single line may carry
// several timestamps (`[00:12.00][01:30.00]same words`) — emit one entry each.
const LRC_STAMP = /\[(\d+):(\d+(?:\.\d+)?)\]/g;
const parseLrc = (raw) => {
  const out = [];
  for (const line of raw.split('\n')) {
    const stamps = [...line.matchAll(LRC_STAMP)];
    if (!stamps.length) continue;
    const text = line.replace(LRC_STAMP, '').trim();
    if (!text) continue;
    for (const s of stamps) {
      out.push({ time: parseInt(s[1], 10) * 60 + parseFloat(s[2]), text });
    }
  }
  return out.sort((a, b) => a.time - b.time);
};

const formatTime = (t) => {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

const getStatusColor = (s) => s === "Playing"
  ? "bg-emerald-500/90 text-white"
  : s === "Completed"
  ? "bg-blue-500/90 text-white"
  : "bg-purple-500/90 text-white";

function App() {

  const [showEnter, setShowEnter] = useState(true);
  const [showGameLibrary, setShowGameLibrary] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Preloader — real asset load gated with a minimum duration so it never just flashes
  const [siteLoading, setSiteLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;

    // A still background can be waited on outright. A video can't — it streams,
    // so gating the preloader on it would hold the site behind the whole file.
    const bgPromise = SITE_CONFIG.bgType === 'video'
      ? Promise.resolve()
      : new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = SITE_CONFIG.bgValue;
        });
    const minDelay = new Promise((resolve) => setTimeout(resolve, 1600));

    const t0 = performance.now();
    const step = (now) => {
      if (cancelled) return;
      const p = Math.min((now - t0) / 1600, 1);
      setLoadProgress(Math.floor(p * 90));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);

    Promise.all([bgPromise, minDelay]).then(() => {
      if (cancelled) return;
      setLoadProgress(100);
      setTimeout(() => { if (!cancelled) setSiteLoading(false); }, 350);
    });

    return () => { cancelled = true; };
  }, []);

  // Enter on keypress too
  useEffect(() => {
    if (siteLoading || !showEnter) return;
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enterSite(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [siteLoading, showEnter]);

  const [aboutVisible, setAboutVisible] = useState(false);
  const aboutRef = useRef(null);

  const [projectsVisible, setProjectsVisible] = useState(false);
  const projectsRef = useRef(null);

  const [musicVisible, setMusicVisible] = useState(false);
  const musicRef = useRef(null);
  const [showLyrics, setShowLyrics] = useState(false);

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  // Tracked separately from hover so a drag that wanders off the track doesn't
  // collapse the slider mid-adjustment.
  const [volumeDragging, setVolumeDragging] = useState(false);

  useEffect(() => {
    if (!volumeDragging) return;
    const end = () => setVolumeDragging(false);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    return () => {
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
    };
  }, [volumeDragging]);

  // Tilt Effect
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    setTilt({
      x: -y * 14,
      y: x * 20
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const [currentFadeIndex, setCurrentFadeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrentFadeIndex((prev) => (prev + 1) % fadeTexts.length), 3500);
    return () => clearInterval(interval);
  }, []);

  // Fade in effects
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setAboutVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setProjectsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (projectsRef.current) observer.observe(projectsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setMusicVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (musicRef.current) observer.observe(musicRef.current);
    return () => observer.disconnect();
  }, []);

  // Live Clock
  const [clockTime, setClockTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setClockTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // View Counter + Location
  const [views, setViews] = useState(null);
  const [displayViews, setDisplayViews] = useState(0);

  useEffect(() => {
    if (views === null || showEnter) return;
    const end = views, dur = 1200;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplayViews(Math.floor(ease * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [views, showEnter]);

  // On mount: read current count without incrementing
  useEffect(() => {
    if (IS_DEV) {
      setViews(parseInt(localStorage.getItem("avyx-views") || "0"));
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/api/counter?action=get`);
        const data = await res.json();
        const v = data.count ?? data.value;
        if (typeof v === "number") setViews(v);
      } catch {}
    })();
  }, []);

  const incrementViews = () => {
    if (IS_DEV) {
      const next = parseInt(localStorage.getItem("avyx-views") || "0") + 1;
      localStorage.setItem("avyx-views", next);
      setViews(next);
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/api/counter?action=hit`);
        const data = await res.json();
        const v = data.count ?? data.value;
        if (typeof v === "number") setViews(v);
      } catch {}
    })();
  };
  
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  const enterSite = () => {
    setShowEnter(false);
    incrementViews();
    ensureAnalyser(); // create/resume the audio graph within the click gesture
    // The background video carries the sound, so unmute it here and leave the
    // music player stopped. It has to happen inside the click: autoplay is only
    // permitted while muted, and nothing but a user gesture can lift that.
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = volume;
      video.play().catch(() => {});
    }

    setTimeout(() => setShowProfile(true), 350);
  };

  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  // Lyrics — 'loading' | 'ok' | 'none' (track has no synced lyrics) | 'error'
  // (couldn't reach LRCLIB). Keeping those last two apart matters: they used to
  // render the same message, which made an outage look like a missing track.
  const [lyrics, setLyrics] = useState([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [lyricsState, setLyricsState] = useState('loading');
  const [lyricsAttempt, setLyricsAttempt] = useState(0);
  const lyricsCache = useRef(new Map());

  useEffect(() => {
    const song = currentSong;
    const cached = lyricsCache.current.get(song.id);
    if (cached) {
      setLyrics(cached);
      setLyricsState(cached.length ? 'ok' : 'none');
      return;
    }

    let cancelled = false;
    setLyrics([]);
    setLyricsState('loading');

    // Both environments hit the same URL: a Vercel function in prod, a Vite dev proxy locally.
    const call = async (params) => {
      const res = await fetch(`/api/lrclib?${new URLSearchParams(params)}`);
      if (res.status === 404) return null;        // no match — not a failure
      if (!res.ok) throw new Error(`lyrics ${res.status}`);
      return res.json();
    };

    (async () => {
      const track = song.lrcTitle || song.title;
      const artist = song.lrcArtist || song.artist;

      try {
        // Exact lookup first — cheapest, and precise when the metadata lines up.
        // (No duration hint: this runs the moment the track changes, before the
        // audio element has loaded metadata for it.)
        let hit = await call({ endpoint: 'get', artist_name: artist, track_name: track });

        // Otherwise fall back to fuzzy search and take the best synced match.
        if (!hit?.syncedLyrics) {
          const results = (await call({ endpoint: 'search', q: `${track} ${artist}` })) || [];
          hit = results.find((r) => r.syncedLyrics);
        }

        if (cancelled) return;
        const parsed = hit?.syncedLyrics ? parseLrc(hit.syncedLyrics) : [];
        lyricsCache.current.set(song.id, parsed);
        setLyrics(parsed);
        setLyricsState(parsed.length ? 'ok' : 'none');
      } catch (error) {
        if (cancelled) return;
        console.error('Lyrics fetch error:', error);
        setLyricsState('error');
      }
    })();

    return () => { cancelled = true; };
  }, [currentSong, lyricsAttempt]);

  useEffect(() => {
    if (lyrics.length === 0) return;
    let idx = 0;
    for (let i = 0; i < lyrics.length; i++) {
      if (currentTime >= lyrics[i].time) idx = i;
    }
    setCurrentLyricIndex(idx);
  }, [currentTime, lyrics]);

  useEffect(() => {
    if (!lyricsContainerRef.current || !currentLyricRef.current) return;
    const container = lyricsContainerRef.current;
    const cRect = container.getBoundingClientRect();
    const lRect = currentLyricRef.current.getBoundingClientRect();
    const lyricTop = lRect.top - cRect.top + container.scrollTop;
    const targetTop = Math.max(0, lyricTop - container.clientHeight * 0.25);
    const startTop = container.scrollTop;
    const diff = targetTop - startTop;
    if (Math.abs(diff) < 1) return;
    const dur = 440;
    const t0 = performance.now();
    const step = (now) => {
      const t = Math.min((now - t0) / dur, 1);
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      container.scrollTop = startTop + diff * e;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [currentLyricIndex, showLyrics]);

  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const vizDataRef = useRef(null);
  const vizCanvasRef = useRef(null);
  const vizRafRef = useRef(0);
  const snapContainerRef = useRef(null);
  const lyricsContainerRef = useRef(null);
  const currentLyricRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);
  const activeSectionRef = useRef(0);
  const isScrollingRef = useRef(false);
  // Bumped to abandon an in-flight section transition; a running animation
  // stops as soon as it sees the token move on without it.
  const scrollAnimRef = useRef(0);
  const TOTAL_SECTIONS = 4;

  // Force section heights to match window.innerHeight exactly (fixes iOS Safari 100vh vs dvh mismatch)
  useEffect(() => {
    let lastHeight = 0;
    const setSectionHeights = () => {
      const h = window.innerHeight;
      const heightChanged = h !== lastHeight;
      lastHeight = h;
      document.querySelectorAll('.snap-section').forEach(el => {
        el.style.height = `${h}px`;
        el.style.minHeight = `${h}px`;
      });
      const container = snapContainerRef.current;
      if (!container) return;
      container.style.height = `${h}px`;
      if (!heightChanged) return;

      // Sections are stacked at fixed pixel heights, so once those change the
      // scroll offset that pointed at the current one lands between two — a
      // phone rotation would leave the visitor looking at half of each page.
      // Realign on whichever section is meant to be showing, and abandon any
      // transition still running, since it was aiming at the old geometry.
      scrollAnimRef.current++;
      isScrollingRef.current = false;
      const target = container.querySelectorAll('.snap-section')[activeSectionRef.current];
      if (target) container.scrollTop = target.offsetTop;
    };
    setSectionHeights();
    window.addEventListener('resize', setSectionHeights);
    return () => window.removeEventListener('resize', setSectionHeights);
  }, []);

  const smoothScrollTo = (container, targetY, duration = 900) => {
    const token = ++scrollAnimRef.current;
    const startY = container.scrollTop;
    const diff = targetY - startY;
    if (diff === 0) { isScrollingRef.current = false; return; }
    const startTime = performance.now();
    const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (now) => {
      if (scrollAnimRef.current !== token) return;   // superseded — stop animating
      const progress = Math.min((now - startTime) / duration, 1);
      container.scrollTop = startY + diff * ease(progress);
      if (progress < 1) requestAnimationFrame(step);
      else isScrollingRef.current = false;
    };
    requestAnimationFrame(step);
  };

  // The section currently on screen, but only if it genuinely scrolls. The
  // overflow check matters: a section with visible overflow still reports
  // scrollHeight > clientHeight while refusing to scroll, and treating that as
  // scrollable would strand the visitor on it with no way forward.
  const scrollableSection = () => {
    const el = snapContainerRef.current?.querySelectorAll('.snap-section')[activeSectionRef.current];
    if (!el) return null;
    const { overflowY } = getComputedStyle(el);
    if (overflowY !== 'auto' && overflowY !== 'scroll') return null;
    const max = el.scrollHeight - el.clientHeight;
    return max > 1 ? { el, max } : null;
  };

  // True while the section still has room to scroll the way the visitor is
  // going — the page should only advance once they've reached that edge.
  const canScrollWithin = (dir) => {
    const s = scrollableSection();
    if (!s) return false;
    return dir > 0 ? s.el.scrollTop < s.max - 1 : s.el.scrollTop > 1;
  };

  const scrollToSection = (index) => {
    const container = snapContainerRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(TOTAL_SECTIONS - 1, index));
    const goingUp = clamped < activeSectionRef.current;
    activeSectionRef.current = clamped;
    setActiveSection(clamped);
    isScrollingRef.current = true;
    const sections = container.querySelectorAll('.snap-section');
    const target = sections[clamped];
    // Enter a taller-than-viewport section at the edge the visitor is arriving
    // from, so scrolling up through it walks the content instead of skipping it.
    if (target) target.scrollTop = goingUp ? target.scrollHeight - target.clientHeight : 0;
    const targetY = target?.offsetTop ?? clamped * window.innerHeight;
    smoothScrollTo(container, targetY);
  };

  useEffect(() => {
    const container = snapContainerRef.current;
    if (!container) return;
    let touchStartY = 0;
    let touchStartAtTop = true;
    let touchStartAtEnd = true;

    const onWheel = (e) => {
      const dir = e.deltaY > 0 ? 1 : -1;
      // Leave the event alone so the browser scrolls the section natively; the
      // page only moves on once that section has nothing left to show.
      if (canScrollWithin(dir)) return;
      e.preventDefault();
      if (isScrollingRef.current) return;
      scrollToSection(activeSectionRef.current + dir);
    };
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      // Record where the section stands as the gesture begins. Reading this at
      // touchend instead would be wrong: momentum scrolling keeps the section
      // gliding after the finger lifts, so at that moment it still looks like
      // it has room left and the page would never advance.
      const s = scrollableSection();
      touchStartAtTop = !s || s.el.scrollTop <= 2;
      touchStartAtEnd = !s || s.el.scrollTop >= s.max - 2;
    };
    const onTouchEnd = (e) => {
      if (isScrollingRef.current) return;
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 40) return;
      const dir = delta > 0 ? 1 : -1;
      // Swiping from the edge the visitor is heading for changes page; anywhere
      // else in a scrollable section, the swipe belongs to its content.
      if (dir > 0 ? !touchStartAtEnd : !touchStartAtTop) return;
      scrollToSection(activeSectionRef.current + dir);
    };
    const onKey = (e) => {
      if (isScrollingRef.current) return;
      const down = e.key === 'ArrowDown' || e.key === 'PageDown';
      const up = e.key === 'ArrowUp' || e.key === 'PageUp';
      if (!down && !up) return;
      const dir = down ? 1 : -1;
      e.preventDefault();
      // Scroll the section explicitly rather than leaving it to the browser,
      // which only moves a scroll container that happens to hold focus.
      const s = canScrollWithin(dir) ? scrollableSection() : null;
      if (s) {
        s.el.scrollBy({ top: dir * Math.round(s.el.clientHeight * 0.8), behavior: 'smooth' });
        return;
      }
      scrollToSection(activeSectionRef.current + dir);
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  // Music Player Effects
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = currentSong.url;
    audio.volume = volume;
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentLyricIndex(0);
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
    };
  }, [currentSong]);

  // isPlaying mirrors the audio element itself, so UI and sound can never desync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    // The video is audible too, so the volume control has to reach it or it
    // would appear to do nothing while the background is the only sound.
    if (videoRef.current) videoRef.current.volume = volume;
  }, [volume]);

  // Only one of the two should be audible. The music player wins while it's
  // running; the background takes the sound back when it stops. Held off until
  // the visitor is in, since unmuting before that gesture just pauses the video.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || showEnter || SITE_CONFIG.bgType !== 'video') return;
    video.muted = isPlaying;
  }, [isPlaying, showEnter]);

  // Web Audio graph for the visualizer — created once, on the first user gesture
  const ensureAnalyser = () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (!audioCtxRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        const ctx = new Ctx();
        const source = ctx.createMediaElementSource(audio);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.82;
        source.connect(analyser);
        analyser.connect(ctx.destination);
        audioCtxRef.current = ctx;
        analyserRef.current = analyser;
        vizDataRef.current = new Uint8Array(analyser.frequencyBinCount);
      }
      if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
    } catch { /* tainted/unsupported — audio still plays, visualizer stays flat */ }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) { ensureAnalyser(); audio.play().catch(() => {}); }
    else audio.pause();
  };

  // Visualizer draw loop — real frequency bars while the music section is on screen
  useEffect(() => {
    if (!musicVisible) { cancelAnimationFrame(vizRafRef.current); return; }
    const draw = () => {
      const canvas = vizCanvasRef.current;
      if (canvas) {
        const c = canvas.getContext('2d');
        const w = canvas.width, h = canvas.height;
        c.clearRect(0, 0, w, h);
        const analyser = analyserRef.current, data = vizDataRef.current;
        if (analyser && data) analyser.getByteFrequencyData(data);
        const bars = 44, bw = w / bars;
        const usable = data ? Math.floor(data.length * 0.7) : 0;
        for (let i = 0; i < bars; i++) {
          let v = 0;
          if (usable) { v = data[Math.floor((i / bars) * usable)] / 255; v *= v; }
          const barH = Math.max(h * 0.05, v * h);
          const x = i * bw;
          c.fillStyle = `rgba(255,255,255,${0.28 + v * 0.72})`;
          c.fillRect(x + bw * 0.22, h - barH, bw * 0.56, barH);
        }
      }
      vizRafRef.current = requestAnimationFrame(draw);
    };
    vizRafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(vizRafRef.current);
  }, [musicVisible]);

  const handleSeek = (e) => {
    if (audioRef.current) audioRef.current.currentTime = parseFloat(e.target.value);
  };

  const handleVolumeChange = (e) => setVolume(parseFloat(e.target.value));

  const nextSong = () => {
    const i = songs.findIndex(s => s.id === currentSong.id);
    const next = songs[(i + 1) % songs.length];
    setCurrentSong(next);
    setTimeout(() => {
      if (audioRef.current) audioRef.current.play().catch(() => {});
    }, 80);
  };

  const prevSong = () => {
    const i = songs.findIndex(s => s.id === currentSong.id);
    const prev = songs[(i - 1 + songs.length) % songs.length];
    setCurrentSong(prev);
    setTimeout(() => {
      if (audioRef.current) audioRef.current.play().catch(() => {});
    }, 80);
  };

  // ── Media Session — lock-screen / Bluetooth / notification controls ──
  useEffect(() => {
    if (!('mediaSession' in navigator)) return;
    const ms = navigator.mediaSession;
    try {
      ms.metadata = new window.MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist,
        album: currentSong.album || 'avyx.lol',
        artwork: [{ src: new URL(currentSong.albumArt, window.location.origin).href, sizes: '512x512', type: 'image/jpeg' }],
      });
    } catch {}
    const set = (action, handler) => { try { ms.setActionHandler(action, handler); } catch {} };
    set('play', () => { ensureAnalyser(); audioRef.current?.play().catch(() => {}); });
    set('pause', () => audioRef.current?.pause());
    set('previoustrack', () => prevSong());
    set('nexttrack', () => nextSong());
    set('seekto', (e) => { const a = audioRef.current; if (a && e.seekTime != null) a.currentTime = e.seekTime; });
    set('seekbackward', (e) => { const a = audioRef.current; if (a) a.currentTime = Math.max(0, a.currentTime - (e.seekOffset || 10)); });
    set('seekforward', (e) => { const a = audioRef.current; if (a) a.currentTime = Math.min(a.duration || 0, a.currentTime + (e.seekOffset || 10)); });
  }, [currentSong]);

  useEffect(() => {
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
  }, [isPlaying]);

  useEffect(() => {
    if ('mediaSession' in navigator && navigator.mediaSession.setPositionState && duration > 0) {
      try { navigator.mediaSession.setPositionState({ duration, position: Math.min(currentTime, duration), playbackRate: 1 }); } catch {}
    }
  }, [currentTime, duration]);

  const [discordAvatar, setDiscordAvatar] = useState(null);
  const [discordStatus, setDiscordStatus] = useState('offline');
  const [discordBadges, setDiscordBadges] = useState([]);
  const [discordName, setDiscordName] = useState('');
  const [discordUsername, setDiscordUsername] = useState('');
  const [discordActivities, setDiscordActivities] = useState([]);
  const [activityAppIcon, setActivityAppIcon] = useState(null);
  const [spotify, setSpotify] = useState(null);

  // Live Discord presence via Lanyard's WebSocket — status/avatar/badges update in real time
  useEffect(() => {
    let ws, heartbeat, reconnect, closed = false;

    const applyPresence = (p) => {
      if (!p || !p.discord_user) return;
      const { id, avatar, public_flags, premium_type, global_name, username } = p.discord_user;
      if (avatar) setDiscordAvatar(`https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=256`);
      setDiscordName(global_name || '');
      setDiscordUsername(username || '');
      setDiscordStatus(p.discord_status || 'offline');
      setDiscordActivities(p.activities || []);
      // Lanyard hands us a purpose-built spotify object; it's null when idle.
      setSpotify(p.listening_to_spotify && p.spotify ? p.spotify : null);
      const badges = [];
      if (premium_type && premium_type > 0) badges.push({ icon: 'nitro', label: 'Nitro' });
      BADGE_FLAGS.forEach(({ flag, icon, label }) => {
        if (public_flags & flag) badges.push({ icon, label });
      });
      badges.push({ icon: 'quest', label: 'Completed a Quest' });
      setDiscordBadges(badges);
    };

    const connect = () => {
      try { ws = new WebSocket('wss://api.lanyard.rest/socket'); } catch { return; }
      ws.onmessage = (e) => {
        let msg;
        try { msg = JSON.parse(e.data); } catch { return; }
        if (msg.op === 1) {
          // Hello — subscribe to our user, then heartbeat on the given interval
          ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_USER_ID } }));
          clearInterval(heartbeat);
          heartbeat = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ op: 3 }));
          }, msg.d?.heartbeat_interval || 30000);
        } else if (msg.op === 0) {
          // Event — INIT_STATE / PRESENCE_UPDATE (d is the presence, or keyed by id)
          const d = msg.d;
          applyPresence(d && d.discord_status ? d : (d ? d[DISCORD_USER_ID] : null));
        }
      };
      ws.onclose = () => {
        clearInterval(heartbeat);
        if (!closed) reconnect = setTimeout(connect, 4000);
      };
      ws.onerror = () => { try { ws.close(); } catch {} };
    };

    connect();

    return () => {
      closed = true;
      clearInterval(heartbeat);
      clearTimeout(reconnect);
      try { ws && ws.close(); } catch {}
    };
  }, []);


  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const currentGame = gameLibrary[currentGameIndex];

  const nextGame = () => setCurrentGameIndex((prev) => (prev + 1) % gameLibrary.length);
  const prevGame = () => setCurrentGameIndex((prev) => (prev - 1 + gameLibrary.length) % gameLibrary.length);
  const goToGame = (index) => setCurrentGameIndex(index);
  const closeGameLibrary = () => {
    setShowGameLibrary(false);
    setCurrentGameIndex(0);
  };

  // ==================== EXTERNAL LINK WARNING ====================
  const [showExternalWarning, setShowExternalWarning] = useState(false);
  const [pendingExternalUrl, setPendingExternalUrl] = useState("");
  const [pendingExternalLabel, setPendingExternalLabel] = useState("");

  const openExternalLink = (url, label) => {
    setPendingExternalUrl(url);
    setPendingExternalLabel(label);
    setShowExternalWarning(true);
  };

  const confirmVisit = () => {
    if (pendingExternalUrl) {
      window.open(pendingExternalUrl, '_blank');
    }
    setShowExternalWarning(false);
    setPendingExternalUrl("");
    setPendingExternalLabel("");
  };

  const cancelExternal = () => {
    setShowExternalWarning(false);
    setPendingExternalUrl("");
    setPendingExternalLabel("");
  };

  useCanvasCursor();

  // Visitor-local clock, recomputed each tick
  const localH = clockTime.getHours();
  const localM = clockTime.getMinutes();
  const localS = clockTime.getSeconds();
  const localTimeStr = [localH, localM, localS].map(n => String(n).padStart(2, '0')).join(':');
  const localDateStr = clockTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const localGmt = formatGmt(-clockTime.getTimezoneOffset());

  // Current Discord activity (game/app rich presence) — skips custom status + Spotify
  const primaryActivity = discordActivities.find((a) => a.type !== 4 && a.name !== 'Spotify') || null;
  const customStatus = discordActivities.find((a) => a.type === 4) || null;
  const activityAsset = (img, appId) => {
    if (!img) return null;
    if (img.startsWith('mp:')) return `https://media.discordapp.net/${img.slice(3)}`;
    return `https://cdn.discordapp.com/app-assets/${appId}/${img}.png`;
  };
  const activityImg = primaryActivity ? activityAsset(primaryActivity.assets?.large_image, primaryActivity.application_id) : null;
  // Rich-presence buttons — labels from `buttons`, URLs from `metadata.button_urls` (http(s) only)
  const activityButtons = (primaryActivity?.buttons || []).map((label, i) => {
    const url = primaryActivity?.metadata?.button_urls?.[i];
    return { label: String(label).slice(0, 32), url: typeof url === 'string' && /^https?:\/\//i.test(url) ? url : null };
  });
  const activityElapsed = (start) => {
    const totalSec = Math.floor(Math.max(0, clockTime.getTime() - start) / 1000);
    const h = Math.floor(totalSec / 3600), m = Math.floor((totalSec % 3600) / 60), s = totalSec % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  };

  // Spotify playback position, recomputed off the clock tick that's already running.
  const spotifyProgress = (() => {
    const { start, end } = spotify?.timestamps || {};
    if (!start || !end || end <= start) return null;
    const total = end - start;
    const elapsed = Math.min(Math.max(clockTime.getTime() - start, 0), total);
    return { pct: (elapsed / total) * 100, elapsed: elapsed / 1000, total: total / 1000 };
  })();
  // Lanyard joins multiple artists with semicolons — read better as a comma list.
  const spotifyArtist = spotify?.artist?.replace(/;\s*/g, ', ') || '';

  // When an activity has no rich-presence image, fall back to the Discord app's own icon
  useEffect(() => {
    if (!primaryActivity || primaryActivity.assets?.large_image || !primaryActivity.application_id) {
      setActivityAppIcon(null);
      return;
    }
    let cancelled = false;
    const appId = primaryActivity.application_id;
    fetch(`https://discord.com/api/v10/applications/${appId}/rpc`)
      .then((r) => r.json())
      .then((j) => { if (!cancelled && j.icon) setActivityAppIcon(`https://cdn.discordapp.com/app-icons/${appId}/${j.icon}.png`); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [primaryActivity?.application_id, primaryActivity?.assets?.large_image]);



  return (
    <div 
      className="bg-black text-white overflow-hidden"
      style={{ cursor: 'none' }}
      
    >
      <style>{`
        @font-face {
          font-family: 'SiteFont';
          src: url('/fonts/Supernatural_Knight.ttf') format('truetype');
          font-display: swap;
        }

        html, body, .snap-container {
          cursor: none !important;
        }

        button, a, input, select, textarea, [role="button"], .group, .snap-section {
          cursor: none !important;
        }

        body, h1, h2, h3 {
          font-family: 'SiteFont', 'Geist', system-ui, -apple-system, sans-serif;
        }

        /* Social icons — plain white glyphs with an always-on glow */
        .social-ico { transition: color .2s ease, transform .2s ease, filter .2s ease; filter: drop-shadow(0 0 7px rgba(255,255,255,0.5)); }
        .social-ico:hover { color:#fff; transform: translateY(-2px); filter: drop-shadow(0 0 14px rgba(255,255,255,0.85)); }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }

        @keyframes lyricFade {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes borderSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        @keyframes nameShine {
          0% { background-position: 200% center; }
          55%, 100% { background-position: -200% center; }
        }

        @keyframes nameGlow {
          0%, 100% { filter: drop-shadow(0 0 6px rgba(255,255,255,0.35)) drop-shadow(0 0 16px rgba(255,255,255,0.18)); }
          50% { filter: drop-shadow(0 0 10px rgba(255,255,255,0.9)) drop-shadow(0 0 30px rgba(255,255,255,0.55)); }
        }
      `}</style>

      <canvas id="canvas" className="fixed inset-0 z-[9997] pointer-events-none" />

      {/* Custom Cursor */}
      <div 
        className="fixed pointer-events-none z-[9999]" 
        style={{ 
          left: `${cursorPos.x}px`, 
          top: `${cursorPos.y}px`, 
          width: '36px', 
          height: '36px', 
          backgroundImage: `url('https://files.catbox.moe/52ewdv.png')`, 
          backgroundSize: 'contain', 
          backgroundRepeat: 'no-repeat', 
          transform: 'translate(-50%, -50%)' 
        }} 
      />

      {/* Background */}
      <div className="fixed inset-0 z-0">
        {SITE_CONFIG.bgType === 'video' && (
          // Blur samples past the element's edges, which would leave a soft
          // transparent border against the page. Oversizing pushes that band
          // off-screen: 12% clears the 5px blur's ~15px spread even at 375px
          // wide, where the narrow axis gives the least margin to work with.
          <video ref={videoRef} src={SITE_CONFIG.bgValue} loop autoPlay muted playsInline
            className="fixed inset-0 w-full h-full object-cover"
            style={{ filter: 'blur(5px)', transform: 'scale(1.12)' }} />
        )}
        {(SITE_CONFIG.bgType === 'gif' || SITE_CONFIG.bgType === 'image') && (
          <img src={SITE_CONFIG.bgValue} alt="Background" className="fixed inset-0 w-full h-full object-cover" />
        )}
      </div>

      <div className="fixed inset-0 z-10 pointer-events-none" style={{ background: 'rgba(6,12,28,0.45)' }} />
      <div className="fixed inset-0 z-10 pointer-events-none" style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 40%, transparent 0%, rgba(3,7,18,0.5) 100%)' }} />

      {/* Particles */}
      <Particles className="absolute inset-0 z-30" quantity={70} ease={80} staticity={40} />

      <Comments />
      {!showEnter && <Oneko />}

      {/* Game library launcher — floating icon next to the chat button */}
      <button onClick={() => setShowGameLibrary(true)} title="Game collection"
        className="fixed top-4 right-16 z-[80] w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-125"
        style={{ color: '#fff', textShadow: '0 0 12px rgba(255,255,255,0.8), 0 0 28px rgba(255,255,255,0.4)', background: 'none', border: 'none' }}>
        <i className="fa-solid fa-gamepad text-xl" />
      </button>

      {/* VOLUME — hidden on iOS (volume is hardware-only on iOS Safari) */}
      <div
        className={`fixed top-4 left-4 z-[80] flex items-center transition-opacity duration-300 ${activeSection === 3 || /iPad|iPhone|iPod/.test(navigator.userAgent) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        {/* Icon button */}
        <button aria-label="Volume"
          className="w-10 h-10 flex-shrink-0 flex items-center justify-center transition-all duration-200 hover:scale-125"
          style={{ color: '#fff', textShadow: '0 0 12px rgba(255,255,255,0.8), 0 0 28px rgba(255,255,255,0.4)', background: 'none', border: 'none' }}>
          <i className={`fa-solid ${volume === 0 ? 'fa-volume-xmark' : volume < 0.5 ? 'fa-volume-low' : 'fa-volume-high'} text-xl`}></i>
        </button>

        {/* Track unrolls alongside the icon rather than dropping a panel below
            it. Width drives the reveal, so it stays out of the way entirely at
            rest instead of sitting invisible over the page. */}
        <div className={`overflow-hidden transition-all duration-300 ease-out ${
          showVolumeSlider || volumeDragging ? 'w-28 ml-1.5 opacity-100' : 'w-0 ml-0 opacity-0'
        }`}>
          {/* Capsule with no thumb, thickening while dragged — the iOS shape */}
          <div className={`relative rounded-full transition-all duration-150 ${volumeDragging ? 'h-3' : 'h-2'}`}
            style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.18)' }}>
            <div className="absolute left-0 top-0 h-full rounded-full bg-white pointer-events-none"
              style={{ width: `${volume * 100}%`, boxShadow: '0 0 10px rgba(255,255,255,0.5)' }} />
            <input
              type="range" min="0" max="1" step="0.01" value={volume}
              onChange={handleVolumeChange}
              onPointerDown={() => setVolumeDragging(true)}
              aria-label="Volume level"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* VIEW COUNTER + LOCATION */}
      <div className={`fixed bottom-4 left-4 z-[70] flex items-center gap-2.5 text-sm text-white/80 transition-all duration-300 ${activeSection === 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="group relative flex items-center gap-1.5 cursor-default">
          <i className="fa-solid fa-eye text-xs"></i>
          <span className="font-mono tabular-nums">{views === null ? "—" : displayViews.toLocaleString()}</span>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 rounded-md text-xs text-white bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Views
          </div>
        </div>
        
        <span className="text-white/40">•</span>
        
        <div className="group relative flex items-center gap-1 cursor-default">
          <i className="fa-solid fa-location-dot text-xs"></i>
          <span>{visitorCity}</span>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap drop-shadow-[0_1px_3px_rgb(0,0,0,0.9)]">
            Your location
          </div>
        </div>
      </div>

      {/* Preloader */}
      <AnimatePresence>
        {siteLoading && (
          <motion.div key="loader"
            initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-black cursor-none">
            <div className="absolute w-80 h-80 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />
            <div className="relative text-center">
              <div className="text-white/80 font-mono text-xs tracking-[8px] mb-7">AVYX</div>
              <div className="w-40 h-[2px] rounded-full bg-white/10 overflow-hidden mx-auto">
                <div className="h-full rounded-full transition-all duration-150 ease-out"
                  style={{ width: `${loadProgress}%`, background: `linear-gradient(90deg, ${ACCENT}, #fff)` }} />
              </div>
              <div className="mt-3 font-mono text-[10px] text-white/30 tabular-nums tracking-wider">{loadProgress}%</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click to Enter — splits open like two panels (top slides up, bottom slides down) */}
      <AnimatePresence>
        {!siteLoading && showEnter && (
          <motion.div key="enter" onClick={enterSite}
            className="group fixed inset-0 z-[90] cursor-none overflow-hidden">

            {/* Top panel — slides up */}
            <motion.div
              exit={{ y: '-101%' }}
              transition={{ duration: 0.85, ease: [0.83, 0, 0.17, 1] }}
              className="absolute top-0 inset-x-0 h-1/2 bg-black" />

            {/* Bottom panel — slides down */}
            <motion.div
              exit={{ y: '101%' }}
              transition={{ duration: 0.85, ease: [0.83, 0, 0.17, 1] }}
              className="absolute bottom-0 inset-x-0 h-1/2 bg-black" />

            {/* Seam glow at the split */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)' }} />

            {/* Content — fades out as the panels open */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/[0.025] blur-3xl pointer-events-none" />
              <div className="relative text-white text-2xl tracking-[6px] font-light mb-2" style={{ animation: 'float 3s ease-in-out infinite' }}>ENTER</div>
              <div className="relative text-white/50 text-sm tracking-[3px]">AVYX</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dot Navigation */}
      {!showEnter && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[80] flex flex-col gap-3">
          {['Profile', 'About', 'Projects', 'Music'].map((label, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(i)}
              title={label}
              className="group relative flex items-center justify-end gap-2"
            >
              <span className="absolute right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-white/70 whitespace-nowrap bg-black/50 px-2 py-0.5 rounded-md pointer-events-none">
                {label}
              </span>
              <div className={`rounded-full transition-all duration-300 ${
                activeSection === i
                  ? 'w-2 h-5'
                  : 'w-2 h-2 bg-white/25 hover:bg-white/60'
              }`}
                style={activeSection === i ? { background: ACCENT, boxShadow: `0 0 10px ${ACCENT}88` } : {}} />
            </button>
          ))}
        </div>
      )}

      <div ref={snapContainerRef} className={`snap-container relative z-20 h-screen overflow-y-scroll transition-all duration-500 ${showEnter ? 'blur-lg' : ''}`} style={{ scrollbarWidth: 'none' }}>

        {/* PAGE 1 - Profile Card */}
        <div className="snap-section relative min-h-screen flex flex-col items-center justify-center px-6">
          <div
            className={`relative w-full max-w-[330px] sm:max-w-[400px] transition-all duration-700 ease-out ${showProfile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          >
            {/* Boxless — content floats directly on the scene */}
            <div className="relative">
              <div className="relative z-10 p-6 sm:p-8">

                {/* Avatar */}
                <div className="flex justify-center mb-5 sm:mb-6" style={{ animation: 'float 4s ease-in-out infinite' }}>
                  <div className="relative">
                    {/* Gradient ring */}
                    <div className="relative w-[96px] h-[96px] sm:w-[108px] sm:h-[108px] rounded-full p-[2.5px]"
                      style={{ background: `linear-gradient(135deg, ${ACCENT}aa, rgba(255,255,255,0.1) 60%)` }}>
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img src={discordAvatar || SITE_CONFIG.pfp} className="w-full h-full object-cover" alt="Profile" />
                      </div>
                    </div>
                    {/* Status dot */}
                    <div className={`absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 w-[15px] h-[15px] sm:w-[18px] sm:h-[18px] rounded-full border-[2.5px] border-[#080808] shadow-lg ${
                      discordStatus === 'online' ? 'bg-emerald-400 shadow-emerald-400/60' :
                      discordStatus === 'idle'   ? 'bg-yellow-400 shadow-yellow-400/60' :
                      discordStatus === 'dnd'    ? 'bg-red-500 shadow-red-500/60' :
                                                   'bg-zinc-500'
                    }`} />
                  </div>
                </div>

                {/* Name */}
                <h1 className="text-center text-[1.8rem] sm:text-[2.1rem] font-bold tracking-tight mb-2.5 sm:mb-3"
                  style={{
                    fontFamily: "'SiteFont', 'Geist', sans-serif",
                    backgroundImage: 'linear-gradient(110deg, rgba(255,255,255,0.9) 42%, #ffffff 50%, rgba(255,255,255,0.9) 58%)',
                    backgroundSize: '250% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'nameShine 12s ease-in-out infinite, nameGlow 12s ease-in-out infinite',
                  }}>
                  {SITE_CONFIG.username}
                </h1>

                {/* Discord badges */}
                {discordBadges.length > 0 && (
                  <div className="flex justify-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                    {discordBadges.map((badge) => (
                      <div key={badge.icon} className="relative group flex items-center justify-center">
                        <span
                          className="inline-block w-4 h-4 sm:w-5 sm:h-5 transition-all duration-200 group-hover:scale-125"
                          style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.55))' }}
                          onMouseEnter={e => e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(255,255,255,0.95))'}
                          onMouseLeave={e => e.currentTarget.style.filter = 'drop-shadow(0 0 4px rgba(255,255,255,0.55))'}
                        >
                          <DiscordBadgeIcon icon={badge.icon} />
                        </span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[11px] font-medium text-white bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-50">
                          {badge.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Chips row */}
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-4 sm:mb-5">
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/45">
                    <i className="fa-solid fa-code text-[8px]" /> Developer
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/45">
                    <i className="fa-solid fa-terminal text-[8px]" /> Programmer
                  </span>
                  <span className={`inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 rounded-full border ${
                    discordStatus === 'online' ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400' :
                    discordStatus === 'idle'   ? 'bg-yellow-500/10 border-yellow-500/25 text-yellow-400' :
                    discordStatus === 'dnd'    ? 'bg-red-500/10 border-red-500/25 text-red-400' :
                                                 'bg-white/5 border-white/10 text-white/35'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                      discordStatus === 'online' ? 'bg-emerald-400' :
                      discordStatus === 'idle'   ? 'bg-yellow-400' :
                      discordStatus === 'dnd'    ? 'bg-red-400' : 'bg-zinc-500'
                    }`} />
                    {discordStatus === 'online' ? 'Online' : discordStatus === 'idle' ? 'Idle' : discordStatus === 'dnd' ? 'Do Not Disturb' : 'Offline'}
                  </span>
                </div>

                {/* Cycling text — letters stagger in, then the whole word peels away */}
                <div className="relative h-6 mb-5 sm:mb-6">
                  <AnimatePresence mode="wait">
                    <motion.span key={currentFadeIndex}
                      variants={FADE_WORD} initial="out" animate="in" exit="out"
                      className="absolute inset-0 flex items-center justify-center text-[14px] sm:text-[16px] tracking-[4px] uppercase whitespace-nowrap"
                      style={{ color: 'rgba(255,255,255,0.95)', textShadow: '0 0 8px rgba(255,255,255,0.55), 0 0 18px rgba(255,255,255,0.3)' }}>
                      {[...fadeTexts[currentFadeIndex]].map((ch, i) => (
                        <motion.span key={i} variants={FADE_LETTER}
                          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                          className="inline-block">
                          {/* A bare space collapses inside a flex row — hold it open */}
                          {ch === ' ' ? ' ' : ch}
                        </motion.span>
                      ))}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Gradient divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5 sm:mb-6" />

                {/* Social icons */}
                <div className="flex justify-center items-center gap-3 sm:gap-[14px] text-white/90">
                  <a href="https://discord.com/users/825785012468056155" target="_blank" rel="noopener noreferrer" aria-label="Discord"
                    className="social-ico text-4xl sm:text-[2.4rem] leading-none">
                    <i className="fa-brands fa-discord" />
                  </a>
                  <a href="#" aria-label="GitHub"
                    className="social-ico text-4xl sm:text-[2.4rem] leading-none">
                    <i className="fa-brands fa-github" />
                  </a>
                  <a href="#" aria-label="Email"
                    className="social-ico text-4xl sm:text-[2.4rem] leading-none">
                    <i className="fa-solid fa-envelope" />
                  </a>
                  <a href="#" aria-label="LeetCode"
                    className="social-ico text-4xl sm:text-[2.4rem] leading-none flex items-center">
                    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Website"
                    className="social-ico text-4xl sm:text-[2.4rem] leading-none">
                    <i className="fa-solid fa-globe" />
                  </a>
                </div>

              </div>
            </div>
          </div>

          {/* World clock — my time + visitor delta */}
          <div className={`w-full max-w-[330px] sm:max-w-[400px] mt-4 transition-all duration-700 delay-200 ease-out ${showProfile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-center gap-4 px-4 py-3.5">

              {/* Analog face — visitor's local time */}
              <div className="relative w-14 h-14 flex-shrink-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.1), rgba(8,12,24,0.95) 72%)',
                  border: '2px solid rgba(255,255,255,0.22)',
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.65), 0 2px 10px rgba(0,0,0,0.45)',
                }}>

                {/* Hour ticks (skip the cardinal points — numerals live there) */}
                {Array.from({ length: 12 }).map((_, i) => (
                  i % 3 !== 0 && (
                    <span key={i} className="absolute left-1/2 top-1/2 w-px h-[3px] rounded-full"
                      style={{
                        background: 'rgba(255,255,255,0.4)',
                        transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-22px)`,
                      }} />
                  )
                ))}

                {/* Numerals */}
                {[['12', '50%', '15%'], ['3', '84%', '50%'], ['6', '50%', '85%'], ['9', '16%', '50%']].map(([n, x, y]) => (
                  <span key={n} className="absolute font-mono text-white/75"
                    style={{ left: x, top: y, transform: 'translate(-50%, -50%)', fontSize: '8px', lineHeight: 1 }}>
                    {n}
                  </span>
                ))}

                {/* Hour hand */}
                <span className="absolute left-1/2 top-1/2 w-[2.5px] h-[13px] bg-white/90 rounded-full"
                  style={{ transformOrigin: '50% 100%', transform: `translate(-50%, -100%) rotate(${(localH % 12) * 30 + localM * 0.5}deg)`, boxShadow: '0 0 3px rgba(0,0,0,0.6)' }} />
                {/* Minute hand */}
                <span className="absolute left-1/2 top-1/2 w-[1.5px] h-[19px] bg-white/70 rounded-full"
                  style={{ transformOrigin: '50% 100%', transform: `translate(-50%, -100%) rotate(${localM * 6 + localS * 0.1}deg)`, boxShadow: '0 0 3px rgba(0,0,0,0.6)' }} />
                {/* Second hand — with counterweight tail */}
                <span className="absolute left-1/2 top-1/2 w-px h-[26px] rounded-full"
                  style={{ background: ACCENT, transformOrigin: '50% 77%', transform: `translate(-50%, -77%) rotate(${localS * 6}deg)`, boxShadow: `0 0 4px ${ACCENT}88` }} />
                {/* Center cap */}
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full border border-white/90"
                  style={{ background: ACCENT }} />
              </div>

              <div className="min-w-0">
                <p className="flex items-center gap-1.5 font-mono text-[10px] text-white/40">
                  <i className="fa-regular fa-clock text-[9px]" /> {visitorTimeZone || 'Local time'}
                </p>
                <p className="font-mono text-lg sm:text-xl font-semibold text-white tabular-nums leading-tight">{localTimeStr}</p>
                <p className="font-mono text-[11px] text-white/40">{localDateStr} · {localGmt}</p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <button onClick={() => scrollToSection(1)}
            className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-opacity duration-700 delay-500 ${showProfile ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center gap-1.5" style={{ animation: 'float 3s ease-in-out infinite' }}>
              <span className="font-mono text-[10px] tracking-[3px] uppercase text-white/80"
                style={{ textShadow: '0 0 10px rgba(255,255,255,0.4), 0 0 24px rgba(255,255,255,0.15)' }}>
                Scroll for more
              </span>
              <i className="fa-solid fa-chevron-down text-sm animate-bounce"
                style={{ color: ACCENT, filter: `drop-shadow(0 0 6px ${ACCENT}aa)` }} />
            </div>
          </button>
        </div>

        {/* PAGE 2 — About Me (bio pill + profile/timezone cards + skill tags) */}
        <div ref={aboutRef} className="snap-section snap-section--scroll min-h-screen flex flex-col px-4 sm:px-6 py-10 border-t border-white/[0.06]">
          <div className="max-w-[720px] w-full mx-auto">

            {/* Heading */}
            <h2 className={`text-3xl sm:text-4xl font-bold text-white mb-5 tracking-tight transition-all duration-700 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              About me
            </h2>

            {/* Bio pill */}
            <div className={`rounded-3xl bg-white/[0.03] border border-white/[0.07] px-6 py-5 mb-4 transition-all duration-700 delay-75 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-white/70 text-sm sm:text-[15px] leading-relaxed">
                Hi, Avyx here, welcome to my bio link website! i am a developer and programmer based in the <span className="text-white font-medium">United States</span>, graduated from <span className="text-white font-medium">CSU</span> with a <span className="text-white font-medium">Computer Science</span> degree, i am currently employed at <span className="text-white font-medium">Amazon</span>! I am open to new opportunities though hit me up! ((:
              </p>
            </div>

            {/* Profile card */}
            <div className={`rounded-3xl bg-white/[0.03] border border-white/[0.07] p-5 mb-4 flex items-center gap-4 transition-all duration-700 delay-150 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                    <img src={discordAvatar || SITE_CONFIG.pfp} className="w-full h-full object-cover" alt="Avatar" />
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-[2.5px] border-[#0a0a0a] ${
                    discordStatus === 'online' ? 'bg-emerald-400' :
                    discordStatus === 'idle'   ? 'bg-yellow-400' :
                    discordStatus === 'dnd'    ? 'bg-red-500' : 'bg-zinc-500'
                  }`} />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-[15px] leading-tight truncate">{discordName || SITE_CONFIG.username}</p>
                  {discordUsername && (
                    <p className="font-mono text-[11px] text-white/40 leading-tight mt-0.5 truncate">@{discordUsername}</p>
                  )}
                  {customStatus && (customStatus.state || customStatus.emoji) ? (
                    <p className="text-white/55 text-xs mt-1 flex items-center gap-1.5 min-w-0">
                      {customStatus.emoji && (
                        customStatus.emoji.id ? (
                          <img src={`https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${customStatus.emoji.animated ? 'gif' : 'png'}`} alt="" className="w-3.5 h-3.5 flex-shrink-0" />
                        ) : (
                          <span className="flex-shrink-0 leading-none">{customStatus.emoji.name}</span>
                        )
                      )}
                      {customStatus.state && <span className="truncate">{customStatus.state}</span>}
                    </p>
                  ) : (
                    <p className="text-white/40 text-xs italic mt-1">
                      {discordStatus === 'online' ? 'Online now' : discordStatus === 'idle' ? 'Idle' : discordStatus === 'dnd' ? 'Do not disturb' : 'Offline'}
                    </p>
                  )}
                </div>
            </div>

            {/* Current Discord activity */}
            {primaryActivity && (
              <div className={`rounded-3xl bg-white/[0.03] border border-white/[0.07] p-5 mb-4 transition-all duration-700 delay-150 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex items-center gap-4">
                  {(activityImg || activityAppIcon) ? (
                    <img src={activityImg || activityAppIcon} alt="" className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 border border-white/10" />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10" style={{ background: `${ACCENT}12` }}>
                      <i className="fa-solid fa-gamepad text-lg" style={{ color: ACCENT }} />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: `${ACCENT}cc` }}>
                      {primaryActivity.type === 1 ? 'Streaming' : primaryActivity.type === 3 ? 'Watching' : primaryActivity.type === 5 ? 'Competing in' : 'Playing'}
                    </p>
                    <p className="text-white font-semibold text-[15px] leading-tight truncate mt-0.5">{primaryActivity.name}</p>
                    {primaryActivity.details && <p className="text-white/50 text-xs truncate mt-0.5">{primaryActivity.details}</p>}
                    {primaryActivity.state && <p className="text-white/40 text-xs truncate">{primaryActivity.state}</p>}
                    {Array.isArray(primaryActivity.party?.size) && primaryActivity.party.size.length === 2 && (
                      <p className="text-white/40 text-xs flex items-center gap-1.5 mt-0.5">
                        <i className="fa-solid fa-user-group text-[9px]" style={{ color: ACCENT }} />
                        {primaryActivity.party.size[0]} of {primaryActivity.party.size[1]} in party
                      </p>
                    )}
                  </div>
                  {primaryActivity.timestamps?.start && (
                    <div className="flex-shrink-0 text-right">
                      <p className="font-mono text-[9px] text-white/25 uppercase tracking-wider">elapsed</p>
                      <p className="font-mono text-sm text-white/70 tabular-nums leading-tight">{activityElapsed(primaryActivity.timestamps.start)}</p>
                    </div>
                  )}
                </div>

                {/* Rich-presence buttons */}
                {activityButtons.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {activityButtons.map((b, i) => (
                      b.url ? (
                        <a key={i} href={b.url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-90"
                          style={{ background: `${ACCENT}1f`, border: `1px solid ${ACCENT}55`, color: '#fff' }}>
                          <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" style={{ color: ACCENT }} /> {b.label}
                        </a>
                      ) : (
                        <span key={i} className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-medium"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
                          {b.label}
                        </span>
                      )
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Spotify — live "now listening", straight from Lanyard */}
            {spotify && (
              <div className={`rounded-3xl bg-white/[0.03] border border-white/[0.07] p-5 mb-4 transition-all duration-700 delay-150 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <button
                  onClick={() => spotify.track_id && openExternalLink(`https://open.spotify.com/track/${spotify.track_id}`, 'Spotify')}
                  disabled={!spotify.track_id}
                  className="group w-full flex items-center gap-4 text-left">
                  {spotify.album_art_url ? (
                    <img src={spotify.album_art_url} alt="" className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 border border-white/10" />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10" style={{ background: `${SPOTIFY_GREEN}12` }}>
                      <i className="fa-brands fa-spotify text-lg" style={{ color: SPOTIFY_GREEN }} />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5" style={{ color: SPOTIFY_GREEN }}>
                      <i className="fa-brands fa-spotify text-[11px]" /> Listening on Spotify
                    </p>
                    <p className="text-white font-semibold text-[15px] leading-tight truncate mt-0.5 group-hover:underline">{spotify.song}</p>
                    {spotifyArtist && <p className="text-white/50 text-xs truncate mt-0.5">{spotifyArtist}</p>}
                    {spotify.album && <p className="text-white/30 text-[11px] truncate">on {spotify.album}</p>}
                  </div>
                </button>

                {spotifyProgress && (
                  <div className="mt-3.5">
                    <div className="relative h-[3px] rounded-full bg-white/15">
                      <div className="absolute left-0 top-0 h-full rounded-full"
                        style={{ width: `${spotifyProgress.pct}%`, background: SPOTIFY_GREEN }} />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="font-mono text-[10px] text-white/35 tabular-nums">{formatTime(spotifyProgress.elapsed)}</span>
                      <span className="font-mono text-[10px] text-white/35 tabular-nums">{formatTime(spotifyProgress.total)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Skill tags */}
            <div className={`flex flex-wrap gap-2.5 mb-6 transition-all duration-700 delay-200 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {skills.map((s) => {
                const m = skillMeta[s.name] || { icon: 'fa-solid fa-code', color: ACCENT };
                return (
                  <span key={s.name} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.04] border border-white/[0.07] text-white/75 text-[13px] font-medium">
                    <i className={`${m.icon} text-[13px]`} style={{ color: m.color }} /> {s.name}
                  </span>
                );
              })}
            </div>

          </div>
        </div>

        {/* PAGE 3 - Projects */}
        <div ref={projectsRef} className="snap-section min-h-screen flex flex-col justify-center px-4 sm:px-6 py-10 border-t border-white/[0.06]">
          <div className="max-w-[900px] w-full mx-auto">

            {/* Header */}
            <h2 className={`text-3xl sm:text-4xl font-bold text-white mb-5 tracking-tight transition-all duration-700 ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              My Projects
            </h2>

            {/* Project cards — banner style */}
            <div className="space-y-4">
              {projects.map((project, i) => (
                <button key={project.id}
                  onClick={() => openExternalLink(project.url, project.title)}
                  className={`group relative block w-full rounded-3xl overflow-hidden text-left min-h-[460px] sm:min-h-[380px] transition-all duration-700 hover:scale-[1.006] ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{
                    transitionDelay: `${i * 100 + 100}ms`,
                    background: `linear-gradient(165deg, ${project.color}1f 0%, #0b0b13 55%, #070709 100%)`,
                    border: `1px solid ${project.color}22`,
                    boxShadow: `0 26px 60px -26px ${project.color}55`,
                  }}>

                  {/* Tiled icon texture */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.05 }}>
                    <div className="flex flex-wrap gap-x-10 gap-y-7 p-6 scale-[1.35] -rotate-6">
                      {Array.from({ length: 60 }).map((_, k) => (
                        <i key={k} className={project.icon} style={{ color: project.color, fontSize: 26, transform: `rotate(${(k * 47) % 80 - 40}deg)` }} />
                      ))}
                    </div>
                  </div>

                  {/* Giant project-name watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
                    <span className="font-bold leading-none text-center" style={{ fontSize: 'clamp(3.6rem, 18vw, 7rem)', color: project.color, opacity: 0.19, letterSpacing: '-0.02em' }}>
                      {project.title}
                    </span>
                  </div>

                  {/* Bottom scrim for legibility */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(6,7,10,0.96) 8%, rgba(6,7,10,0.55) 46%, transparent)' }} />

                  {/* Tech stack — top */}
                  <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
                    {(project.stack || []).map((tech) => {
                      const m = skillMeta[tech] || { icon: 'fa-solid fa-code', color: '#ffffff' };
                      return (
                        <span key={tech} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium text-white/80"
                          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
                          <i className={`${m.icon} text-[11px]`} style={{ color: m.color }} />
                          {tech}
                        </span>
                      );
                    })}
                  </div>

                  {/* Bottom content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                      <i className="fa-solid fa-arrow-up-right text-white/30 text-sm group-hover:text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-white/50 text-[13px] sm:text-sm leading-relaxed max-w-xl mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded-md text-white/45"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PAGE 4 - Music Player */}
        <div ref={musicRef} className="snap-section relative border-t border-white/10" style={{ height: '100dvh' }}>

          {/* ── Inner wrapper ── */}
          <div className="absolute inset-3 lg:inset-5">

          {/* ── Content — compact iOS-style player card ── */}
          <div className={`relative z-10 flex items-center justify-center h-full px-5 transition-opacity duration-700 ${musicVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-full max-w-[380px] max-h-full overflow-y-auto rounded-[2rem]"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                scrollbarWidth: 'none',
              }}>
              <div className="p-5 sm:p-6 flex flex-col">

                {/* Album art */}
                <AnimatePresence mode="wait">
                  <motion.img key={currentSong.id + '-art'} src={currentSong.albumArt} alt=""
                    initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.35 }}
                    className="w-full aspect-square rounded-2xl object-cover shadow-2xl" />
                </AnimatePresence>

                {/* Audio visualizer — live frequency bars */}
                <canvas ref={vizCanvasRef} width={680} height={80} className="w-full h-10 mt-4" />

                {/* Title + equalizer */}
                <div className="flex items-center justify-between gap-3 mt-5">
                  <AnimatePresence mode="wait">
                    <motion.div key={currentSong.id + '-info'} className="min-w-0"
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}>
                      <h2 className="text-lg font-bold text-white leading-tight truncate">{currentSong.title}</h2>
                      <p className="text-white/50 text-sm truncate">{currentSong.artist}</p>
                    </motion.div>
                  </AnimatePresence>
                  {isPlaying && (
                    <span className="flex gap-[3px] items-end h-4 flex-shrink-0">
                      {[0.6, 1, 0.75, 0.45].map((h, i) => (
                        <span key={i} className="w-[3px] bg-white/80 rounded-full animate-pulse"
                          style={{ height: `${h * 100}%`, animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </span>
                  )}
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <div className="relative h-[5px] bg-white/20 rounded-full group cursor-pointer">
                    <div className="absolute left-0 top-0 h-full bg-white/90 rounded-full pointer-events-none"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }} />
                    <input type="range" min="0" max={duration || 100} value={currentTime}
                      onChange={handleSeek} className="absolute inset-0 w-full opacity-0 cursor-pointer" />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="font-mono text-[11px] text-white/40 tabular-nums">{formatTime(currentTime)}</span>
                    <span className="font-mono text-[11px] text-white/40 tabular-nums">-{formatTime(Math.max(0, duration - currentTime))}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-12 mt-4">
                  <button onClick={prevSong} className="text-white/85 hover:text-white transition-all active:scale-90">
                    <i className="fa-solid fa-backward text-2xl" />
                  </button>
                  <button onClick={togglePlay} className="text-white transition-all hover:scale-105 active:scale-95 w-10 text-center">
                    <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-4xl`} />
                  </button>
                  <button onClick={nextSong} className="text-white/85 hover:text-white transition-all active:scale-90">
                    <i className="fa-solid fa-forward text-2xl" />
                  </button>
                </div>

                {/* Volume — hidden on iOS (hardware-only there) */}
                {!/iPad|iPhone|iPod/.test(navigator.userAgent) && (
                  <div className="flex items-center gap-3 mt-6">
                    <i className="fa-solid fa-volume-low text-white/40 text-xs" />
                    <div className="relative flex-1 h-[6px] bg-white/20 rounded-full">
                      <div className="absolute left-0 top-0 h-full bg-white/80 rounded-full pointer-events-none"
                        style={{ width: `${volume * 100}%` }} />
                      <input type="range" min="0" max="1" step="0.01" value={volume}
                        onChange={handleVolumeChange} className="absolute inset-0 w-full opacity-0 cursor-pointer" />
                    </div>
                    <i className="fa-solid fa-volume-high text-white/40 text-xs" />
                  </div>
                )}

                {/* Lyrics toggle */}
                <button onClick={() => setShowLyrics(l => !l)}
                  className="mx-auto mt-5 flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-white/70 hover:text-white transition-all"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <i className="fa-solid fa-microphone-lines text-[10px]" />
                  Lyrics
                  <i className={`fa-solid fa-chevron-down text-[9px] transition-transform duration-300 ${showLyrics ? 'rotate-180' : ''}`} />
                </button>

                {/* Expanding lyrics */}
                <AnimatePresence>
                  {showLyrics && (
                    <motion.div key="lyrics-panel"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 210, opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden">
                      <div ref={lyricsContainerRef}
                        className="h-[210px] overflow-y-scroll mt-3 text-center"
                        style={{
                          scrollbarWidth: 'none',
                          maskImage: 'linear-gradient(to bottom, transparent, white 12%, white 82%, transparent)',
                          WebkitMaskImage: 'linear-gradient(to bottom, transparent, white 12%, white 82%, transparent)',
                        }}>
                        {lyricsState === 'loading' ? (
                          <p className="text-white/30 text-sm pt-12">Loading lyrics…</p>
                        ) : lyricsState === 'error' ? (
                          <div className="pt-12 flex flex-col items-center gap-2.5">
                            <p className="text-white/30 text-sm">Couldn’t reach the lyrics service</p>
                            <button onClick={() => setLyricsAttempt((n) => n + 1)}
                              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-white/70 hover:text-white transition-all"
                              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)' }}>
                              <i className="fa-solid fa-rotate-right text-[10px] mr-1.5" />
                              Retry
                            </button>
                          </div>
                        ) : lyrics.length > 0 ? (
                          <>
                            <div style={{ height: '50px', flexShrink: 0 }} />
                            {lyrics.map((line, idx) => {
                              const offset = idx - currentLyricIndex;
                              const abs = Math.abs(offset);
                              const isCurrent = offset === 0;
                              return (
                                <div key={idx} ref={isCurrent ? currentLyricRef : null}
                                  style={{
                                    marginBottom: '0.9rem',
                                    color: isCurrent ? '#fff' : `rgba(255,255,255,${abs === 1 ? 0.45 : abs === 2 ? 0.22 : 0.1})`,
                                    fontSize: isCurrent ? '0.95rem' : '0.8rem',
                                    fontWeight: isCurrent ? 700 : 400,
                                    lineHeight: 1.4,
                                    transition: 'color 0.5s ease, font-size 0.5s ease, font-weight 0.5s ease',
                                  }}>
                                  {line.text}
                                </div>
                              );
                            })}
                            <div style={{ height: '140px', flexShrink: 0 }} />
                          </>
                        ) : (
                          <p className="text-white/20 text-sm pt-12">No synced lyrics available</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          </div>{/* rounded card */}
        </div>
      </div>

      <audio ref={audioRef} onEnded={nextSong} crossOrigin="anonymous" />

      {/* GAME LIBRARY MODAL */}
      <AnimatePresence>
        {showGameLibrary && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={closeGameLibrary}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-white/[0.08]"
              style={{ maxHeight: '88vh' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Ambient background — animated per game */}
              <AnimatePresence mode="sync">
                <motion.div
                  key={currentGame.id + '-bg'}
                  className="absolute inset-0 z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <img src={currentGame.cover} alt=""
                    className="w-full h-full object-cover scale-110"
                    style={{ filter: 'blur(48px) saturate(1.6) brightness(0.22)' }} />
                  <div className="absolute inset-0 bg-black/55" />
                </motion.div>
              </AnimatePresence>

              {/* Layout */}
              <div className="relative z-10 flex" style={{ minHeight: '480px', maxHeight: '88vh' }}>

                {/* Sidebar — game list */}
                <div className="hidden sm:flex flex-col w-56 flex-shrink-0 border-r border-white/[0.07] overflow-y-auto">
                  <div className="px-4 pt-5 pb-3 border-b border-white/[0.06]">
                    <p className="font-mono text-[10px] tracking-[3px] text-white/30 uppercase">Collection</p>
                    <p className="text-[11px] text-white/20 mt-0.5">{gameLibrary.length} games</p>
                  </div>
                  <div className="flex-1 p-2 space-y-0.5">
                    {gameLibrary.map((game, i) => (
                      <button
                        key={game.id}
                        onClick={() => goToGame(i)}
                        className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-xl text-left transition-all duration-150 ${
                          currentGameIndex === i
                            ? 'bg-white/10 border border-white/[0.1]'
                            : 'hover:bg-white/[0.05] border border-transparent'
                        }`}
                      >
                        <div className="relative w-9 h-9 flex-shrink-0 rounded-lg overflow-hidden border border-white/[0.08]">
                          <img src={game.cover} alt={game.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-[11px] font-medium line-clamp-1 leading-tight ${currentGameIndex === i ? 'text-white' : 'text-white/55'}`}>
                            {game.title}
                          </p>
                          <p className={`font-mono text-[9px] mt-0.5 ${
                            game.status === 'Playing'   ? 'text-emerald-400' :
                            game.status === 'Completed' ? 'text-blue-400' : 'text-purple-400'
                          }`}>{game.status}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main detail area */}
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row overflow-hidden">

                  {/* Cover art */}
                  <div className="sm:w-56 lg:w-64 flex-shrink-0 p-4 flex items-start justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentGame.id + '-cover'}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.22 }}
                        className="relative w-full rounded-xl overflow-hidden border border-white/[0.1] shadow-2xl aspect-video sm:aspect-[3/4]"
                      >
                        <img src={currentGame.cover} alt={currentGame.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className={`absolute bottom-2.5 left-2.5 px-2.5 py-1 text-[10px] font-semibold rounded-full ${getStatusColor(currentGame.status)}`}>
                          {currentGame.status}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Info panel */}
                  <div className="flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto" style={{ maxHeight: '88vh' }}>
                    {/* Top */}
                    <div>
                      {/* Header controls */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-1.5">
                          <button onClick={prevGame}
                            className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/[0.1] hover:bg-white/[0.08] text-white/50 hover:text-white transition-all text-xs active:scale-95">
                            <i className="fa-solid fa-chevron-left" />
                          </button>
                          <button onClick={nextGame}
                            className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/[0.1] hover:bg-white/[0.08] text-white/50 hover:text-white transition-all text-xs active:scale-95">
                            <i className="fa-solid fa-chevron-right" />
                          </button>
                          <span className="font-mono text-[10px] text-white/20 ml-1">
                            {currentGameIndex + 1} / {gameLibrary.length}
                          </span>
                        </div>
                        <button onClick={closeGameLibrary}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/[0.1] hover:bg-white/[0.08] text-white/40 hover:text-white transition-all text-base leading-none">
                          ×
                        </button>
                      </div>

                      {/* Game info */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentGame.id + '-info'}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 leading-tight">
                            {currentGame.title}
                          </h2>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4">
                            <span className="font-mono text-[10px] text-white/30">{currentGame.year}</span>
                            <span className="text-white/15 text-[10px]">·</span>
                            <span className="font-mono text-[10px] text-white/30">{currentGame.genre}</span>
                            <span className="text-white/15 text-[10px]">·</span>
                            <span className="font-mono text-[10px] text-white/30">{currentGame.platform}</span>
                          </div>
                          <p className="text-white/55 text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">{currentGame.description}</p>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Mobile game picker strip */}
                    <div className="sm:hidden mt-4 flex gap-2 overflow-x-auto pb-1">
                      {gameLibrary.map((game, i) => (
                        <button key={game.id} onClick={() => goToGame(i)}
                          className={`flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden border transition-all ${
                            currentGameIndex === i ? 'border-white/40 scale-110' : 'border-white/10 opacity-50'
                          }`}>
                          <img src={game.cover} alt={game.title} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-5 pt-4 border-t border-white/[0.07]">
                      <button
                        onClick={() => openExternalLink(currentGame.steamUrl, currentGame.platform)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all"
                      >
                        {currentGame.platform === 'Epic Games' ? 'View on Epic' : 'View on Steam'}
                        <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EXTERNAL LINK WARNING */}
      <AnimatePresence>
        {showExternalWarning && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70" onClick={cancelExternal}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-[340px] text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-white/50">Leaving Avyx</div>
                <button onClick={cancelExternal} className="text-white/60 hover:text-white text-xl leading-none">×</button>
              </div>

              <div className="mb-5">
                <div className="text-xl font-semibold mb-3">External link</div>
                <div className="bg-[#252525] text-white/90 text-sm px-4 py-2 rounded-xl inline-block font-mono break-all">{pendingExternalUrl}</div>
              </div>

              <div className="flex gap-3 justify-center">
                <button onClick={cancelExternal} className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20 text-sm font-medium transition-all">Cancel</button>
                <button onClick={confirmVisit} className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-sm font-semibold transition-all">Visit</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;