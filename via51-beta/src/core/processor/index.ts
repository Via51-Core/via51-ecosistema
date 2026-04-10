import { createClient } from '@supabase/supabase-js';
import { CorePayload } from '../../types/core';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL || '',
    import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

export class UniversalProcessor {

    public static async execute(payload: CorePayload): Promise<void> {
        const { sender, timestamp } = payload.metadata;

        try {
            const { data: permission } = await supabase
                .from('user_permissions')
                .select('*')
                .eq('id', sender)
                .single();

            if (!permission || permission.hierarchy_level > payload.data.requiredLevel) {
                throw new Error("INSUBORDINACIÓN: Nivel de jerarquía insuficiente.");
            }

            const { error: txError } = await supabase
                .from('domain_data')
                .upsert({
                    node_id: payload.data.nodeId,
                    payload: payload.data,
                    status: payload.data.nextStatus,
                    updated_at: new Date(timestamp).toISOString()
                });

            if (txError) throw txError;

            await this.logToSysEvents(payload, 'SUCCESS');

            await supabase.from('sys_payload_vault').insert({
                node_id: payload.data.nodeId,
                payload: payload.data,
                checksum: this.generateChecksum(payload.data),
                is_active: true
            });

        } catch (error: any) {
            await this.logToSysEvents(payload, 'FAILURE');
            console.error(`[PROCESSOR-ERROR] ${error.message}`);
            throw error;
        }
    }

    private static async logToSysEvents(payload: CorePayload, status: string) {
        await supabase.from('sys_events').insert({
            actor_id: payload.metadata.sender,
            action_type: payload.action,
            payload_snapshot: payload.data,
            status: status,
            node_id: payload.data.nodeId
        });
    }

    private static generateChecksum(data: any): string {
        const str = JSON.stringify(data);
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
            return String.fromCharCode(parseInt(p1, 16));
        })).substring(0, 16);
    }
}