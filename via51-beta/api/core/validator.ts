export class CoreValidator {
    public static validate(input: any): boolean {
        // Validacion minimalista para asegurar la sinapsis en Laboratorio
        const hasDna = input && input.v51_dna && input.v51_dna.node;
        const hasPayload = input && input.payload && input.payload.dni;
        return !!(hasDna && hasPayload);
    }
}
