import { supabase } from '@/lib/supabase';

export const MediaEngine = {
    // Configuración de Buckets en el Bunker
    BUCKET: 'via51-assets',

    async loadHighRes(assetPath: string, priority: 'HIGH' | 'LOW' = 'LOW') {
        const startTime = performance.now();

        // Generar URL firmada o pública desde Supabase Storage
        const { data } = supabase.storage
            .from(this.BUCKET)
            .getPublicUrl(assetPath);

        return new Promise((resolve, reject) => {
            const media = new Image(); // O Video según extensión
            media.src = data.publicUrl;

            media.onload = async () => {
                const duration = performance.now() - startTime;

                // REGISTRO VINCULANTE: Reportar métricas de carga al Bunker
                await supabase.from('dev_sys_events').insert([{
                    event_type: 'MEDIA_LOAD_SUCCESS',
                    description: `Asset: ${assetPath} | Latency: ${duration.toFixed(2)}ms`,
                    created_by: 'ANTIGRAVITY_ENGINE'
                }]);

                resolve(data.publicUrl);
            };

            media.onerror = () => reject(`Error en carga de: ${assetPath}`);
        });
    },

    // Carga Fractal: Divide el asset en capas (Blur -> LowRes -> HighRes)
    getFractalSource(assetName: string) {
        return {
            placeholder: `/assets/placeholders/${assetName}-blur.webp`,
            main: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/via51-assets/${assetName}.webp`
        };
    }
};