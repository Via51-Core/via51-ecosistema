import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export const BindingNotification = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const channel = supabase
      .channel('binding_echo')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'sys_events' }, 
        (payload) => {
          triggerNotification(payload.new);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const triggerNotification = (event) => {
    setNotification(event);
    // Auto-ocultar después de 6 segundos
    setTimeout(() => setNotification(null), 6000);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[300] pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: 100, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            className="w-80 p-4 bg-v51-void/80 backdrop-blur-2xl border-l-2 border-v51-gold shadow-[0_0_30px_rgba(212,175,55,0.1)] pointer-events-auto"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-v51-gold animate-pulse" />
              <span className="text-[10px] font-mono text-v51-gold tracking-[0.3em] uppercase">
                {notification.event_type}
              </span>
            </div>
            <p className="text-[11px] text-gray-300 font-light leading-relaxed mb-3">
              {notification.description}
            </p>
            <div className="flex justify-between items-center border-t border-white/5 pt-2">
              <span className="text-[8px] font-mono text-v51-copper uppercase">
                Origin: {notification.created_by}
              </span>
              <span className="text-[8px] font-mono text-gray-600">
                {new Date(notification.created_at).toLocaleTimeString()}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
