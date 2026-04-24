import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const useUIConfig = (node: string) => {
  const [config, setConfig] = useState({
    textSize: 'text-xl',
    primaryColor: '#D4AF37',
    alignment: 'items-center',
    showMobileImage: true,
    padding: 'py-20'
  });

  useEffect(() => {
    const fetchConfig = async () => {
      const { data } = await supabase
        .from('sys_registry')
        .select('value')
        .eq('key', `ui_config_${node.toLowerCase()}`)
        .single();
      if (data) setConfig(data.value);
    };
    fetchConfig();

    const sub = supabase.channel(`ui_${node}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'sys_registry' }, 
      payload => { if(payload.new.key === `ui_config_${node.toLowerCase()}`) setConfig(payload.new.value); })
      .subscribe();
    return () => { supabase.removeChannel(sub); };
  }, [node]);

  return config;
};
