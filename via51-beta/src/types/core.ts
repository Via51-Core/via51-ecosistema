export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

export interface CorePayload {
    action: string;
    domain?: string;
    metadata: {
        sender: string;
        timestamp: string;
    };
    data: {
        nodeId: string;
        requiredLevel: number;
        nextStatus: string;
        [key: string]: any;
    };
}