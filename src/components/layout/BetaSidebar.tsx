import { motion } from 'framer-motion';

export const BetaSidebar = () => {
  const levels = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  return (
    <div className="w-20 h-screen border-r border-v51-gold/10 flex flex-col items-center py-8 bg-v51-void">
      <div className="mb-12">
        <div className="w-8 h-8 border border-v51-gold rotate-45 flex items-center justify-center">
          <span className="rotate-[-45deg] text-[10px] font-bold text-v51-gold">V51</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        {levels.map((lvl) => (
          <motion.div
            key={lvl}
            whileHover={{ scale: 1.2, color: '#D4AF37' }}
            className={`cursor-pointer text-xs font-mono ${lvl === 8 ? 'text-v51-gold' : 'text-gray-600'}`}
          >
            {lvl === 8 && <span className="absolute -left-2 text-[8px]">▶</span>}
            0{lvl}
          </motion.div>
        ))}
      </div>
      <div className="mt-auto text-[8px] text-v51-copper font-mono vertical-text py-4">
        BETA_NODE_ACTIVE
      </div>
    </div>
  );
};
