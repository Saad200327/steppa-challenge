import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../../hooks/useSocket';

export default function LiveFeed() {
  const [events, setEvents] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    const handler = data => setEvents(e => [data, ...e].slice(0, 20));
    socket.on('steps:update', handler);
    socket.on('challenge:settled', handler);
    return () => { socket.off('steps:update', handler); socket.off('challenge:settled', handler); };
  }, [socket]);

  return (
    <div className="bg-steppa-surface border border-steppa-border rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-steppa-border">
        <span className="font-display font-bold text-white text-sm">Live Feed</span>
      </div>
      <div className="max-h-60 overflow-y-auto">
        <AnimatePresence>
          {events.length === 0 && <div className="p-4 text-steppa-muted text-xs text-center">Waiting for activity...</div>}
          {events.map((e, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="px-4 py-2 text-xs border-b border-steppa-border last:border-0">
              <span className="text-steppa-green font-mono">@{e.username}</span>
              <span className="text-steppa-muted mx-1">{e.message || 'updated steps'}</span>
              {e.steps && <span className="text-white font-mono">{e.steps.toLocaleString()} steps</span>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
