import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const ArticlePage = () => {
  const [lang, setLang] = useState<'es' | 'qu' | 'en'>('es');
  const [step, setStep] = useState(1);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const sync = async () => {
      const { data: res } = await supabase.from('sys_production').select('content').eq('issue_code', '2026.05.01.001').single();
      if (res?.content) {
        const raw = res.content;
        setData(typeof raw === 'string' ? JSON.parse(raw) : raw);
      }
    };
    sync();
    window.scrollTo(0, 0);
  }, [step, lang]);

  if (!data) return <div style={{ backgroundColor: 'black', minHeight: '100vh' }} />;

  const content = data[lang];
  const currentTitle = content[`s${step}`];
  const currentBody = content[`c${step}`];

  const lateralBtn = (dir: 'prev' | 'next') => ({
    position: 'fixed' as const, top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none', color: '#D4AF37', fontSize: '4rem',
    cursor: 'pointer', padding: '20px', opacity: 0.2, transition: 'all 0.3s',
    [dir === 'prev' ? 'left' : 'right']: '2vw', zIndex: 100
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black', color: 'white', padding: '8vh 5vw', position: 'relative', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* CABECERA - DIMENSION RECUPERADA */}
      <header style={{ textAlign: 'center', marginBottom: '10vh' }}>
        <div style={{ fontSize: '12px', letterSpacing: '1em', color: '#D4AF37', fontWeight: 900, marginBottom: '15px' }}>
          {content.title.toUpperCase()}
        </div>
        <div style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', lineHeight: 1.2 }}>
          {content.subtitle}
        </div>
      </header>

      {/* NAVEGACION IDIOMA */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '12vh' }}>
        {['es', 'qu', 'en'].map(l => (
          <button key={l} onClick={() => setLang(l as any)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: lang === l ? '#D4AF37' : 'rgba(255,255,255,0.2)',
            fontSize: '10px', fontWeight: 900, letterSpacing: '0.5em',
            borderBottom: lang === l ? '2px solid #D4AF37' : '2px solid transparent',
            paddingBottom: '8px', transition: 'all 0.3s'
          }}>
            {l === 'es' ? 'ESPANOL' : l === 'qu' ? 'RUNASIMI' : 'ENGLISH'}
          </button>
        ))}
      </nav>

      {/* BOTONES LATERALES (FIJOS) */}
      {step > 1 && (
        <button onClick={() => setStep(s => s - 1)} style={lateralBtn('prev')} onMouseEnter={e => e.currentTarget.style.opacity='1'} onMouseLeave={e => e.currentTarget.style.opacity='0.2'}>‹</button>
      )}
      {step < 3 && (
        <button onClick={() => setStep(s => s + 1)} style={lateralBtn('next')} onMouseEnter={e => e.currentTarget.style.opacity='1'} onMouseLeave={e => e.currentTarget.style.opacity='0.2'}>›</button>
      )}

      {/* CONTENIDO PRINCIPAL - FLUJO LIBRE */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '10vh' }}>
        <div key={`${lang}-${step}`} style={{ animation: 'fadeIn 0.8s ease-out' }}>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '4rem', color: 'white', textTransform: 'uppercase', lineHeight: 1.2 }}>
            {currentTitle}
          </h2>
          
          <div style={{ borderLeft: '4px solid #D4AF37', paddingLeft: '4rem', marginBottom: '5rem' }}>
            <p style={{ fontSize: '1.8rem', lineHeight: 1.8, color: '#EEE', fontWeight: 300, whiteSpace: 'pre-line', margin: 0 }}>
              {currentBody}
            </p>
          </div>

          {/* MANTRA VINCULANTE - INTEGRADO AL FLUJO */}
          <footer style={{ paddingTop: '4rem', borderTop: '1px solid rgba(212,175,55,0.4)', textAlign: 'center' }}>
            <p style={{ color: '#D4AF37', fontSize: '1.3rem', fontWeight: 900, letterSpacing: '0.2em', lineHeight: 1.6, margin: '0 0 2rem 0', textTransform: 'uppercase' }}>
              {content.mantra}
            </p>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.6em' }}>
              PAGINA {step} / 3
            </div>
          </footer>
        </div>
      </main>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        body { margin: 0; background: black; overflow-y: auto; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
};

export default ArticlePage;