// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            colors: {
                v51: {
                    black: '#050505', // Bunker Black
                    gold: '#D4AF37',  // Astral Gold
                    copper: '#B87333', // Andean Copper
                    void: '#0A0A0C',
                    glow: 'rgba(212, 175, 55, 0.15)'
                }
            },
            backgroundImage: {
                'fractal-gradient': "radial-gradient(circle at center, #1a1a1a 0%, #050505 100%)",
                'khipu-pattern': "url('/assets/vectors/khipu-grid.svg')"
            },
            fontFamily: {
                'antigravity': ['Inter', 'Syncopate', 'sans-serif'],
            }
        }
    }
}