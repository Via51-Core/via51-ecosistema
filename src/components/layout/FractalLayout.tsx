import { motion, AnimatePresence } from 'framer-motion';
import { useSystemState } from '@/hooks/useSystemState'; // Vinculado a Supabase

export const FractalLayout = ({ children, nodeType }: { children: React.ReactNode, nodeType: 'ALFA' | 'BETA' | 'GAMMA' }) => {
    return (
        <div className="min-h-screen bg-v51-black text-white overflow-hidden relative">
            {/* Capa 0: Fondo Fractal Dinámico */}
            <div className="absolute inset-0 bg-fractal-gradient opacity-50 z-0" />

            {/* Capa 1: Grid de Khipu (Interacción Estética) */}
            <div className="absolute inset-0 bg-khipu-pattern opacity-10 pointer-events-none" />

            {/* Capa 2: Contenedor de Poder */}
            <motion.main
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 container mx-auto px-6 py-12"
            >
                <header className="flex justify-between items-center mb-16">
                    <div className="flex flex-col">
                        <span className="text-[10px] tracking-[0.5em] text-v51-gold uppercase">VIA51 Antigravity</span>
                        <h1 className="text-3xl font-bold tracking-tighter">{nodeType} NODE</h1>
                    </div>
                    <div className="h-[1px] w-32 bg-v51-gold/30" />
                    <div className="text-right">
                        <p className="text-[10px] text-v51-copper">ESTADO: VINCULANTE</p>
                        <p className="text-xs font-mono">SYS_EVENT: 0x4F2...{nodeType}</p>
                    </div>
                </header>

                {children}
            </motion.main>

            {/* Capa 3: Micro-Interacciones de Jerarquía */}
            <HierarchyIndicator />
        </div>
    );
};