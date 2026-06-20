import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

const formatDate = (ts) => {
  const d = new Date(ts);
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
};

const gradientAvatar = (name) => {
  const pairs = [
    ['#6366f1','#8b5cf6'], ['#ec4899','#f43f5e'], ['#10b981','#06b6d4'],
    ['#f59e0b','#ef4444'], ['#3b82f6','#6366f1'], ['#8b5cf6','#ec4899'],
    ['#06b6d4','#10b981'], ['#f97316','#f59e0b'],
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return pairs[Math.abs(hash) % pairs.length];
};

const useIsMobile = () => {
  const [mobile, setMobile] = useState(() => window.innerWidth < 1024);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 1024);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mobile;
};

export default function Comments() {
  const isMobile = useIsMobile();
  const [open, setOpen]             = useState(false);
  const [comments, setComments]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [newest, setNewest]         = useState(true);
  const [showForm, setShowForm]     = useState(false);
  const [name, setName]             = useState('');
  const [message, setMessage]       = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState('');

  const sorted = newest ? [...comments] : [...comments].reverse();

  useEffect(() => {
    if (!open || !supabase) return;
    setLoading(true);
    supabase.from('comments').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setComments(data || []); setLoading(false); });
  }, [open]);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) { setError('Fill in both fields.'); return; }
    if (message.trim().length > 200) { setError('Max 200 characters.'); return; }
    if (!supabase) { setError('Comments unavailable.'); return; }
    setError(''); setSubmitting(true);
    const { data, error: err } = await supabase
      .from('comments').insert({ name: name.trim(), message: message.trim() }).select().single();
    setSubmitting(false);
    if (err) { setError('Something went wrong.'); return; }
    setComments(prev => [data, ...prev]);
    setMessage(''); setName(''); setShowForm(false);
  };

  const Panel = (
    <div className={`relative overflow-hidden ${isMobile ? 'rounded-t-[2rem]' : 'rounded-2xl'}`}
      style={{ background: 'rgba(8,8,12,0.97)', border: '1px solid rgba(255,255,255,0.07)' }}>

      {/* Top accent gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #6366f1 30%, #8b5cf6 70%, transparent)' }} />

      {/* Subtle background glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />

      {/* Drag handle — mobile only */}
      {isMobile && (
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-9 h-[3px] rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 16px rgba(99,102,241,0.4)' }}>
            <i className="fa-regular fa-comment text-white text-xs" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-none">Comments</p>
            <p className="text-[10px] font-mono mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {comments.length} {comments.length === 1 ? 'note' : 'notes'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort toggle */}
          <button onClick={() => setNewest(n => !n)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <i className={`fa-solid text-[8px] ${newest ? 'fa-arrow-down-wide-short' : 'fa-arrow-up-wide-short'}`} />
            {newest ? 'Newest' : 'Oldest'}
          </button>

          {/* New comment */}
          <button onClick={() => { setShowForm(f => !f); setError(''); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: showForm ? '0 0 16px rgba(99,102,241,0.4)' : 'none' }}>
            <i className={`fa-solid text-[9px] transition-transform duration-200 ${showForm ? 'fa-xmark' : 'fa-plus'}`} />
            {showForm ? 'Cancel' : 'Leave a note'}
          </button>

          {/* Close */}
          <button onClick={() => setOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-lg transition-all hover:bg-white/10"
            style={{ color: 'rgba(255,255,255,0.25)' }}>
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form onSubmit={submit}
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
            className="overflow-hidden"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="px-5 py-4 flex flex-col gap-3">
              <input value={name} onChange={e => setName(e.target.value)}
                placeholder="Your name" maxLength={32}
                className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', caretColor: '#6366f1' }}
                onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.07)'}
              />
              <textarea value={message} onChange={e => setMessage(e.target.value)}
                placeholder="Say something..." maxLength={200} rows={3}
                className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all resize-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', caretColor: '#6366f1' }}
                onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.07)'}
              />
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  {message.length}<span style={{ color: 'rgba(255,255,255,0.1)' }}>/200</span>
                </span>
                <button type="submit" disabled={submitting}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  {submitting ? 'Posting…' : 'Post →'}
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />

      {/* Comment list */}
      <div className="overflow-y-auto" style={{ maxHeight: isMobile ? '52vh' : '22rem', scrollbarWidth: 'none' }}>
        {loading ? (
          <div className="flex items-center justify-center py-12 gap-2">
            <div className="w-1 h-1 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1 h-1 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1 h-1 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        ) : comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-1"
              style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <i className="fa-regular fa-comment text-indigo-400 text-sm" />
            </div>
            <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>No notes yet</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>Be the first to leave one</p>
          </div>
        ) : (
          sorted.map((c, idx) => {
            const [from, to] = gradientAvatar(c.name);
            return (
              <motion.div key={c.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.2 }}
                className="group flex gap-3.5 px-5 py-4 transition-all cursor-default"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                {/* Gradient avatar */}
                <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-xs font-bold uppercase"
                  style={{ background: `linear-gradient(135deg, ${from}, ${to})`, boxShadow: `0 4px 12px ${from}40` }}>
                  {c.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-semibold text-white truncate">{c.name}</span>
                    <span className="text-[10px] font-mono flex-shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {formatDate(c.created_at)}
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed break-words" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {c.message}
                  </p>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Bottom safe area — mobile */}
      {isMobile && <div className="h-6" />}
    </div>
  );

  return (
    <>
      {/* Trigger */}
      <button onClick={() => setOpen(o => !o)}
        className="fixed top-4 right-4 z-[80] w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200"
        style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', color: open ? '#fff' : 'rgba(255,255,255,0.6)' }}>
        <i className="fa-regular fa-comment text-sm" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="bd"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[90]"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }} />

            {isMobile ? (
              <motion.div key="sheet"
                initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 32, stiffness: 320 }}
                drag="y" dragConstraints={{ top: 0 }} dragElastic={{ top: 0, bottom: 0.4 }}
                onDragEnd={(_, info) => { if (info.offset.y > 80) setOpen(false); }}
                className="fixed bottom-0 left-0 right-0 z-[91] pointer-events-auto">
                {Panel}
              </motion.div>
            ) : (
              <motion.div key="modal"
                initial={{ opacity: 0, scale: 0.96, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="fixed inset-0 z-[91] flex items-center justify-center p-4 pointer-events-none">
                <div className="pointer-events-auto w-full max-w-lg">
                  {Panel}
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
