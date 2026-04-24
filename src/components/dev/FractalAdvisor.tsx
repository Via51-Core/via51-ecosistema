import { motion, AnimatePresence } from 'framer-motion';
import { useFractalIntelligence } from '@/hooks/useFractalIntelligence';

export const FractalAdvisor = () => {
  const { insights, analyzing, refresh } = useFractalIntelligence();

  return (
    <div className="w-full bg-v51-void/50 border border-v51-gold/10 p-6 backdrop-blur-md">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${analyzing ? 'bg-v51-gold animate-ping' : 'bg-v51-gold'}`} />
          <h3 className="text-v51-gold font-mono text-[10px] tracking-[0.4em]">ANTIGRAVITY_INTELLIGENCE_FEED</h3>
        </div>
        <button onClick={refresh} className="text-[9px] text-v51-copper hover:text-white transition-colors font-mono">
          [ RE_SCAN_SYSTEM ]
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {insights.map((insight) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3 border-l border-v51-gold/30 bg-white/5 hover:bg-v51-gold/5 transition-all cursor-help group"
            >
              <div className="flex justify-between mb-1">
                <span className="text-[8px] font-mono text-v51-gold">{insight.type}</span>
                <span className="text-[8px] font-mono text-gray-600 group-hover:text-v51-copper">DECRYPTED</span>
              </div>
              <p className="text-[10px] text-gray-300 font-light leading-relaxed">
                {insight.message}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
