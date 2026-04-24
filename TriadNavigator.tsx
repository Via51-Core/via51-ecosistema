export const TriadNavigator = () => {
    const nodes = [
        { id: 'ALFA', desc: 'Core / Governance', url: 'https://via51.org', active: true },
        { id: 'BETA', desc: 'The Hub / Community', url: 'https://hub.via51.org', active: false },
        { id: 'GAMMA', desc: 'Laboratory / Dev', url: 'https://gamma.via51.org', active: false },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-5xl">
            {nodes.map((node) => (
                <motion.a
                    key={node.id}
                    href={node.url}
                    whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.5)' }}
                    className="p-6 border border-v51-gold/10 bg-v51-void/50 backdrop-blur-md rounded-sm transition-colors group"
                >
                    <h3 className="text-v51-gold font-mono text-xl mb-2">{node.id}</h3>
                    <p className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors uppercase tracking-widest">
                        {node.desc}
                    </p>
                    {!node.active && (
                        <span className="text-[9px] text-v51-copper mt-4 block">ENCRIPTANDO...</span>
                    )}
                </motion.a>
            ))}
        </div>
    );
};