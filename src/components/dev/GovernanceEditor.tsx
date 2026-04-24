import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

export const GovernanceEditor = () => {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('READ_ONLY');

  useEffect(() => {
    loadCartaMagna();
  }, []);

  const loadCartaMagna = async () => {
    const { data } = await supabase
      .from('sys_registry')
      .select('value')
      .eq('key', 'carta_magna_2_0')
      .single();
    if (data) setContent(data.value.text);
  };

  const commitChanges = async () => {
    setSaving(true);
    setStatus('COMMITTING_TO_BUNKER...');
    
    // 1. Actualizar Registro
    const { error } = await supabase
      .from('sys_registry')
      .update({ value: { text: content }, updated_at: new Date() })
      .eq('key', 'carta_magna_2_0');

    // 2. Registrar Evento Vinculante
    await supabase.from('sys_events').insert([{
      event_type: 'GOVERNANCE_UPDATE',
      description: 'Carta Magna 2.0 has been re-written by Hierarchy 8',
      created_by: 'RENZO_8'
    }]);

    if (!error) {
      setStatus('VINCULANTE_SUCCESS');
      setTimeout(() => setStatus('READ_ONLY'), 3000);
    }
    setSaving(false);
  };

  return (
    <div className="p-8 border border-v51-gold/10 bg-v51-void/30 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-v51-gold font-mono text-xs tracking-[0.4em]">CARTA_MAGNA_2.0_EDITOR</h3>
        <span className={`text-[9px] font-mono ${status.includes('SUCCESS') ? 'text-green-500' : 'text-v51-copper'}`}>
          [{status}]
        </span>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-96 bg-black/50 border border-v51-gold/5 p-6 font-mono text-xs text-gray-300 leading-relaxed focus:border-v51-gold/30 outline-none transition-all custom-scrollbar"
        placeholder="Escriba los nuevos nudos del Khipu digital..."
      />

      <div className="mt-6 flex justify-end gap-4">
        <button 
          onClick={loadCartaMagna}
          className="px-4 py-2 text-[10px] font-mono text-gray-500 hover:text-white transition-colors"
        >
          [ REVERT_TO_BUNKER ]
        </button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={commitChanges}
          disabled={saving}
          className="px-8 py-2 bg-v51-gold/10 border border-v51-gold text-v51-gold font-mono text-[10px] hover:bg-v51-gold hover:text-black transition-all"
        >
          {saving ? 'EXECUTING...' : 'COMMIT_VINCULANTE'}
        </motion.button>
      </div>
    </div>
  );
};
