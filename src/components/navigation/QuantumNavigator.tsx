import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

export const QuantumNavigator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLeaping, setIsLeaping] = useState(false);
  const router = useRouter();

  const nodes = [
    { id: 'ALFA', path: '/', label: 'CORE_REALITY', color: '#D4AF37' },
    { id: 'BETA', path: '/beta', label: 'OPERATIONAL_HUB', color: '#B87333' },
    { id: 'GAMMA', path: '/gamma', label: 'LAB_EXPERIMENTAL', color: '#FFFFFF' }
  ];

  const handleLeap = (path: string) => {
    setIsLeaping(true);
    setIsOpen(false);
    setTimeout(() => {
      router.push(path);
      setTimeout(() => setIsLeaping(false), 1000);
    }, 800);
  };

  return (
    <>
      {/* Botón de Acceso al Portal */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]">
        <motion.button
          whileHover={{ scale: 1.1, letterSpacing: '0.5em' }}
          onClick={() => setIsOpen(!isOpen)}
          className="px-6 py-2 border border-v51-gold/30 bg-black/50 backdrop-blur-xl text-[10px] text-v51-gold font-mono tracking-[0.3em] uppercase transition-all"
        >
          {isOpen ? '[ CLOSE_PORTAL ]' : '[ NODE_JUMP ]'}
        </motion.button>
      </div>

      {/* Menú del Portal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[90] bg-black/60 flex items-center justify-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
              {nodes.map((node) => (
                <motion.div
                  key={node.id}
                  whileHover={{ y: -10 }}
                  onClick={() => handleLeap(node.path)}
                  className="group cursor-pointer p-8 border border-white/5 bg-v51-void/80 hover:border-v51-gold/50 transition-all text-center w-64"
                >
                  <h3 className="text-4xl font-bold text-white/20 group-hover:text-v51-gold transition-colors mb-4">{node.id}</h3>
                  <p className="text-[9px] font-mono text-v51-copper tracking-widest">{node.label}</p>
                  <div className="mt-6 h-[1px] w-0 group-hover:w-full bg-v51-gold transition-all duration-500 mx-auto" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Efecto Visual: Salto Cuántico */}
      <AnimatePresence>
        {isLeaping && (
          <motion.div 
            initial={{ scale: 0, opacity: 0, borderRadius: '100%' }}
            animate={{ scale: 4, opacity: 1, borderRadius: '0%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] bg-v51-gold flex items-center justify-center"
          >
             <div className="text-black font-mono text-2xl font-bold tracking-[1em] animate-pulse">
               LEAPING...
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
