import { motion } from 'framer-motion';

export const HeroSingularity = () => {
    return (
        <div className="relative flex items-center justify-center h-64 w-64">
            {/* Anillos Fractales */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute border border-v51-gold/30 rounded-full"
                    initial={{ width: 100, height: 100, opacity: 0 }}
                    animate={{
                        width: [100, 300, 100],
                        height: [100, 300, 100],
                        opacity: [0.1, 0.5, 0.1],
                        rotate: i * 120
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        delay: i * 2,
                        ease: "easeInOut"
                    }}
                />
            ))}
            <motion.div
                className="z-10 text-6xl font-bold tracking-tighter text-white"
                animate={{ scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                VIA51
            </motion.div>
        </div>
    );
};