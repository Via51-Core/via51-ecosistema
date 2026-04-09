import React from 'react';

export const NodeEngine = ({ status }: { status: string }) => {
  return (
    <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
        <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">
          Hub Status: {status}
        </span>
      </div>
    </div>
  );
};