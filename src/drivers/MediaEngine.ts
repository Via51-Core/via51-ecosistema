// drivers/MediaEngine.ts
export const MediaEngine = {
    optimizeAsset: (url: string) => {
        // Lógica para servir WebP/AVIF dinámicamente desde el Bunker
        return `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/assets/${url}?auto=format&quality=85`;
    },

    preloadFractal: async (assets: string[]) => {
        const promises = assets.map(src => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = reject;
            });
        });
        return Promise.all(promises);
    }
};