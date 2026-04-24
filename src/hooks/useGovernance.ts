import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useGovernance = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchGovernance = async () => {
    const { data } = await supabase
      .from('sys_registry')
      .select('value')
      .eq('key', 'carta_magna_2_0')
      .single();
    if (data) setContent(data.value.text);
    setLoading(false);
  };

  useEffect(() => {
    fetchGovernance();

    // SUSCRIPCIÓN VINCULANTE EN TIEMPO REAL
    const channel = supabase
      .channel('governance_sync')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'sys_registry', filter: 'key=eq.carta_magna_2_0' },
        (payload) => {
          setContent(payload.new.value.text);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return { content, loading };
};
