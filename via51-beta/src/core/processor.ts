import { createClient } from '@supabase/supabase-js';
import { logEvent } from '../layers/lib/audit-logger';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL || '',
    import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

export class GammaProcessor {
    public static async process(event: any) {
        try {
            await logEvent(event, 'SUCCESS');
        } catch (error: any) {
            console.error(error.message);
        }
    }
}