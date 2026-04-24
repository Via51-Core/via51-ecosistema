import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const VisualStyler = () => {
  const [config, setConfig] = useState({
    heroTextSize: 'text-6xl',
    heroColor: '#D4AF37',
    heroAlign: 'items-center',
    showMobileImage: true
  });

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    const { data } = await supabase.from('sys_registry').select('value').eq('key', 'alfa_ui_config').single();
    if (data) setConfig(data.value);
  };

  const updateConfig = async (newConfig) => {
    setConfig(newConfig);
    await supabase.from('sys_registry').update({ value: newConfig }).eq('key', 'alfa_ui_config');
    await supabase.from('sys_events').insert([{ event_type: 'UI_RECONFIGURED', description: 'Visual styles updated via HUB', created_by: 'RENZO_8' }]);
  };

  return (
    <div className="p-6 bg-v51-void/50 border border-v51-gold/10 font-mono">
      <h3 className="text-v51-gold text-xs tracking-widest mb-6 underline">VISUAL_CONFIGURATOR_BETA</h3>
      
      <div className="space-y-6">
        {/* Tamaño de Texto */}
        <div>
          <label className="text-[10px] text-gray-500 block mb-2">HERO_TEXT_SIZE</label>
          <select 
            value={config.heroTextSize} 
            onChange={(e) => updateConfig({...config, heroTextSize: e.target.value})}
            className="bg-black border border-v51-gold/20 text-v51-gold text-xs p-2 w-full"
          >
            <option value="text-4xl">SMALL</option>
            <option value="text-6xl">NORMAL</option>
            <option value="text-8xl">MASSIVE (8K)</option>
          </select>
        </div>

        {/* Color Principal */}
        <div>
          <label className="text-[10px] text-gray-500 block mb-2">PRIMARY_COLOR (HEX)</label>
          <input 
            type="color" 
            value={config.heroColor}
            onChange={(e) => updateConfig({...config, heroColor: e.target.value})}
            className="w-full h-10 bg-transparent border border-v51-gold/20 cursor-pointer"
          />
        </div>

        {/* Ubicación Relativa */}
        <div>
          <label className="text-[10px] text-gray-500 block mb-2">RELATIVE_ALIGNMENT</label>
          <div className="flex gap-2">
            {['items-start', 'items-center', 'items-end'].map(align => (
              <button 
                key={align}
                onClick={() => updateConfig({...config, heroAlign: align})}
                className={`flex-1 py-2 text-[8px] border ${config.heroAlign === align ? 'bg-v51-gold text-black' : 'border-v51-gold/20 text-v51-gold'}`}
              >
                {align.split('-')[1].toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Visibilidad Móvil */}
        <div className="flex justify-between items-center p-3 border border-v51-gold/5 bg-black/20">
          <span className="text-[10px] text-gray-400">SHOW_VERTICAL_IMAGE_ON_MOBILE</span>
          <input 
            type="checkbox" 
            checked={config.showMobileImage}
            onChange={(e) => updateConfig({...config, showMobileImage: e.target.checked})}
            className="accent-v51-gold"
          />
        </div>
      </div>
    </div>
  );
};
