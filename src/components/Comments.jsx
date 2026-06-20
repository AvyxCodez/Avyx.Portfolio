import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

const formatDate = (ts) => {
  const d = new Date(ts);
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
};

const avatarColor = (name) => {
  const colors = ['#5865F2','#ed4245','#3ba55d','#faa61a','#eb459e','#9b59b6','#e67e22','#1abc9c'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

export default function Comments() {
  const [open, setOpen]         = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName]         = useState('');
  const [message, setMessage]   = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]       = useState('');

  useEffect(() => {
    if (!open || !supabase) return;
    setLoading(true);
    supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })
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

  return (
    <>
      {/* Trigger button — top right */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed top-4 right-4 z-[80] w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/15 transition-all duration-200"
      >
        <i className="fa-regular fa-comment text-sm" />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            />

            {/* Modal card */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="fixed inset-0 z-[91] flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="pointer-events-auto w-full max-w-lg bg-[#111111] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-5 pt-5 pb-4">
                  <div className="flex items-center gap-2">
                    <i className="fa-regular fa-comment text-indigo-400 text-base" />
                    <span className="text-base font-semibold text-white">Comments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setShowForm(f => !f); setError(''); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold transition-all"
                    >
                      <i className="fa-solid fa-plus text-[9px]" />
                      New Comment
                    </button>
                    <button onClick={() => setOpen(false)} className="w-7 h-7 flex items-center justify-center text-white/30 hover:text-white transition-colors rounded-lg hover:bg-white/10">
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
                      className="overflow-hidden border-t border-white/[0.06]"
                    >
                      <div className="px-5 py-4 flex flex-col gap-2.5">
                        <input
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="Your name"
                          maxLength={32}
                          className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-indigo-500/50 transition-colors"
                        />
                        <textarea
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                          placeholder="Say something..."
                          maxLength={200}
                          rows={3}
                          className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-indigo-500/50 transition-colors resize-none"
                        />
                        {error && <p className="text-red-400 text-xs">{error}</p>}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-white/20 font-mono">{message.length}/200</span>
                          <button
                            type="submit"
                            disabled={submitting}
                            className="px-4 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white text-xs font-semibold transition-all"
                          >
                            {submitting ? 'Posting…' : 'Post'}
                          </button>
                        </div>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Comment list */}
                <div className="border-t border-white/[0.06] max-h-96 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                  {loading ? (
                    <p className="text-center text-white/25 text-xs py-10">Loading…</p>
                  ) : comments.length === 0 ? (
                    <p className="text-center text-white/25 text-xs py-10">No comments yet — be the first!</p>
                  ) : (
                    comments.map((c) => (
                      <div key={c.id} className="flex gap-3.5 px-5 py-4 border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02] transition-colors">
                        {/* Avatar */}
                        <div
                          className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-sm font-bold uppercase"
                          style={{ backgroundColor: avatarColor(c.name) }}
                        >
                          {c.name[0]}
                        </div>
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-sm font-semibold text-white truncate">{c.name}</span>
                            <span className="text-[11px] text-white/30 flex-shrink-0">{formatDate(c.created_at)}</span>
                          </div>
                          <div className="flex items-end justify-between gap-2">
                            <p className="text-sm text-white/55 leading-relaxed break-words flex-1">{c.message}</p>
                            <div className="flex items-center gap-1 text-white/25 flex-shrink-0">
                              <i className="fa-regular fa-heart text-xs text-red-400/60" />
                              <span className="text-[11px]">0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
