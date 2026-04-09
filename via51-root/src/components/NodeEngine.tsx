import React from 'react';

export const NodeEngine = ({ nodeData }: { nodeData: any }) => {
    return (
        <div className="p-6 rounded-xl bg-slate-900 border border-blue-500/30">
            <h2 className="text-white font-bold text-xl uppercase tracking-tighter">
                {nodeData?.node_name || "Nodo en Espera"}
            </h2>
            <p className="text-slate-500 text-xs mt-2 font-mono">
                PATH: {nodeData?.node_path || "root.void"}
            </p>
        </div>
    );
};