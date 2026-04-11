// via51-alfa/src/components/sensors/GeoCapture.ts

interface CaptureResponse {
    status: 'SUCCESS' | 'ERROR';
    data?: any;
    message: string;
}

export const captureFredyLocation = async (): Promise<CaptureResponse> => {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve({ status: 'ERROR', message: 'Geolocalización no soportada en este dispositivo.' });
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const payload = {
                    entityId: 'V51-OWNER-FREDY', // ID Vitalicio según Carta Magna
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: new Date().toISOString()
                };

                // ENVIAR AL HUB (BETA)
                console.log("Enviando coordenadas al Motor Universal...");
                resolve({ status: 'SUCCESS', data: payload, message: 'Ubicación capturada correctamente.' });
            },
            (error) => {
                resolve({ status: 'ERROR', message: `Error de hardware: ${error.message}` });
            },
            { enableHighAccuracy: true }
        );
    });
};