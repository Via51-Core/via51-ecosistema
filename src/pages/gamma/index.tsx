import { FractalField } from '@/components/laboratory/FractalField';
import { motion } from 'framer-motion';
import { EventStream } from '@/components/data/EventStream';

export default function GammaLab() {
  return (
    <div className="relative min-h-screen bg-[#020202] text-white overflow-hidden font-mono">
      {/* Capa de Renderización Experimental */}
      <FractalField />

      {/* Interfaz de Usuario del Laboratorio */}
      <div className="relative z-10 p-10 flex flex-col h-screen">
        <header className="flex justify-between items-start border-b border-v51-gold/20 pb-6">
          <div>
            <h1 className="text-v51-gold text-2xl tracking-[0.5em] font-bold">GAMMA_NODE</h1>
            <p className="text-[10px] text-v51-copper mt-2">EXPERIMENTAL_LABORATORY // ANTIGRAVITY_PROTOTYPE</p>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-gray-500">SYSTEM_LOAD: 14%</div>
            <div className="text-[10px] text-green-500 animate-pulse">NEURAL_LINK: ACTIVE</div>
          </div>
        </header>

        <main className="flex-1 flex gap-10 mt-10">
          {/* Consola de Datos Crudos */}
          <div className="w-1/3 border border-v51-gold/10 bg-black/40 backdrop-blur-md p-6">
            <h3 className="text-v51-gold text-[10px] mb-4 underline">RAW_DATA_INJECTION</h3>
            <div className="space-y-2 text-[9px] text-gray-400">
              <p className="hover:text-v51-gold cursor-crosshair">{">"} Initializing WebGL Shaders...</p>
              <p className="hover:text-v51-gold cursor-crosshair">{">"} Mapping Fractal Coordinates...</p>
              <p className="hover:text-v51-gold cursor-crosshair">{">"} Testing Latency: 12ms</p>
              <p className="text-v51-copper">{">"} Warning: Gravity Anomaly Detected</p>
            </div>
          </div>

          {/* Área de Visualización de Prototipos */}
          <div className="flex-1 border border-v51-gold/10 bg-black/20 backdrop-blur-sm flex items-center justify-center relative group">
             <div className="absolute top-4 left-4 text-[8px] text-v51-gold/30">VIEWPORT_01</div>
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="w-48 h-48 border border-v51-gold/20 flex items-center justify-center"
             >
               <div className="w-32 h-32 border border-v51-gold/40 rotate-45" />
             </motion.div>
             <p className="absolute bottom-10 text-[10px] text-v51-gold opacity-0 group-hover:opacity-100 transition-opacity">
               PROTOTYPE_STABLE: READY FOR ALFA DEPLOYMENT
             </p>
          </div>
        </main>

        <footer className="mt-auto pt-6 border-t border-v51-gold/10">
          <EventStream />
        </footer>
      </div>
    </div>
  );
}
