// via51-beta/src/core/engine/blackBox.ts

import { Validator, Processor, Orchestrator } from './modules';

export class Via51BlackBox {
    public static async execute(input: StandardInput): Promise<StandardOutput> {

        // 1. VALIDADOR: ¿Es estructuralmente correcto y tiene permisos?
        const isValid = await Validator.check(input);
        if (!isValid) throw new Error("CRITICAL_ERROR: Violación de Integridad");

        // 2. PROCESADOR: Transición de estados y reglas de negocio genéricas
        const processedData = await Processor.run(input.action, input.payload);

        // 3. ORQUESTADOR: Prepara la salida y registra en sys_events (Trazabilidad)
        return Orchestrator.dispatch(processedData, input.origin);
    }
}