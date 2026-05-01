import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const ArticlesIndex = () => {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase.from('sys_production').select('*');
      if (data) setArticles(data);
    };
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-20 font-sans">
      <h1 className="text-[#D4AF37] text-xs font-black tracking-[1em] mb-16">INDICE DE PRODUCCION</h1>
      <div className="flex flex-col gap-8">
        {articles.map((art: any) => (
          <Link key={art.id} to={`/articles/${art.issue_code?.replace(/\./g, '')}`} className="no-underline group">
            <div className="text-white text-3xl font-black group-hover:text-[#D4AF37] transition-all uppercase">
              {art.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticlesIndex;