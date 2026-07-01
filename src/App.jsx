import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, animate } from "motion/react";
import { Particles } from './components/Particles';
import useCanvasCursor from "./components/useCanvasCursor";
import DiscordPresence from "./components/DiscordPresence";
import Comments from "./components/Comments";


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
  username: "Avyx",
  displayName: "A V Y X",
  bio: "Developer & programmer. Working at Amazon Robotics.",
  pfp: "https://media.discordapp.net/attachments/1233881503923179572/1514388105564651590/IMG_3924.jpg?ex=6a2d2994&is=6a2bd814&hm=e33de4bcd7e93bfbd740b2e07a82fd9ca6d8aaa45b971750a7c37b0d71663163&=&format=webp&width=544&height=544",
  bgType: "image",
  bgValue: "https://files.catbox.moe/xotlnd.jpg",
  audioLoop: true,
};

const DISCORD_USER_ID = "825785012468056155";

const IS_DEV = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const fadeTexts = ["Welcome", "Developer", "WebDev", "Scroll for more!"];

const songs = [
  {
    id: 1,
    title: "DON'T YOU LIE",
    artist: "Offset",
    url: "https://files.catbox.moe/ygafnn.mp3",
    albumArt: "https://files.catbox.moe/vbosn0.png",
  },
  {
    id: 2,
    title: "Enemies",
    artist: "Offset",
    url: "https://files.catbox.moe/rot9gk.mp3",
    albumArt: "https://files.catbox.moe/kmrfil.png",
  },
];

const skills = [
  { name: 'Python',       pct: 85 },
  { name: 'JavaScript',   pct: 90 },
  { name: 'TypeScript',   pct: 78 },
  { name: 'React',        pct: 88 },
  { name: 'Tailwind CSS', pct: 92 },
  { name: 'Node.js',      pct: 72 },
];

