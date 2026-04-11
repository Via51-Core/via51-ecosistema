// via51-beta/src/core/drivers/output.driver.ts

export interface StandardOutput {
    status: 'SUCCESS' | 'FAILURE';
    transmissionId: string; // ID único de trazabilidad
    data: any;             // Respuesta procesada
    actions: string[];     // Lista de disparadores (ej: ["SEND_EMAIL", "UPDATE_MAP"])
}