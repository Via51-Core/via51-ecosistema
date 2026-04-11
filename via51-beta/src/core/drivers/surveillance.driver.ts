// via51-beta/src/core/drivers/surveillance.driver.ts

export interface DailySurveillanceReport {
    date: string;
    totalTelemetries: number;
    activeNodes: number;         // Cuántos de los 43 nodos reportaron
    loadDistribution: {
        level0: number; // Alfa
        level1: number; // Departamentos (3)
        level2: number; // Triadas (9)
        level3: number; // Derivaciones (27)
    };
    securityAlerts: number;      // Intentos de acceso denegados por RLS
}