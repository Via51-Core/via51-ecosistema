import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export const DesignSystemEditor = ({ node }: { node: string }) => {
  const [config, setConfig] = useState({
    textSize: 'text-2xl',
    primaryColor: '#D4AF37',
    alignment: 'items-center',
    showMobileImage: true,
    padding: 'py-20'
  });

  const save = async (newConfig: any) => {
    setConfig(newConfig);
    await supabase.from('sys_registry').update({ value: newConfig }).eq('key', `ui_config_${node.toLowerCase()}`);
  };

  return (
    <div className="p-6 bg-v51-void border border-v51-gold/20 font-mono text-[10px]">
      <h3 className="text-v51-gold mb-6 tracking-widest uppercase">Visual_Engine_Controller: {node}</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-gray-500 mb-2">TEXT_SIZE</label>
          <select className="bg-black border border-white/10 text-white p-2 w-full" 
            onChange={(e) => save({...config, textSize: e.target.value})}>
            <option value="text-sm">Small</option>
            <option value="text-xl">Medium</option>
            <option value="text-4xl">Large</option>
            <option value="text-7xl">Colossal</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-500 mb-2">PRIMARY_COLOR</label>
          <input type="color" className="w-full h-8 bg-transparent" 
            onChange={(e) => save({...config, primaryColor: e.target.value})} />
        </div>

        <div>
          <label className="block text-gray-500 mb-2">MOBILE_IMAGE_VISIBILITY</label>
          <button className={`px-4 py-1 border ${config.showMobileImage ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}
            onClick={() => save({...config, showMobileImage: !config.showMobileImage})}>
            {config.showMobileImage ? 'VISIBLE' : 'HIDDEN'}
          </button>
        </div>
      </div>
    </div>
  );
};
