import { CorePayload, ValidationResult } from '../../types/core';

export class UniversalValidator {
    public static validate(payload: CorePayload): ValidationResult {
        const errors: string[] = [];

        if (!payload.action) errors.push("Falta acción");
        if (!payload.metadata?.sender) errors.push("Falta remitente");
        if (!payload.data?.nodeId) errors.push("Falta ID de nodo");

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}