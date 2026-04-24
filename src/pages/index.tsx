import { FractalLayout } from '@/components/layout/FractalLayout';
import { HeroSingularity } from '@/components/visuals/HeroSingularity';
import { KineticGovernance } from '@/components/visuals/KineticGovernance';
import { useUIConfig } from '@/hooks/useUIConfig';

export default function AlfaLanding() {
  const ui = useUIConfig('ALFA');

  return (
    <FractalLayout nodeType="ALFA">
      <section className={`flex flex-col ${ui.alignment} justify-center min-h-screen ${ui.padding}`} style={{ color: ui.primaryColor }}>
        
        {/* Imagen/Hero con visibilidad dinámica */}
        <div className={`${ui.showMobileImage ? 'block' : 'hidden md:block'}`}>
          <HeroSingularity />
        </div>
        
        <div className={`mt-12 transition-all duration-1000 ${ui.textSize}`}>
          <KineticGovernance />
        </div>

      </section>
    </FractalLayout>
  );
}
