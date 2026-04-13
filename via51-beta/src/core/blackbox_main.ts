/**
 * V51_DNA: { node: "CORE-BETA", type: "MECHANIC", seq: "M-07-DB" }
 * MECANICA 07: INTERFAZ DE LA CAJA NEGRA (THE BLACK BOX)
 */
import { CoreValidator, V51_Package } from "./validator";
import { CoreProcessor } from "./processor";
import { CoreOrchestrator } from "./orchestrator";
import { CoreHangar } from "./hangar";
import { CoreEventLog } from "./event_log";

export class Via51BlackBox {
    public static async handleSinapsis(pkg: V51_Package): Promise<any> {
        console.log(`[BLACKBOX] Pulso de ${pkg.v51_dna.node} [ENV: ${pkg.v51_dna.env || 'PROD'}]`);

        if (!CoreValidator.validate(pkg)) {
            return { status: "ERROR", msg: "SINAPSIS_RECHAZADA" };
        }

        const scenario = CoreHangar.loadScenario("ASUNTOS-PUBLICOS");
        if (!scenario) return { status: "ERROR", msg: "SCENARIO_MISSING" };

        const result = await CoreProcessor.process(pkg);

        // EXTRAER ENTORNO DEL DNA PARA EL SELLO
        const env = (pkg.v51_dna as any).env || "PROD";
        const tx_id = await CoreEventLog.seal(result, env);
        
        const dispatchPlan = CoreOrchestrator.orchestrate(result);

        return { ...result, tx_id, plan: dispatchPlan };
    }
}
