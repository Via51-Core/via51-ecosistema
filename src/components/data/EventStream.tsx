import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const EventStream = () => {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        // Suscripción en tiempo real al Bunker
        const channel = supabase
            .channel('public:sys_events')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sys_events' },
                payload => setEvents(prev => [payload.new, ...prev].slice(0, 5)))
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    return (
        <div className="font-mono text-[10px] text-v51-gold/50 overflow-hidden h-12">
            <div className="animate-pulse flex gap-4 items-center">
                <span className="bg-v51-gold h-2 w-2 rounded-full" />
                <span>LIVE SYSTEM FEED:</span>
                {events.length > 0 ? (
                    <span>{events[0].event_type} - {events[0].description}</span>
                ) : (
                    <span>Awaiting signal from via51-fractal-engine...</span>
                )}
            </div>
        </div>
    );
};