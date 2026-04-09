import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import { Terminal, Activity } from 'lucide-react';

const App = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await supabase.from('sys_events').select('*').order('timestamp', { ascending: false }).limit(10);
      if (data) setLogs(data);
    };
    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-black text-emerald-500 font-mono p-10">
      <h1 className="text-lg font-bold border-b border-emerald-900 pb-4 mb-6 flex items-center gap-3">
        <Terminal size={18} /> VIA51 GAMMA // INTELLIGENCE
      </h1>
      <div className="space-y-2">
        {logs.map(log => (
          <div key={log.id} className="text-[10px] opacity-80 hover:opacity-100">
            <span className="text-emerald-800">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
            <span className="ml-3 uppercase">{log.action_type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;