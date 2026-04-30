import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

// DEFINICIÓN DE ESTRUCTURA SOBERANA (Interfaces)
interface SectionContent {
  title: string; subtitle: string;
  s1: string; c1: string; s2: string; c2: string; s3: string; c3: string;
  mantra: string;
}

interface TrilingualContent {
  [key: string]: SectionContent;
}

export default function Article_05_01() {
  const [activeLang, setLang] = useState<string>('ES');
  const [sectionIndex, setSectionIndex] = useState(0);
  const [stats, setStats] = useState<any[]>([]);
  const issueCode = '2026.05.01.001';

  const langs = [ { id: 'ES', label: 'Español' }, { id: 'QU', label: 'Quechua' }, { id: 'EN', label: 'English' } ];

  const content: TrilingualContent = {
    ES: { 
      title: "Producción", subtitle: "Soberana",
      s1: "1. Homenaje a la Dignidad del Trabajo", c1: "Saludamos hoy el esfuerzo inalcanzable de los peruanos...",
      s2: "2. El Estándar Inka", c2: "El Estado Inka demostró que es posible alcanzar un bienestar de calidad mundial...",
      s3: "3. La Producción como Plano Natural", c3: "El primer nudo de nuestro khipu generacional es la transmutación...",
      mantra: "NO CELEBRAMOS LA SERVIDUMBRE, ACTIVAMOS LA CREACIÓN. EL BIENESTAR NO SE PIDE, SE PRODUCE." 
    },
    QU: { 
      title: "Qasikay", subtitle: "Llamkay",
      s1: "1. Llamkaypa sumaq kaynin", c1: "Perupa llamkaqninkunatam saludayku...",
      s2: "2. Tawantinsuyu", c2: "Inka kamachiyqa rikuchiwanchikmi allin kawsayqa atikuq kasqanta...",
      s3: "3. Llamkaypacha", c3: "Khipupa ñawpaq k'itunqa llamkay t'ikraymi...",
      mantra: "MANAM SIRVIQ KAYTACHU YUPAYCHANCHIK, KAWSAY PAQARICHIYTAM KACHARICHINCHIK."
    },
    EN: { 
      title: "Sovereign", subtitle: "Production",
      s1: "1. Homage to the Dignity of Labor", c1: "Today we salute the tireless effort...",
      s2: "2. The Inka Standard", c2: "The Inka State proved that world-class wellbeing is possible...",
      s3: "3. Production", c3: "The first knot of our generational khipu is the transmutation...",
      mantra: "WE DO NOT CELEBRATE SERVITUDE, WE ACTIVATE CREATION."
    }
  };

  useEffect(() => {
    const syncImpact = async () => {
      await supabase.from('sys_analytics_articles').insert([{ article_id: issueCode, region: 'LIMA' }]);
      const { data } = await supabase.from('view_readers_summary').select('*').eq('article_id', issueCode);
      if (data) setStats(data);
    };
    syncImpact();
  }, []);

  return (
    <div style={{ backgroundColor: '#050505', color: '#ffffff', minHeight: '100vh', padding: '40px' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative' }}>
        <header style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '70px', fontWeight: '900', textTransform: 'uppercase' }}>
            {content[activeLang].title} <br/> 
            <span style={{ color: '#D4AF37' }}>{content[activeLang].subtitle}</span>
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {langs.map(l => (
              <button key={l.id} onClick={() => setLang(l.id)} style={{ color: activeLang === l.id ? '#D4AF37' : '#555', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                {l.label}
              </button>
            ))}
          </div>
        </header>

        <main style={{ minHeight: '300px', textAlign: 'justify' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '900', textAlign: 'center', marginBottom: '30px' }}>
            {sectionIndex === 0 ? content[activeLang].s1 : sectionIndex === 1 ? content[activeLang].s2 : content[activeLang].s3}
          </h2>
          <p style={{ fontSize: '20px', lineHeight: '1.6', color: '#ccc' }}>
            {sectionIndex === 0 ? content[activeLang].c1 : sectionIndex === 1 ? content[activeLang].c2 : content[activeLang].c3}
          </p>
          
          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
             <button onClick={() => setSectionIndex(Math.max(0, sectionIndex - 1))} disabled={sectionIndex === 0}>ANTERIOR</button>
             <button onClick={() => setSectionIndex(Math.min(2, sectionIndex + 1))} disabled={sectionIndex === 2}>SIGUIENTE</button>
          </div>

          <section style={{ backgroundColor: '#D4AF37', color: '#000', padding: '40px', textAlign: 'center', marginTop: '60px' }}>
             <p style={{ fontWeight: '900' }}>{content[activeLang].mantra}</p>
          </section>
        </main>

        <footer style={{ borderTop: '1px solid #222', marginTop: '60px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
           <span>VIA51 ANTIGRAVITY</span>
           <div>VISITS: {stats.length > 0 ? stats[0].total_readers : 0}</div>
        </footer>
      </div>
    </div>
  );
}