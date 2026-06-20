import { useState, useEffect } from 'react';

const STATUS_COLOR = {
  online:  { dot: 'bg-emerald-400', label: 'Online',          text: 'text-emerald-400' },
  idle:    { dot: 'bg-yellow-400',  label: 'Idle',            text: 'text-yellow-400'  },
  dnd:     { dot: 'bg-red-400',     label: 'Do Not Disturb',  text: 'text-red-400'     },
  offline: { dot: 'bg-zinc-500',    label: 'Offline',         text: 'text-zinc-500'    },
};

const DiscordPresence = ({ userId, compact = false }) => {
  const [presence, setPresence] = useState(null);

  useEffect(() => {
    if (!userId) return;
    const fetch_ = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const data = await res.json();
        if (data.success) setPresence(data.data);
      } catch {}
    };
    fetch_();
    const id = setInterval(fetch_, 15000);
    return () => clearInterval(id);
  }, [userId]);

  if (!presence) {
    return (
      <div className="rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.07] p-4 h-full">
        <p className="font-mono text-[10px] text-white/25 tracking-[3px] uppercase mb-2">Discord</p>
        <div className="text-white/30 text-xs">Loading…</div>
      </div>
    );
  }

  const { discord_status, activities, spotify, discord_user } = presence;
  const s = STATUS_COLOR[discord_status] || STATUS_COLOR.offline;
  const displayName = discord_user?.global_name || discord_user?.username || 'Discord User';
  const avatarUrl = discord_user?.avatar
    ? `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png?size=128`
    : null;

  const activity    = activities?.find(a => a.type !== 4);
  const customState = activities?.find(a => a.type === 4);

  if (compact) return (
    <div className="rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.07] p-4 h-full flex flex-col justify-between">
      <p className="font-mono text-[10px] text-white/25 tracking-[3px] uppercase mb-3">Discord</p>
      <div className="flex items-center gap-2.5">
        <div className="relative flex-shrink-0">
          {avatarUrl
            ? <img src={avatarUrl} alt={displayName} className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10" />
            : <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold text-sm">{displayName[0]}</div>
          }
          <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 ${s.dot} rounded-full border-2 border-[#0a0a0a]`} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-white truncate">{displayName}</p>
          <p className={`font-mono text-[10px] ${s.text}`}>{s.label}</p>
        </div>
      </div>
      {customState?.state && (
        <p className="text-[11px] text-white/40 mt-2 truncate leading-tight">{customState.state}</p>
      )}
      {(activity || spotify) && (
        <div className="mt-2 pt-2 border-t border-white/[0.06]">
          <p className="font-mono text-[9px] text-white/25 uppercase tracking-[2px]">
            {spotify ? 'Spotify' : 'Playing'}
          </p>
          <p className="text-[11px] text-white/55 truncate mt-0.5">
            {spotify ? spotify.song : activity?.name}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.07] p-5 h-full flex flex-col">
      <p className="font-mono text-[10px] text-white/25 tracking-[3px] uppercase mb-4">Discord</p>

      {/* User row */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-shrink-0">
          {avatarUrl ? (
            <img src={avatarUrl} alt={displayName} className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold text-base">
              {displayName[0].toUpperCase()}
            </div>
          )}
          <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${s.dot} rounded-full border-2 border-[#0a0a0a]`} />
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-white text-sm truncate">{displayName}</div>
          <div className={`text-[11px] font-mono ${s.text}`}>{s.label}</div>
        </div>
      </div>

      {/* Custom status */}
      {customState?.state && (
        <p className="text-xs text-white/50 mb-3 leading-relaxed">{customState.state}</p>
      )}

      {/* Activity */}
      {activity && (
        <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 mb-2">
          <p className="font-mono text-[9px] text-white/30 tracking-[2px] uppercase mb-1">Playing</p>
          <p className="text-white text-sm font-medium truncate">{activity.name}</p>
          {activity.details && <p className="text-white/45 text-xs truncate mt-0.5">{activity.details}</p>}
        </div>
      )}

      {/* Spotify */}
      {spotify && (
        <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 flex gap-3">
          <img src={spotify.album_art_url} alt="Album" className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-mono text-[9px] text-[#1DB954] tracking-[2px] uppercase mb-0.5">Spotify</p>
            <p className="text-white text-sm font-medium truncate">{spotify.song}</p>
            <p className="text-white/45 text-xs truncate">{spotify.artist}</p>
          </div>
        </div>
      )}

      {!activity && !spotify && !customState?.state && (
        <p className="text-xs text-white/25 font-mono mt-auto">No active activity</p>
      )}
    </div>
  );
};

export default DiscordPresence;
