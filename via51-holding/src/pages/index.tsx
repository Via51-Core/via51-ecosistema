import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
interface ReaderStat { region: string; total_readers: number; }
export default function HoldingDashboard() {
  const [stats, setStats] = useState<ReaderStat[]>([]);
  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await supabase.from('view_readers_summary').select('*');
      if (data) setStats(data as ReaderStat[]);
    };
    fetchStats();
  }, []);
  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '60px' }}>
      <h1 style={{ color: '#D4AF37', fontSize: '12px' }}>VIA51 HOLDING</h1>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {stats.map((s, i) => (
          <div key={i}>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{s.total_readers}</span>
            <p style={{ fontSize: '10px' }}>{s.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
}