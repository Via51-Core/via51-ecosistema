import { GeoLocationPayload, LocationState } from '../entities/location.entity';

export class LocationEngine {

    // VALIDADOR
    public static validate(payload: GeoLocationPayload): boolean {
        const isLatValid = payload.latitude >= -90 && payload.latitude <= 90;
        const isLngValid = payload.longitude >= -180 && payload.longitude <= 180;
        return isLatValid && isLngValid;
    }

    // PROCESADOR (Transición de Estados)
    public static processTransition(current: LocationState, event: string): LocationState {
        const stateMap: Record<string, LocationState> = {
            'movement_detected': 'TRACKING',
            'stop_detected': 'STATIONARY',
            'perimeter_breach': 'GEOFENCE_ALERT'
        };
        return stateMap[event] || current;
    }

    // ORQUESTADOR (Salida a Canales)
    public static orchestrate(result: any): void {
        // Registro inmutable en sys_events
        console.log(`[AUDIT] Location Event Logged: ${JSON.stringify(result)}`);
        // Distribución a Alfa o Gamma según jerarquía
    }
}