export default function TransportTiles() {
    const options = [
        { name: "Trains", link: "#" },
        { name: "Private Drivers", link: "#" },
        { name: "Shared Tours", link: "#" },
        { name: "Full Concierge", link: "#" },
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {options.map((o) => (
                <div
                    key={o.name}
                    className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition"
                >
                    <h3 className="text-lg font-semibold text-green-700">{o.name}</h3>
                    <a href={o.link} className="text-sm text-blue-600 hover:underline">
                        View
                    </a>
                </div>
            ))}
        </div>
    );
}
