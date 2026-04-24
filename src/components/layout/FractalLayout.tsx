import { motion } from 'framer-motion';
import { QuantumNavigator } from '@/components/navigation/QuantumNavigator';
import { BindingNotification } from '@/components/data/BindingNotification';
import { HierarchyAura } from '@/components/visuals/HierarchyAura';

export const FractalLayout = ({ children, nodeType }: { children: React.ReactNode, nodeType: string }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative font-antigravity">
      {/* Capas de Jerarquía y Control */}
      <HierarchyAura />
      <QuantumNavigator />
      <BindingNotification />

      {/* Capa de Fondo Dinámica */}
      <div className={`absolute inset-0 opacity-20 pointer-events-none z-0 ${
        nodeType === 'ALFA' ? 'bg-[radial-gradient(circle_at_center,#D4AF37_0%,transparent_70%)]' :
        nodeType === 'BETA' ? 'bg-[radial-gradient(circle_at_center,#B87333_0%,transparent_70%)]' :
        'bg-[radial-gradient(circle_at_center,#ffffff_0%,transparent_70%)]'
      }`} />

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10"
      >
        {children}
      </motion.main>
    </div>
  );
};
