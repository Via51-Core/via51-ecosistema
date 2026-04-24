const RegistryList = () => {
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        const fetchRegistry = async () => {
            const { data } = await supabase.from('sys_registry').select('*');
            if (data) setItems(data);
        };
        fetchRegistry();
    }, []);

    return (
        <div className="space-y-2">
            {items.map(item => (
                <div key={item.key} className="flex justify-between hover:bg-green-900/20 p-1">
                    <span className="text-gray-400">{item.key}</span>
                    <span className="text-white font-bold">{JSON.stringify(item.value)}</span>
                </div>
            ))}
        </div>
    );
};