import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const useHierarchy = () => {
  const [level, setLevel] = useState(0);
  const [identity, setIdentity] = useState(null);

  useEffect(() => {
    // En producción, esto vendría de la sesión de Auth
    // Por ahora, simulamos la detección del Operador Renzo (8)
    const syncHierarchy = async () => {
      const { data } = await supabase
        .from('sys_registry')
        .select('value')
        .eq('key', 'active_operator_8')
        .single();
      
      if (data) {
        setLevel(8);
        setIdentity({ name: 'RENZO', rank: 'ARCHITECT' });
      }
    };
    syncHierarchy();
  }, []);

  return { level, identity };
};
