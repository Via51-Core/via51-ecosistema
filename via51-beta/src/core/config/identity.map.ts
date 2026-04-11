// via51-beta/src/core/config/identity.map.ts

export interface FractalIdentity {
    organizationName: string; // Ej: "Vía51", "Empresa X", "Gobierno Y"
    branding: {
        primaryColor: string;
        logoUrl: string;
    };
    taxonomy: {
        level1: [string, string, string];      // Ej: ["Política", "Social", "Producción"]
        level2: string;                        // Ej: "Triadas" o "Regiones"
        level3: string;                        // Ej: "Células" o "Puntos de Venta"
    };
}