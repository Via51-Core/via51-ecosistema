import { FractalLayout } from '@/components/layout/FractalLayout';
import { HeroSingularity } from '@/components/visuals/HeroSingularity';
import { TriadNavigator } from '@/components/navigation/TriadNavigator';
import { EventStream } from '@/components/data/EventStream';

export default function AlfaLanding() {
    return (
        <FractalLayout nodeType="ALFA">
            <section className="relative z-20 flex flex-col items-center justify-center min-h-[70vh]">
                {/* El Corazón de la Triada */}
                <HeroSingularity />

                <div className="mt-12 text-center max-w-2xl">
                    <h2 className="text-v51-gold font-light tracking-[0.3em] text-sm mb-4">
                        ANTIGRAVITY PROTOCOL ACTIVE
                    </h2>
                    <p className="text-gray-400 font-light leading-relaxed">
                        Sincronizando la voluntad humana con la precisión fractal.
                        Bienvenido a la infraestructura de la nueva era.
                    </p>
                </div>

                {/* Navegación de la Triada Fractal */}
                <TriadNavigator />
            </section>

            {/* El Pulso: Eventos en tiempo real desde el Bunker */}
            <footer className="mt-24 border-t border-v51-gold/10 pt-8">
                <EventStream />
            </footer>
        </FractalLayout>
    );
}