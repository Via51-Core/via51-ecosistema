// via51-beta/src/core/drivers/input.driver.ts

export interface StandardInput {
    origin: string;        // ID del Nodo (Nivel 0-3)
    domain: string;        // Evento, Empresa, Persona (Agnóstico para el Core)
    action: string;        // CREATE, UPDATE, NOTIFY, TRACK
    payload: any;          // Datos crudos
    auth: {                // Token de nivel de acceso
        uid: string;
        role: 'SUPER_OWNER' | 'SUPER_COLLABORATOR' | 'COLLABORATOR';
    };
}