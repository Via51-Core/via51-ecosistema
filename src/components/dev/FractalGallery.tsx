import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { MediaEngine } from '@/drivers/MediaEngine';

export const FractalGallery = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    const { data, error } = await supabase
      .from('sys_contributions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setAssets(data);
    setLoading(false);
  };

  return (
    <div className="p-6 bg-v51-black min-h-screen text-white">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-v51-gold font-mono text-2xl tracking-tighter">GALLERY_COMMAND_CENTER</h2>
          <p className="text-[10px] text-v51-copper uppercase tracking-[0.3em]">Bunker: via51-assets / Node: BETA</p>
        </div>
        <div className="text-right font-mono text-[10px] text-gray-500">
          TOTAL_ASSETS: {assets.length}
        </div>
      </header>

      {/* Grid Fractal de Activos */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <AnimatePresence>
          {assets.map((asset) => (
            <motion.div
              key={asset.id}
              layoutId={asset.id}
              onClick={() => setSelected(asset)}
              whileHover={{ scale: 1.05, borderColor: 'rgba(212, 175, 55, 0.5)' }}
              className="aspect-square border border-v51-gold/10 bg-v51-void cursor-pointer overflow-hidden relative group"
            >
              <img 
                src={MediaEngine.optimizeAsset(asset.asset_url)} 
                className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/80 translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-[8px] font-mono truncate">{asset.metadata.name}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal de Inspección de Alta Gama */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-10 bg-black/90 backdrop-blur-xl">
          <motion.div 
            layoutId={selected.id}
            className="bg-v51-void border border-v51-gold/30 p-1 max-w-5xl w-full relative"
          >
            <button 
              onClick={() => setSelected(null)}
              className="absolute -top-10 right-0 text-v51-gold font-mono hover:text-white"
            >
              [ CLOSE_SIGNAL ]
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
              <div className="md:col-span-2">
                <img src={MediaEngine.optimizeAsset(selected.asset_url)} className="w-full h-auto shadow-2xl" />
              </div>
              <div className="space-y-4 font-mono">
                <h3 className="text-v51-gold text-sm underline">METADATA_DECRYPTED</h3>
                <div className="text-[10px] space-y-2 text-gray-400">
                  <p><span className="text-v51-copper">ID:</span> {selected.id}</p>
                  <p><span className="text-v51-copper">CONTRIBUTOR:</span> {selected.contributor_id}</p>
                  <p><span className="text-v51-copper">TYPE:</span> {selected.metadata.type}</p>
                  <p><span className="text-v51-copper">SIZE:</span> {(selected.metadata.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button className="w-full py-2 border border-v51-gold/20 hover:bg-v51-gold/10 text-[10px] text-v51-gold transition-all">
                  VINCULAR A CARTA MAGNA
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
