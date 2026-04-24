import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

export const FractalUploader = () => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('READY_FOR_INJECTION');

    const uploadAsset = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            setStatus('ANALYZING_FRACTAL_DATA...');

            if (!event.target.files || event.target.files.length === 0) return;
            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
            const filePath = `high-res/${fileName}`;

            // 1. Subida al Storage del Bunker
            const { error: uploadError, data } = await supabase.storage
                .from('via51-assets')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) throw uploadError;

            // 2. Registro Vinculante en sys_contributions
            setStatus('REGISTERING_IN_BUNKER...');
            await supabase.from('sys_contributions').insert([{
                contributor_id: 'RENZO_8',
                asset_url: data.path,
                metadata: { size: file.size, type: file.type, name: file.name },
                status: 'ACTIVE'
            }]);

            // 3. Registro de Evento de Sistema
            await supabase.from('dev_sys_events').insert([{
                event_type: 'ASSET_INJECTED',
                description: `New High-Res asset: ${file.name} (ID: ${fileName})`,
                created_by: 'RENZO_8'
            }]);

            setStatus('INJECTION_COMPLETE_100%');
        } catch (error: any) {
            setStatus(`ERROR: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="mt-8 border-2 border-dashed border-v51-gold/20 p-8 bg-v51-void/50 text-center group hover:border-v51-gold/50 transition-all">
            <input
                type="file"
                id="fractal-upload"
                className="hidden"
                onChange={uploadAsset}
                disabled={uploading}
            />
            <label htmlFor="fractal-upload" className="cursor-pointer">
                <motion.div
                    animate={uploading ? { opacity: [0.5, 1, 0.5] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                >
                    <p className="text-v51-gold font-mono text-xs tracking-widest mb-2">
                        {status}
                    </p>
                    <p className="text-gray-500 text-[10px] uppercase">
                        Arrastra o selecciona activos de Calidad Mundial (AVIF, WEBP, MP4)
                    </p>
                </motion.div>
            </label>

            {uploading && (
                <div className="mt-4 w-full bg-v51-gold/5 h-[1px] relative">
                    <motion.div
                        className="absolute top-0 left-0 bg-v51-gold h-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2 }}
                    />
                </div>
            )}
        </div>
    );
};