const projects = [
  {
    id: 1,
    title: 'Lumora',
    tagline: 'A cozy little home for your files.',
    description: 'Drop a file, get a link — that\'s the whole thing. Instant file sharing with no account required, optional self-destructing uploads, and zero ads or tracking.',
    tags: ['File Sharing', 'No Signup', '200MB Limit', 'Self-Destruct Uploads'],
    url: 'https://lumora-io-production.up.railway.app/',
    icon: 'fa-solid fa-link',
    color: '#8b5cf6',
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

const formatClock = (date) => date.toLocaleTimeString('en-US', {
  hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
});

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

    const imgPromise = new Promise((resolve) => {
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

    Promise.all([imgPromise, minDelay]).then(() => {
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

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

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
  const [fadeVisible, setFadeVisible] = useState(true);

  useEffect(() => {
    const cycleText = () => {
      setFadeVisible(false);
      setTimeout(() => {
        setCurrentFadeIndex((prev) => (prev + 1) % fadeTexts.length);
        setFadeVisible(true);
      }, 500);
    };

    const interval = setInterval(cycleText, 3500);
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

  // Album Color
  const [albumColor, setAlbumColor] = useState("#1a1a1a");
  const extractDominantColor = (imageUrl) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      canvas.width = 50; canvas.height = 50;
      ctx.drawImage(img, 0, 0, 50, 50);
      const data = ctx.getImageData(0, 0, 50, 50).data;
      let r = 0, g = 0, b = 0;
      for (let i = 0; i < data.length; i += 4) { r += data[i]; g += data[i+1]; b += data[i+2]; }
      const count = data.length / 4;
      setAlbumColor(`rgb(${Math.floor(r/count)}, ${Math.floor(g/count)}, ${Math.floor(b/count)})`);
    };
  };

  // View Counter + Location
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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
  // Typewriter Bio
  const [displayedBio, setDisplayedBio] = useState("");
  const [isDeletingBio, setIsDeletingBio] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const fullBio = SITE_CONFIG.bio;

  const enterSite = () => {
    setShowEnter(false);
    incrementViews();
    if (videoRef.current) videoRef.current.play().catch(() => {});

    setTimeout(() => {
      setShowProfile(true);
      setStartTyping(true);
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 350);
  };

  useEffect(() => {
    if (!startTyping) return;
    const handle = () => {
      const current = fullBio.substring(0, isDeletingBio ? displayedBio.length - 1 : displayedBio.length + 1);
      setDisplayedBio(current);
      if (!isDeletingBio && current === fullBio) setTimeout(() => setIsDeletingBio(true), 2200);
      else if (isDeletingBio && current === "") setIsDeletingBio(false);
    };
    const t = setTimeout(handle, isDeletingBio ? 90 : 170);
    return () => clearTimeout(t);
  }, [displayedBio, isDeletingBio, startTyping]);

  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  // Lyrics
  const [lyrics, setLyrics] = useState([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [lyricsLoading, setLyricsLoading] = useState(false);

  useEffect(() => {
    const fetchLyrics = async () => {
      setLyrics([]);
      setLyricsLoading(true);

      try {
        const originalUrl = `https://lrclib.net/api/get?artist_name=${encodeURIComponent(currentSong.artist)}&track_name=${encodeURIComponent(currentSong.title)}`;
        const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
        const fetchUrl = isLocalhost 
          ? `https://corsproxy.io/?${encodeURIComponent(originalUrl)}` 
          : originalUrl;

        const res = await fetch(fetchUrl);
        if (!res.ok) {
          setLyricsLoading(false);
          return;
        }

        const data = await res.json();
        if (data.syncedLyrics) {
          const parsed = data.syncedLyrics
            .split('\n')
            .map(line => {
              const match = /\[(\d+):(\d+\.?\d*)\]/.exec(line);
              if (!match) return null;
              const time = parseInt(match[1]) * 60 + parseFloat(match[2]);
              const text = line.replace(match[0], '').trim();
              return text ? { time, text } : null;
            })
            .filter(Boolean);
          setLyrics(parsed);
        }
      } catch (error) {
        console.error("Lyrics fetch error:", error);
      } finally {
        setLyricsLoading(false);
      }
    };

    fetchLyrics();
  }, [currentSong]);

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
  }, [currentLyricIndex]);

  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const snapContainerRef = useRef(null);
  const lyricsContainerRef = useRef(null);
  const currentLyricRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);
  const activeSectionRef = useRef(0);
  const isScrollingRef = useRef(false);
  const TOTAL_SECTIONS = 4;

  // Force section heights to match window.innerHeight exactly (fixes iOS Safari 100vh vs dvh mismatch)
  useEffect(() => {
    const setSectionHeights = () => {
      const h = window.innerHeight;
      document.querySelectorAll('.snap-section').forEach(el => {
        el.style.height = `${h}px`;
        el.style.minHeight = `${h}px`;
      });
      if (snapContainerRef.current) snapContainerRef.current.style.height = `${h}px`;
    };
    setSectionHeights();
    window.addEventListener('resize', setSectionHeights);
    return () => window.removeEventListener('resize', setSectionHeights);
  }, []);

  const smoothScrollTo = (container, targetY, duration = 900) => {
    const startY = container.scrollTop;
    const diff = targetY - startY;
    if (diff === 0) { isScrollingRef.current = false; return; }
    const startTime = performance.now();
    const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      container.scrollTop = startY + diff * ease(progress);
      if (progress < 1) requestAnimationFrame(step);
      else isScrollingRef.current = false;
    };
    requestAnimationFrame(step);
  };

  const scrollToSection = (index) => {
    const container = snapContainerRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(TOTAL_SECTIONS - 1, index));
    activeSectionRef.current = clamped;
    setActiveSection(clamped);
    isScrollingRef.current = true;
    const sections = container.querySelectorAll('.snap-section');
    const targetY = sections[clamped]?.offsetTop ?? clamped * window.innerHeight;
    smoothScrollTo(container, targetY);
  };

  useEffect(() => {
    const container = snapContainerRef.current;
    if (!container) return;
    let touchStartY = 0;

    const onWheel = (e) => {
      e.preventDefault();
      if (isScrollingRef.current) return;
      scrollToSection(activeSectionRef.current + (e.deltaY > 0 ? 1 : -1));
    };
    const onTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      if (isScrollingRef.current) return;
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 40) return;
      scrollToSection(activeSectionRef.current + (delta > 0 ? 1 : -1));
    };
    const onKey = (e) => {
      if (isScrollingRef.current) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); scrollToSection(activeSectionRef.current + 1); }
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   { e.preventDefault(); scrollToSection(activeSectionRef.current - 1); }
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
    extractDominantColor(currentSong.albumArt);
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

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play().catch(() => {});
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    if (audioRef.current) audioRef.current.currentTime = parseFloat(e.target.value);
  };

  const handleVolumeChange = (e) => setVolume(parseFloat(e.target.value));

  const selectSong = (song) => setCurrentSong(song);

  const nextSong = () => {
    const i = songs.findIndex(s => s.id === currentSong.id);
    const next = songs[(i + 1) % songs.length];
    setCurrentSong(next);
    setTimeout(() => {
      if (audioRef.current) audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }, 80);
  };

  const prevSong = () => {
    const i = songs.findIndex(s => s.id === currentSong.id);
    const prev = songs[(i - 1 + songs.length) % songs.length];
    setCurrentSong(prev);
    setTimeout(() => {
      if (audioRef.current) audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }, 80);
  };

  const [discordAvatar, setDiscordAvatar] = useState(null);
  const [discordStatus, setDiscordStatus] = useState('offline');
  const [discordBadges, setDiscordBadges] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
        const data = await res.json();
        if (data.success) {
          const { id, avatar, public_flags, premium_type } = data.data.discord_user;
          if (avatar) setDiscordAvatar(`https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=256`);
          setDiscordStatus(data.data.discord_status || 'offline');
          const badges = [];
          if (premium_type && premium_type > 0) badges.push({ icon: 'nitro', label: 'Nitro' });
          BADGE_FLAGS.forEach(({ flag, icon, label }) => {
            if (public_flags & flag) badges.push({ icon, label });
          });
          badges.push({ icon: 'quest', label: 'Completed a Quest' });
          setDiscordBadges(badges);
        }
      } catch {}
    })();
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

  

  return (
    <div 
      className="bg-black text-white overflow-hidden"
      style={{ cursor: 'none' }}
      
    >
      <style>{`
        html, body, .snap-container {
          cursor: none !important;
        }

        button, a, input, select, textarea, [role="button"], .group, .snap-section {
          cursor: none !important;
        }

        body, h1, h2, h3 {
          font-family: 'Geist', system-ui, -apple-system, sans-serif;
        }

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
          <video ref={videoRef} src={SITE_CONFIG.bgValue} loop muted playsInline className="fixed inset-0 w-full h-full object-cover" />
        )}
        {(SITE_CONFIG.bgType === 'gif' || SITE_CONFIG.bgType === 'image') && (
          <img src={SITE_CONFIG.bgValue} alt="Background" className="fixed inset-0 w-full h-full object-cover" />
        )}
      </div>

      <div className="fixed inset-0 z-10 bg-black/40 pointer-events-none" />

      {/* Particles */}
      <Particles className="absolute inset-0 z-30" quantity={70} ease={80} staticity={40} />

      <Comments />

      {/* VOLUME — hidden on iOS (volume is hardware-only on iOS Safari) */}
      <div
        className={`fixed top-4 left-4 z-[80] transition-all duration-300 ${activeSection === 3 || /iPad|iPhone|iPod/.test(navigator.userAgent) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        {/* Icon button */}
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/15 transition-all duration-200">
          <i className={`fa-solid ${volume === 0 ? 'fa-volume-xmark' : volume < 0.5 ? 'fa-volume-low' : 'fa-volume-high'} text-sm`}></i>
        </button>

        {/* Popup card */}
        <AnimatePresence>
          {showVolumeSlider && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute top-12 left-0 w-52 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/40 tracking-wider font-medium">VOLUME</span>
                <span className="text-xs text-white/70 font-mono tabular-nums">{Math.round(volume * 100)}%</span>
              </div>

              {/* Custom track */}
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-volume-low text-white/25 text-[10px]"></i>
                <div className="relative flex-1 h-1.5 bg-white/15 rounded-full">
                  <div
                    className="absolute left-0 top-0 h-full bg-white rounded-full pointer-events-none transition-all duration-75"
                    style={{ width: `${volume * 100}%` }}
                  />
                  <input
                    type="range" min="0" max="1" step="0.01" value={volume}
                    onChange={handleVolumeChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <i className="fa-solid fa-volume-high text-white/25 text-[10px]"></i>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
          <span>Denver</span>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap drop-shadow-[0_1px_3px_rgb(0,0,0,0.9)]">
            Location
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
                <div className="h-full bg-white/80 rounded-full transition-all duration-150 ease-out"
                  style={{ width: `${loadProgress}%` }} />
              </div>
              <div className="mt-3 font-mono text-[10px] text-white/30 tabular-nums tracking-wider">{loadProgress}%</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click to Enter */}
      <AnimatePresence>
        {!siteLoading && showEnter && (
          <motion.div key="enter"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5 }}
            onClick={enterSite}
            className="group fixed inset-0 z-[90] flex flex-col items-center justify-center bg-black/90 cursor-none">
            <div className="absolute w-96 h-96 rounded-full bg-white/[0.025] blur-3xl pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="relative text-center">
              <div className="relative inline-flex items-center justify-center mb-7" style={{ animation: 'float 3s ease-in-out infinite' }}>
                <span className="absolute inset-0 rounded-full border border-white/20 animate-ping" style={{ animationDuration: '2.2s' }} />
                <div className="relative w-16 h-16 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-white/50 group-hover:bg-white/5">
                  <i className="fa-solid fa-play text-white/80 text-lg ml-1"></i>
                </div>
              </div>
              <div className="text-white text-2xl tracking-[6px] font-light mb-2">ENTER</div>
              <div className="text-white/50 text-sm tracking-[3px]">AVYX</div>
              <div className="text-white/25 text-[10px] tracking-[2px] mt-5 font-mono uppercase">Click or press Enter</div>
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
                  ? 'w-2.5 h-2.5 bg-white'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`} />
            </button>
          ))}
        </div>
      )}

      <div ref={snapContainerRef} className={`snap-container relative z-20 h-screen overflow-y-scroll transition-all duration-500 ${showEnter ? 'blur-lg' : ''}`} style={{ scrollbarWidth: 'none' }}>

        {/* PAGE 1 - Profile Card */}
        <div className="snap-section min-h-screen flex flex-col items-center justify-center px-6">
          <div
            className={`relative w-full max-w-[400px] transition-all duration-700 ease-out ${showProfile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          >
            {/* Spinning gradient border */}
            <div className="absolute -inset-[1px] rounded-[28px] overflow-hidden pointer-events-none">
              <div style={{
                position: 'absolute', inset: '-100%',
                background: 'conic-gradient(from 0deg, transparent 330deg, rgba(255,255,255,0.35) 355deg, transparent 360deg)',
                animation: 'borderSpin 4s linear infinite',
                transformOrigin: 'center center'
              }} />
            </div>

            {/* Glass card */}
            <div className="relative rounded-[27px] bg-white/[0.04] backdrop-blur-3xl border border-white/[0.07] overflow-hidden">

              {/* Ambient glow top */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-48 bg-white/5 blur-3xl rounded-full pointer-events-none" />

              <div className="relative z-10 p-8">

                {/* Avatar */}
                <div className="flex justify-center mb-6" style={{ animation: 'float 4s ease-in-out infinite' }}>
                  <div className="relative">
                    {/* Gradient ring */}
                    <div className="relative w-[108px] h-[108px] rounded-full p-[2.5px]"
                      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05))' }}>
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img src={discordAvatar || SITE_CONFIG.pfp} className="w-full h-full object-cover" alt="Profile" />
                      </div>
                    </div>
                    {/* Status dot */}
                    <div className={`absolute bottom-1 right-1 w-[18px] h-[18px] rounded-full border-[2.5px] border-[#080808] shadow-lg ${
                      discordStatus === 'online' ? 'bg-emerald-400 shadow-emerald-400/60' :
                      discordStatus === 'idle'   ? 'bg-yellow-400 shadow-yellow-400/60' :
                      discordStatus === 'dnd'    ? 'bg-red-500 shadow-red-500/60' :
                                                   'bg-zinc-500'
                    }`} />
                  </div>
                </div>

                {/* Name */}
                <h1 className="text-center text-[2.1rem] font-bold tracking-tight mb-3"
                  style={{ background: 'linear-gradient(160deg,#fff 30%,rgba(255,255,255,0.55))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {SITE_CONFIG.username}
                </h1>

                {/* Discord badges */}
                {discordBadges.length > 0 && (
                  <div className="flex justify-center gap-3 mb-4">
                    {discordBadges.map((badge) => (
                      <div key={badge.icon} className="relative group flex items-center justify-center">
                        <span
                          className="inline-block w-5 h-5 transition-all duration-200 group-hover:scale-125"
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
                <div className="flex items-center justify-center gap-2 flex-wrap mb-5">
                  <span className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/45">
                    <i className="fa-solid fa-code text-[8px]" /> Developer
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/45">
                    <i className="fa-solid fa-location-dot text-[8px]" /> Denver
                  </span>
                  <span className={`inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full border ${
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

                {/* Cycling text */}
                <div className="h-5 flex items-center justify-center mb-6">
                  <span className={`text-[11px] tracking-[4px] uppercase text-white/30 transition-opacity duration-500 ${fadeVisible ? 'opacity-100' : 'opacity-0'}`}>
                    {fadeTexts[currentFadeIndex]}
                  </span>
                </div>

                {/* Gradient divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                {/* Social icons */}
                <div className="flex justify-center gap-5 text-4xl">
                  <a href="https://discord.com/users/825785012468056155" target="_blank" rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-all duration-200 hover:scale-125 drop-shadow-[0_0_6px_#ffffff] hover:drop-shadow-[0_0_14px_#5865F2]">
                    <i className="fa-brands fa-discord" />
                  </a>
                  <a href="#"
                    className="text-white/70 hover:text-white transition-all duration-200 hover:scale-125 drop-shadow-[0_0_6px_#ffffff] hover:drop-shadow-[0_0_14px_#ffffff]">
                    <i className="fa-brands fa-x-twitter" />
                  </a>
                  <a href="#"
                    className="text-white/70 hover:text-white transition-all duration-200 hover:scale-125 drop-shadow-[0_0_6px_#ffffff] hover:drop-shadow-[0_0_14px_#ff6b35] flex items-center">
                    <svg viewBox="0 0 100 100" width="0.85em" height="0.85em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="50,2 93,26 93,74 50,98 7,74 7,26" />
                      <text x="50" y="66" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="38" fill="#000">cfx</text>
                    </svg>
                  </a>
                  <a href="#"
                    className="text-white/70 hover:text-white transition-all duration-200 hover:scale-125 drop-shadow-[0_0_6px_#ffffff] hover:drop-shadow-[0_0_14px_#E1306C]">
                    <i className="fa-brands fa-instagram" />
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* PAGE 2 — About Me */}
        <div ref={aboutRef} className="snap-section min-h-screen flex flex-col justify-center px-4 sm:px-6 py-10 border-t border-white/[0.06]">
          <div className="max-w-[900px] w-full mx-auto">

            {/* Header */}
            <div className={`mb-5 transition-all duration-700 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="font-mono text-[10px] tracking-[4px] text-white/25 uppercase mb-1.5">01 / About</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight"
                style={{ background: 'linear-gradient(135deg,#fff 40%,rgba(255,255,255,0.45))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Who I am
              </h2>
            </div>

            {/* ── MOBILE LAYOUT (< lg) ── */}
            <div className="flex flex-col gap-3 lg:hidden">

              {/* Bio */}
              <div className={`relative rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.07] p-4 overflow-hidden transition-all duration-700 delay-100 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
                <p className="font-mono text-[10px] tracking-[3px] text-white/25 uppercase mb-2">Bio</p>
                <p className="text-white/60 text-[13px] leading-relaxed mb-3">
                  Developer &amp; programmer based in <span className="text-white/85 font-medium">Denver, CO</span>. Working at <span className="text-white/85 font-medium">Amazon Robotics</span>. Open to opportunities.
                </p>
                <div className="flex flex-col gap-2 mt-1">
                  {skills.map((skill, i) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="font-mono text-[10px] text-white/45">{skill.name}</span>
                        <span className="font-mono text-[10px] text-white/25">{skill.pct}%</span>
                      </div>
                      <div className="h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div className="h-full rounded-full transition-all ease-out"
                          style={{
                            width: aboutVisible ? `${skill.pct}%` : '0%',
                            transitionDuration: '900ms',
                            transitionDelay: `${i * 80 + 150}ms`,
                            background: 'linear-gradient(90deg, rgba(255,255,255,0.7), rgba(255,255,255,0.2))',
                          }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clock + Discord side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div className={`relative rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.07] p-4 overflow-hidden flex flex-col justify-between transition-all duration-700 delay-150 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div>
                    <p className="font-mono text-[10px] tracking-[3px] text-white/25 uppercase mb-2">Time</p>
                    <div className="font-mono text-xl font-semibold text-white tabular-nums leading-none">{formatClock(clockTime)}</div>
                    <p className="font-mono text-[10px] text-white/25 mt-1.5">GMT−7 · Denver</p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_#34d399]" />
                    <span className="font-mono text-[9px] text-white/25">Available</span>
                  </div>
                </div>

                <div className={`transition-all duration-700 delay-200 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <DiscordPresence userId={DISCORD_USER_ID} compact />
                </div>
              </div>

              {/* Games horizontal strip */}
              <div className={`relative rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.07] p-4 overflow-hidden transition-all duration-700 delay-250 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-mono text-[10px] tracking-[3px] text-white/25 uppercase">Games</p>
                  <button onClick={() => setShowGameLibrary(true)} className="font-mono text-[10px] text-white/30 hover:text-white/70 flex items-center gap-1 transition-colors">
                    VIEW ALL <i className="fa-solid fa-arrow-right text-[8px]" />
                  </button>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                  {gameLibrary.map((game, i) => (
                    <div key={game.id} onClick={() => { setCurrentGameIndex(i); setShowGameLibrary(true); }}
                      className="flex-shrink-0 cursor-pointer group">
                      <div className="relative w-14 h-20 rounded-lg overflow-hidden border border-white/[0.08]">
                        <img src={game.cover} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── DESKTOP LAYOUT (lg+) ── */}
            <div className="hidden lg:flex lg:flex-col gap-3">

              {/* Row 1 — Bio + Clock */}
              <div className="grid grid-cols-3 gap-3">
                <div className={`col-span-2 relative rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.07] p-5 overflow-hidden transition-all duration-700 delay-100 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
                  <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/[0.025] rounded-full blur-3xl pointer-events-none" />
                  <p className="font-mono text-[10px] tracking-[3px] text-white/25 uppercase mb-3">Bio</p>
                  <p className="text-white/65 text-[15px] leading-relaxed mb-4">
                    Hi, Avy here — developer &amp; programmer based in <span className="text-white/90 font-medium">Denver, CO</span>. Currently working at <span className="text-white/90 font-medium">Amazon Robotics</span>. Open to new opportunities.
                  </p>
                  <div className="flex flex-col gap-2.5 mt-1">
                    {skills.map((skill, i) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span className="font-mono text-[10px] text-white/50">{skill.name}</span>
                          <span className="font-mono text-[10px] text-white/25">{skill.pct}%</span>
                        </div>
                        <div className="h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                          <div className="h-full rounded-full transition-all ease-out"
                            style={{
                              width: aboutVisible ? `${skill.pct}%` : '0%',
                              transitionDuration: '900ms',
                              transitionDelay: `${i * 80 + 200}ms`,
                              background: 'linear-gradient(90deg, rgba(255,255,255,0.75), rgba(255,255,255,0.2))',
                            }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`relative rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.07] p-5 overflow-hidden flex flex-col justify-between transition-all duration-700 delay-150 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
                  <div>
                    <p className="font-mono text-[10px] tracking-[3px] text-white/25 uppercase mb-4">Local Time</p>
                    <div className="font-mono text-[2.2rem] font-semibold text-white tracking-tight tabular-nums leading-none">{formatClock(clockTime)}</div>
                    <p className="font-mono text-[11px] text-white/30 mt-2">GMT−7 · Denver, CO</p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] flex-shrink-0" />
                    <span className="font-mono text-[10px] text-white/30 tracking-wide">Available for work</span>
                  </div>
                </div>
              </div>

              {/* Row 2 — Discord + Games */}
              <div className="grid grid-cols-3 gap-3">
                <div className={`transition-all duration-700 delay-200 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <DiscordPresence userId={DISCORD_USER_ID} />
                </div>

                <div className={`col-span-2 relative rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.07] p-5 overflow-hidden transition-all duration-700 delay-300 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-mono text-[10px] tracking-[3px] text-white/25 uppercase">Game Collection</p>
                    <button onClick={() => setShowGameLibrary(true)} className="font-mono text-[10px] text-white/30 hover:text-white/70 flex items-center gap-1.5 transition-colors duration-150">
                      VIEW ALL <i className="fa-solid fa-arrow-right text-[8px]" />
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {gameLibrary.slice(0, 5).map((game, i) => (
                      <div key={game.id} onClick={() => { setCurrentGameIndex(i); setShowGameLibrary(true); }} className="group cursor-pointer">
                        <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/[0.08] bg-black/30">
                          <img src={game.cover} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className={`absolute top-1.5 right-1.5 px-1.5 py-0.5 text-[7px] font-semibold rounded-full ${getStatusColor(game.status)}`}>{game.status}</div>
                        </div>
                        <p className="mt-1.5 font-mono text-[10px] line-clamp-1 text-white/35 group-hover:text-white/75 transition-colors duration-200">{game.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* PAGE 3 - Projects */}
        <div ref={projectsRef} className="snap-section min-h-screen flex flex-col justify-center px-4 sm:px-6 py-10 border-t border-white/[0.06]">
          <div className="max-w-[900px] w-full mx-auto">

            {/* Header */}
            <div className={`mb-6 transition-all duration-700 ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="font-mono text-[10px] tracking-[4px] text-white/25 uppercase mb-1.5">02 / Projects</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight"
                style={{ background: 'linear-gradient(135deg,#fff 40%,rgba(255,255,255,0.45))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                What I've built
              </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((project, i) => (
                <button key={project.id}
                  onClick={() => openExternalLink(project.url, project.title)}
                  className={`group relative rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.07] overflow-hidden text-left transition-all duration-700 hover:border-white/[0.15] hover:bg-white/[0.05] ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${i * 100 + 100}ms` }}>

                  {/* Banner */}
                  <div className="relative h-32 flex items-center justify-center overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${project.color}33, ${project.color}0d)` }}>
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: project.color }} />
                    <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${project.color}22`, border: `1px solid ${project.color}44` }}>
                      <i className={`${project.icon} text-2xl`} style={{ color: project.color }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                      <i className="fa-solid fa-arrow-up-right text-white/25 text-xs group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-white/45 text-[13px] italic mb-2.5">{project.tagline}</p>
                    <p className="text-white/55 text-[13px] leading-relaxed mb-3.5">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map(tag => (
                        <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-white/45">{tag}</span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}

              {/* Coming soon placeholder */}
              <div className={`relative rounded-2xl border border-dashed border-white/[0.1] flex flex-col items-center justify-center text-center p-8 min-h-[220px] transition-all duration-700 ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${projects.length * 100 + 100}ms` }}>
                <i className="fa-solid fa-plus text-white/20 text-xl mb-3" />
                <p className="text-white/25 text-sm">More on the way</p>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 4 - Music Player */}
        <div ref={musicRef} className="snap-section relative border-t border-white/10" style={{ height: '100dvh' }}>

          {/* ── Rounded card ── */}
          <div className="absolute inset-3 lg:inset-5 rounded-3xl overflow-hidden shadow-2xl">

          {/* ── Full-bleed gradient background from cover ── */}
          <AnimatePresence mode="sync">
            <motion.div key={currentSong.id + '-fullbg'} className="absolute inset-0 z-0"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 1.1 }}>
              <img src={currentSong.albumArt} alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transform: 'scale(1.4)', filter: 'blur(80px) saturate(2.2) brightness(0.28)' }} />
              <div className="absolute inset-0 bg-black/30" />
              {/* vignette: dark edges, lighter centre */}
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse 100% 90% at 50% 35%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)'
              }} />
            </motion.div>
          </AnimatePresence>

          {/* ── Content ── */}
          <div className={`relative z-10 flex flex-col lg:flex-row h-full transition-opacity duration-700 ${musicVisible ? 'opacity-100' : 'opacity-0'}`}>

            {/* ════ LEFT PANEL — art + controls ════ */}
            <div className="flex-shrink-0 flex flex-col lg:w-[400px] lg:justify-center px-6 sm:px-8 lg:px-14 pt-6 lg:pt-0 pb-3 lg:pb-0">

              {/* ── MOBILE compact header ── */}
              <div className="flex items-center gap-3 lg:hidden">
                <AnimatePresence mode="wait">
                  <motion.img key={currentSong.id + '-m-art'} src={currentSong.albumArt} alt=""
                    initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0 shadow-xl ring-1 ring-white/10" />
                </AnimatePresence>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm leading-tight truncate">{currentSong.title}</p>
                  <p className="text-white/45 text-xs truncate mt-0.5">{currentSong.artist}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={prevSong} className="text-white/55 hover:text-white transition-colors active:scale-90">
                    <i className="fa-solid fa-backward-step" />
                  </button>
                  <button onClick={togglePlay}
                    className="w-9 h-9 rounded-full text-white flex items-center justify-center transition-all active:scale-90"
                    style={{ background: `color-mix(in srgb, ${albumColor} 55%, white 10%)` }}>
                    <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-sm`} />
                  </button>
                  <button onClick={nextSong} className="text-white/55 hover:text-white transition-colors active:scale-90">
                    <i className="fa-solid fa-forward-step" />
                  </button>
                </div>
              </div>

              {/* ── MOBILE progress ── */}
              <div className="lg:hidden mt-3">
                <div className="relative h-[2px] bg-white/15 rounded-full">
                  <div className="absolute left-0 top-0 h-full rounded-full pointer-events-none"
                    style={{
                      width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                      background: `linear-gradient(90deg, color-mix(in srgb, ${albumColor} 70%, white 30%), #fff)`,
                    }} />
                  <input type="range" min="0" max={duration || 100} value={currentTime}
                    onChange={handleSeek} className="absolute inset-0 w-full opacity-0 cursor-pointer" />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="font-mono text-[10px] text-white/30 tabular-nums">{formatTime(currentTime)}</span>
                  <span className="font-mono text-[10px] text-white/30 tabular-nums">{formatTime(duration)}</span>
                </div>
              </div>

              {/* ── DESKTOP large art + controls ── */}
              <div className="hidden lg:flex flex-col">
                {/* Glowing album art */}
                <div className="relative w-64 h-64 mx-auto">
                  {/* Rotating gradient ring, tinted to album color */}
                  <div className="absolute -inset-3 rounded-[28px] overflow-hidden pointer-events-none">
                    <div style={{
                      position: 'absolute', inset: '-100%',
                      background: `conic-gradient(from 0deg, transparent 320deg, color-mix(in srgb, ${albumColor} 85%, white 15%) 350deg, transparent 360deg)`,
                      animation: isPlaying ? 'borderSpin 5s linear infinite' : 'none',
                      transformOrigin: 'center center',
                    }} />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div key={currentSong.id + '-glow'}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.9 }}
                      className="absolute -inset-8 rounded-3xl"
                      style={{
                        backgroundImage: `url(${currentSong.albumArt})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(28px) brightness(0.65)',
                        opacity: 0.75,
                      }} />
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.img key={currentSong.id + '-d-art'} src={currentSong.albumArt} alt=""
                      initial={{ opacity: 0, scale: 0.88, y: 8 }}
                      animate={{ opacity: 1, scale: isPlaying ? 1 : 0.96, y: 0 }}
                      exit={{ opacity: 0, scale: 0.88, y: -8 }}
                      transition={{ duration: 0.45 }}
                      className="relative w-full h-full rounded-2xl object-cover shadow-2xl" />
                  </AnimatePresence>
                </div>

                {/* Track counter + Title + artist */}
                <AnimatePresence mode="wait">
                  <motion.div key={currentSong.id + '-d-info'}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }} className="mt-7 text-center">
                    <p className="font-mono text-[10px] tracking-[4px] mb-1.5"
                      style={{ color: `color-mix(in srgb, ${albumColor} 70%, white 30%)` }}>
                      {String(songs.findIndex(s => s.id === currentSong.id) + 1).padStart(2, '0')} / {String(songs.length).padStart(2, '0')}
                    </p>
                    <h2 className="text-2xl font-bold text-white leading-tight tracking-tight">{currentSong.title}</h2>
                    <p className="text-white/50 text-sm mt-1">{currentSong.artist}</p>
                  </motion.div>
                </AnimatePresence>

                {/* Progress */}
                <div className="mt-5">
                  <div className="relative h-[3px] bg-white/15 rounded-full group cursor-pointer">
                    <div className="absolute left-0 top-0 h-full rounded-full pointer-events-none"
                      style={{
                        width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                        background: `linear-gradient(90deg, color-mix(in srgb, ${albumColor} 70%, white 30%), #fff)`,
                      }} />
                    <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{ left: `calc(${duration ? (currentTime / duration) * 100 : 0}% - 7px)` }} />
                    <input type="range" min="0" max={duration || 100} value={currentTime}
                      onChange={handleSeek} className="absolute inset-0 w-full opacity-0 cursor-pointer" />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="font-mono text-[11px] text-white/35 tabular-nums">{formatTime(currentTime)}</span>
                    <span className="font-mono text-[11px] text-white/35 tabular-nums">{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Controls dock */}
                <div className="mt-7 mx-auto flex items-center gap-6 px-6 py-3 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <button onClick={prevSong} className="text-white/55 hover:text-white transition-colors active:scale-90">
                    <i className="fa-solid fa-backward-step text-xl" />
                  </button>
                  <button onClick={togglePlay}
                    className="w-14 h-14 rounded-full bg-white hover:bg-white/90 text-black flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                    style={{ boxShadow: `0 8px 22px color-mix(in srgb, ${albumColor} 55%, transparent)` }}>
                    <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-lg ${!isPlaying ? 'ml-1' : ''}`} />
                  </button>
                  <button onClick={nextSong} className="text-white/55 hover:text-white transition-colors active:scale-90">
                    <i className="fa-solid fa-forward-step text-xl" />
                  </button>
                </div>

                {/* Queue */}
                <div className="mt-8">
                  <p className="font-mono text-[9px] tracking-[3px] text-white/25 uppercase mb-2">Queue</p>
                  {songs.map((song) => (
                    <button key={song.id} onClick={() => selectSong(song)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${currentSong.id === song.id ? 'bg-white/[0.07]' : 'hover:bg-white/[0.06]'}`}
                      style={currentSong.id === song.id
                        ? { boxShadow: `inset 2.5px 0 0 0 color-mix(in srgb, ${albumColor} 70%, white 30%)` }
                        : {}}>
                      <img src={song.albumArt} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" alt="" />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${currentSong.id === song.id ? 'text-white' : 'text-white/55'}`}>{song.title}</p>
                        <p className="text-xs text-white/30 truncate">{song.artist}</p>
                      </div>
                      {currentSong.id === song.id && isPlaying && (
                        <span className="flex gap-[3px] items-end h-3.5 flex-shrink-0 mr-1">
                          {[0.65,1,0.8].map((h, i) => (
                            <span key={i} className="w-[3px] rounded-full animate-pulse"
                              style={{ height: `${h * 100}%`, animationDelay: `${i * 0.18}s`, background: `color-mix(in srgb, ${albumColor} 70%, white 30%)` }} />
                          ))}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ════ RIGHT PANEL — lyrics ════ */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden px-6 sm:px-8 lg:px-10 lg:pr-16 pb-4 lg:pb-16 lg:pt-14">
              <p className="font-mono text-[10px] tracking-[4px] text-white/22 uppercase mb-3 flex-shrink-0 lg:mb-5">Lyrics</p>

              <AnimatePresence mode="wait">
                <motion.div key={currentSong.id + '-lyrics'}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  ref={lyricsContainerRef}
                  className="flex-1 overflow-y-scroll min-h-0"
                  style={{
                    scrollbarWidth: 'none',
                    maskImage: 'linear-gradient(to bottom, transparent, white 7%, white 88%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, white 7%, white 88%, transparent)',
                  }}
                >
                  {lyricsLoading ? (
                    <p className="text-white/30 text-sm pt-12">Loading lyrics…</p>
                  ) : lyrics.length > 0 ? (
                    <>
                      <div style={{ height: '120px', flexShrink: 0 }} />
                      {lyrics.map((line, idx) => {
                        const offset = idx - currentLyricIndex;
                        const abs = Math.abs(offset);
                        const isCurrent = offset === 0;
                        return (
                          <div key={idx} ref={isCurrent ? currentLyricRef : null}
                            style={{
                              marginBottom: isCurrent ? '1.7rem' : '1.35rem',
                              color: isCurrent ? '#fff' : `rgba(255,255,255,${abs === 1 ? 0.5 : abs === 2 ? 0.24 : 0.09})`,
                              fontSize: isCurrent
                                ? 'clamp(0.95rem, 2.8vw, 1.65rem)'
                                : abs <= 1
                                  ? 'clamp(0.75rem, 1.9vw, 1.12rem)'
                                  : 'clamp(0.65rem, 1.5vw, 0.95rem)',
                              fontWeight: isCurrent ? 700 : 400,
                              lineHeight: 1.38,
                              letterSpacing: isCurrent ? '-0.01em' : '0',
                              transition: 'color 0.5s ease, font-size 0.5s ease, font-weight 0.5s ease, letter-spacing 0.5s ease',
                            }}
                          >
                            {line.text}
                          </div>
                        );
                      })}
                      <div style={{ height: '60vh', flexShrink: 0 }} />
                    </>
                  ) : (
                    <p className="text-white/18 text-sm pt-12">No synced lyrics available</p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── MOBILE queue (below lyrics) ── */}
            <div className="lg:hidden flex-shrink-0 px-6 pb-5 pt-2">
              <p className="font-mono text-[9px] tracking-[3px] text-white/22 uppercase mb-2">Queue</p>
              <div className="flex gap-3">
                {songs.map((song) => (
                  <button key={song.id} onClick={() => selectSong(song)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl flex-1 min-w-0 transition-all text-left ${currentSong.id === song.id ? 'bg-white/[0.08]' : 'bg-white/[0.05] hover:bg-white/10'}`}
                    style={currentSong.id === song.id
                      ? { boxShadow: `inset 2px 0 0 0 color-mix(in srgb, ${albumColor} 70%, white 30%)` }
                      : {}}>
                    <img src={song.albumArt} className="w-7 h-7 rounded-lg object-cover flex-shrink-0" alt="" />
                    <div className="min-w-0">
                      <p className={`text-xs font-medium truncate ${currentSong.id === song.id ? 'text-white' : 'text-white/50'}`}>{song.title}</p>
                      <p className="text-[10px] text-white/28 truncate">{song.artist}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          </div>{/* rounded card */}
        </div>
      </div>

      <audio ref={audioRef} onEnded={nextSong} loop={SITE_CONFIG.audioLoop} />

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