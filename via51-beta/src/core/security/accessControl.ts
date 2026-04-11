// via51-beta/src/core/security/accessControl.ts

export class AccessValidator {

    /**
     * Verifica si el usuario tiene autoridad para acceder a la ubicación de un nodo
     * @param userRole Rango según Carta Magna
     * @param targetDepth Nivel del nodo (0-3)
     */
    static canAccessLocation(userRole: string, targetDepth: number): boolean {
        // Regla Inviolable: Nivel 2 (GAMMA) accede a todo.
        if (userRole === 'SUPER_OWNER') return true;

        // Los Supervisores (Nivel 1) no pueden ver datos de Inteligencia Digital (GAMMA)
        if (userRole === 'SUPER_COLLABORATOR' && targetDepth < 2) return true;

        return false;
    }
}