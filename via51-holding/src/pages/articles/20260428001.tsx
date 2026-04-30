import { useState } from 'react';
interface LangContent { [key: string]: string; }
export default function Article_04_28() {
  const [lang, setLang] = useState<string>('ES');
  const titles: LangContent = { ES: "Título", QU: "Suti", EN: "Title" };
  return (
    <div style={{ background: '#000', color: '#fff', padding: '40px' }}>
      <h1>{titles[lang]}</h1>
      <button onClick={() => setLang('QU')}>QU</button>
    </div>
  );
}