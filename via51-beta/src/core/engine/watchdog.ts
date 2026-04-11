// via51-beta/src/core/engine/watchdog.ts

const THRESHOLD_MINUTES = 10;
const DEPARTMENTS = [1, 2, 3]; // Política, Social, Producción

export class SovereigntyWatchdog {
    public static async checkHealth() {
        for (const deptId of DEPARTMENTS) {
            const lastActivity = await Database.getLastEventTimestamp(deptId);
            const diffMinutes = (Date.now() - lastActivity) / 1000 / 60;

            if (diffMinutes >= THRESHOLD_MINUTES) {
                this.triggerCriticalAlert(deptId);
            }
        }
    }

    private static triggerCriticalAlert(deptId: number) {
        const deptName = ['POLÍTICA', 'SOCIAL', 'PRODUCCIÓN'][deptId - 1];

        // DRIVER DE SALIDA DE EMERGENCIA
        EmergencyDriver.dispatch({
            type: 'SOVEREIGNTY_AT_RISK',
            priority: 'CRITICAL',
            target: 'FREDY_BAZALAR_TERMINAL',
            message: `ALERTA CRÍTICA: El pilar [${deptName}] ha dejado de reportar por más de 10 min.`
        });
    }
}