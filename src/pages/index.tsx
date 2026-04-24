import { FractalLayout } from '@/components/layout/FractalLayout';
import { HeroSingularity } from '@/components/visuals/HeroSingularity';
import { KineticGovernance } from '@/components/visuals/KineticGovernance';
import { TriadNavigator } from '@/components/navigation/TriadNavigator';
import { EventStream } from '@/components/data/EventStream';

export default function AlfaLanding() {
  return (
    <FractalLayout nodeType="ALFA">
      <section className="relative z-20 flex flex-col items-center justify-center min-h-screen">
        <HeroSingularity />
        
        {/* El Reflejo de la Gobernanza (Sincronizado con BETA) */}
        <KineticGovernance />

        <TriadNavigator />
      </section>

      <footer className="mt-24 border-t border-v51-gold/10 pt-8">
        <EventStream />
      </footer>
    </FractalLayout>
  );
}
