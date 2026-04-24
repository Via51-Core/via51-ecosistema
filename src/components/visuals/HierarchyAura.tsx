import { motion } from 'framer-motion';
import { useHierarchy } from '@/hooks/useHierarchy';

export const HierarchyAura = () => {
  const { level } = useHierarchy();

  if (level < 8) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[400]">
      {/* Marco de Poder Astral */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 border-[1px] border-v51-gold/20 shadow-[inset_0_0_100px_rgba(212,175,55,0.05)]"
      />
      
      {/* Indicador de Rango en Esquina Superior Derecha */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-6 right-10 flex items-center gap-3"
      >
        <div className="flex flex-col items-end">
          <span className="text-[8px] font-mono text-v51-gold tracking-[0.4em] uppercase">Hierarchy_Detected</span>
          <span className="text-xs font-bold text-white tracking-widest">LEVEL_0{level}</span>
        </div>
        <div className="w-1 h-8 bg-v51-gold shadow-[0_0_10px_#D4AF37]" />
      </motion.div>

      {/* Partículas de Autoridad (Sutiles) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-v51-gold/50 to-transparent animate-pulse" />
    </div>
  );
};
