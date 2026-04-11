// via51-beta/src/core/drivers/messaging.driver.ts

export interface SovereignMessage {
    id: string;
    sender_level: 0 | 1 | 2 | 3;
    recipient_id: string; // ID de nodo o "ALL"
    payload: { subject: string; body: string; priority: 'NORMAL' | 'COMMAND'; };
    audit_hash: string;   // Firma para asegurar que el mensaje no fue alterado
}

// El CORE procesa el mensaje, lo valida contra RLS y lo entrega.