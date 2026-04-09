import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Terminal, Activity, ShieldCheck } from 'lucide-react';

export const CommandCenter = () => {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const { data } = await supabase.from('sys_events').select('*').order('timestamp', { ascending: false }).limit(20);
            if (data) setEvents(data);
        };
        fetchEvents();

        // Escucha en tiempo real de lo que pasa en el Holding
        const channel = supabase.channel('realtime-logs')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sys_events' }, payload => {
                setEvents(prev => [payload.new, ...prev]);
            }).subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    return (
        <div className="min-h-screen bg-black text-green-500 font-mono p-10">
            <header className="border-b border-green-900/50 pb-6 mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold tracking-tighter uppercase">Via51 Gamma Intelligence</h1>
                    <p className="text-[10px] text-green-800 uppercase">Supervisión Soberana de Eventos</p>
                </div>
                <ShieldCheck className="text-green-500 animate-pulse" size={24} />
            </header>

            <div className="space-y-2">
                {events.map(ev => (
                    <div key={ev.id} className="text-[11px] border-l-2 border-green-900 pl-4 py-1 hover:bg-green-900/10 transition-colors">
                        <span className="text-green-800">[{new Date(ev.timestamp).toLocaleTimeString()}]</span>
                        <span className="mx-3 font-bold">ACTION: {ev.action_type}</span>
                        <span className="text-green-700">NODE: {ev.node_id}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};