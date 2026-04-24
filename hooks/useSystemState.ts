// hooks/useSystemState.ts
import { supabase } from '@/lib/supabase';

export const useSystemState = () => {
    const syncVisuals = async () => {
        const { data: registry } = await supabase
            .from('sys_registry')
            .select('*')
            .eq('key', 'ui_config');

        // Aplicar variables CSS dinámicas basadas en el registro
        if (registry) {
            document.documentElement.style.setProperty('--v51-glow-intensity', registry[0].value.glow);
        }
    };

    return { syncVisuals };
};