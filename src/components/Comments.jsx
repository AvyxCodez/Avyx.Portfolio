import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

const timeAgo = (ts) => {
  const diff = Math.floor((Date.now() - new Date(ts)) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const avatarColor = (name) => {
  const colors = ['#5865F2','#ed4245','#3ba55d','#faa61a','#eb459e','#9b59b6','#e67e22','#1abc9c'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

export default function Comments() {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setComments(data || []);
        setLoading(false);
      });
  }, [open]);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) { setError('Fill in both fields.'); return; }
    if (message.trim().length > 200) { setError('Keep it under 200 characters.'); return; }
    setError('');
    setSubmitting(true);
    const { data, error: err } = await supabase
      .from('comments')
      .insert({ name: name.trim(), message: message.trim() })
      .select()
      .single();
    setSubmitting(false);
    if (err) { setError('Something went wrong. Try again.'); return; }
    setComments(prev => [data, ...prev]);
    setMessage('');
    setShowForm(false);
  };

  return (
    <>
      {/* Chat icon button — top right */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed top-4 right-4 z-[80] w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/15 transition-all duration-200"
      >
        <i className="fa-regular fa-comment text-sm" />
        {comments.length > 0 && !open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
            {comments.length > 9 ? '9+' : comments.length}
          </span>
        )}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed top-16 right-4 z-[80] w-80 bg-black/70 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07]">
              <div className="flex items-center gap-2">
                <i className="fa-regular fa-comment text-white/50 text-sm" />
                <span className="text-sm font-semibold text-white">Comments</span>
                <span className="text-[10px] text-white/30 font-mono">{comments.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setShowForm(f => !f); setError(''); }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/80 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-all"
                >
                  <i className="fa-solid fa-plus text-[9px]" />
                  Leave a note
                </button>
                <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white transition-colors">
                  <i className="fa-solid fa-xmark text-sm" />
                </button>
              </div>
            </div>

            {/* Form */}
            <AnimatePresence>
              {showForm && (
                <motion.form
                  onSubmit={submit}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden border-b border-white/[0.07]"
                >
                  <div className="px-4 py-3 flex flex-col gap-2">
                    <input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your name"
                      maxLength={32}
                      className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-indigo-500/60 transition-colors"
                    />
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Say something..."
                      maxLength={200}
                      rows={2}
                      className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-indigo-500/60 transition-colors resize-none"
                    />
                    {error && <p className="text-red-400 text-[11px]">{error}</p>}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-white/20 font-mono">{message.length}/200</span>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white text-xs font-semibold transition-all"
                      >
                        {submitting ? 'Posting…' : 'Post'}
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Comment list */}
            <div ref={listRef} className="max-h-72 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
              {loading ? (
                <p className="text-center text-white/25 text-xs py-8">Loading…</p>
              ) : comments.length === 0 ? (
                <p className="text-center text-white/25 text-xs py-8">No comments yet. Be the first!</p>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="flex gap-3 px-4 py-3 border-b border-white/[0.05] last:border-0">
                    <div
                      className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold uppercase"
                      style={{ backgroundColor: avatarColor(c.name) }}
                    >
                      {c.name[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-semibold text-white truncate">{c.name}</span>
                        <span className="text-[10px] text-white/25 flex-shrink-0">{timeAgo(c.created_at)}</span>
                      </div>
                      <p className="text-xs text-white/55 leading-relaxed break-words">{c.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
