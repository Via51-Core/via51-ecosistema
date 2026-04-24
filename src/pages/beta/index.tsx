import { useState } from 'react';
import { BetaSidebar } from '@/components/layout/BetaSidebar';
import { FractalGallery } from '@/components/dev/FractalGallery';
import { GovernanceEditor } from '@/components/dev/GovernanceEditor';
import { FractalAdvisor } from '@/components/dev/FractalAdvisor';
import { EventStream } from '@/components/data/EventStream';

export default function BetaHub() {
  const [activeTab, setActiveTab] = useState('GALLERY');

  return (
    <div className="flex min-h-screen bg-v51-black overflow-hidden">
      <BetaSidebar />
      <main className="flex-1 flex flex-col relative">
        <header className="h-16 border-b border-v51-gold/5 flex items-center px-8 justify-between bg-v51-void/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <span className="text-v51-gold font-mono text-[10px] tracking-widest">OPERATOR: RENZO_8</span>
            <div className="h-4 w-[1px] bg-v51-gold/20" />
            <div className="flex gap-4">
              <button onClick={() => setActiveTab('GALLERY')} className={`text-[10px] font-mono ${activeTab === 'GALLERY' ? 'text-v51-gold underline' : 'text-gray-500'}`}>ASSET_MANAGER</button>
              <button onClick={() => setActiveTab('GOVERNANCE')} className={`text-[10px] font-mono ${activeTab === 'GOVERNANCE' ? 'text-v51-gold underline' : 'text-gray-500'}`}>GOVERNANCE_CORE</button>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'GALLERY' ? <FractalGallery /> : <GovernanceEditor />}
          </div>
          <div className="lg:col-span-1">
            <FractalAdvisor />
          </div>
        </section>

        <footer className="h-10 border-t border-v51-gold/5 bg-v51-void px-8 flex items-center">
          <EventStream />
        </footer>
      </main>
    </div>
  );
}
