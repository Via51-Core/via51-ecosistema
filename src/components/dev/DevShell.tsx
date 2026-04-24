import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const DevShell = () => {
    const [logs, setLogs] = useState<any[]>([]);
    const [command, setCommand] = useState('');

    // Escucha activa de eventos de desarrollo (dev_sys_events)
    useEffect(() => {
        const sub = supabase
            .channel('dev_logs')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'dev_sys_events' },
                p => setLogs(prev => [p.new, ...prev]))
            .subscribe();
        return () => { supabase.removeChannel(sub); };
    }, []);

    const executeCommand = async (e: React.FormEvent) => {
        e.preventDefault();
        // Inyección de evento utilitario
        await supabase.from('dev_sys_events').insert([
            { event_type: 'CMD_EXEC', description: command, created_by: 'RENZO_8' }
        ]);
        setCommand('');
    };

    return (
        <div className="bg-[#050505] min-h-screen p-4 font-mono text-[12px] text-green-500 border-t-2 border-v51-gold">
            <div className="flex justify-between border-b border-green-900 pb-2 mb-4">
                <span>VIA51_ANTIGRAVITY // DEV_MODE // ALFA_NODE</span>
                <span className="animate-pulse">● SYSTEM_LIVE</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Monitor de Bunker */}
                <div className="border border-green-900 p-4 bg-black/50">
                    <h2 className="text-v51-gold mb-2 underline">BUNKER_STATUS (sys_registry)</h2>
                    <RegistryList />
                </div>

                {/* Consola de Logs */}
                <div className="border border-green-900 p-4 h-[400px] overflow-y-auto flex flex-col-reverse">
                    {logs.map((log, i) => (
                        <div key={i} className="mb-1 border-l border-green-800 pl-2">
                            <span className="text-gray-500">[{new Date(log.created_at).toLocaleTimeString()}]</span>{' '}
                            <span className="text-v51-copper">{log.event_type}:</span> {log.description}
                        </div>
                    ))}
                </div>
            </div>

            {/* Input de Comando Vinculante */}
            <form onSubmit={executeCommand} className="mt-4 flex gap-2">
                <span className="text-v51-gold">{'>'}</span>
                <input
                    className="bg-transparent border-none outline-none w-full text-green-400"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    placeholder="Ingrese comando de estructuración..."
                    autoFocus
                />
            </form>
        </div>
    );
};