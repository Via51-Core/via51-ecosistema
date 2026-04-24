import { useState } from 'react';
import { MediaEngine } from '@/drivers/MediaEngine';

export const AssetStressTest = () => {
    const [status, setStatus] = useState('IDLE');
    const [preview, setPreview] = useState<string | null>(null);

    const runTest = async () => {
        setStatus('LOADING_FRACTAL_ASSETS...');
        try {
            // Prueba con un asset de alta carga (ej. el Shader de la Triada)
            const url = await MediaEngine.loadHighRes('visuals/triada-core-8k.webp', 'HIGH') as string;
            setPreview(url);
            setStatus('SUCCESS: 100% RENDERED');
        } catch (err) {
            setStatus('ERROR: SIGNAL_LOST');
        }
    };

    return (
        <div className="mt-6 border border-v51-gold/20 p-4 bg-v51-void">
            <h3 className="text-v51-gold font-mono mb-4 text-[10px]">MEDIA_STRESS_TEST</h3>
            <div className="flex gap-4 items-center">
                <button
                    onClick={runTest}
                    className="bg-v51-gold/10 hover:bg-v51-gold/30 border border-v51-gold px-4 py-2 text-[10px] transition-all"
                >
                    EJECUTAR SECUENCIA DE CARGA
                </button>
                <span className="font-mono text-[10px] text-v51-copper">{status}</span>
            </div>

            {preview && (
                <div className="mt-4 relative h-32 w-full overflow-hidden border border-white/5">
                    <img src={preview} alt="Test" className="object-cover w-full h-full opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                </div>
            )}
        </div>
    );
};