import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '10vh' }}>
        <h1 style={{ fontSize: '10px', letterSpacing: '1.2em', color: '#D4AF37', fontWeight: 900, marginBottom: '20px' }}>VIA51 HOLDING</h1>
        <div style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '0.3em' }}>SISTEMA ANTIGRAVITY</div>
      </header>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        <Link to="/articles/20260501001" style={{ 
          textDecoration: 'none', color: 'white', border: '1px solid rgba(212,175,55,0.3)', 
          padding: '20px 40px', fontSize: '12px', fontWeight: 900, letterSpacing: '0.5em',
          transition: 'all 0.5s ease'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#D4AF37'; e.currentTarget.style.color = 'black'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white'; }}
        >
          PRODUCCION SOBERANA (2026.05.01)
        </Link>
      </nav>

      <footer style={{ position: 'fixed', bottom: '5vh', fontSize: '9px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.5em' }}>
        ESTADO: OPERATIVO | BUNKER V51
      </footer>
    </div>
  );
};

export default IndexPage;