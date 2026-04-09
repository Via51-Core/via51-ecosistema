import React from 'react';

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center font-mono text-[#0047ff]">
            <div className="border border-[#0047ff]/30 p-10 rounded-2xl bg-blue-500/5 shadow-[0_0_50px_rgba(0,71,255,0.1)]">
                <h1 className="text-2xl font-black tracking-[0.3em] uppercase">Via51 Hub-Beta</h1>
                <p className="text-slate-500 text-xs mt-4 tracking-widest">MOTOR UNIVERSAL AGNÓSTICO // ACTIVO</p>
                <div className="mt-8 flex gap-2">
                    <div className="w-2 h-2 bg-[#0047ff] animate-ping"></div>
                    <span className="text-[10px] text-blue-400/50 uppercase font-bold">Procesando Tráfico Sincronizado</span>
                </div>
            </div>
        </div>
    );
};

export default App;