interface CompactSelectedCardProps {
    type: "vineyard" | "lunch";
    name: string;
    location: string;
    priceOrCost: string;
    ratingOrCuisine?: string;
}

export function CompactSelectedCard({
    type,
    name,
    location,
    priceOrCost,
    ratingOrCuisine,
}: CompactSelectedCardProps) {
    return (
        <div className="bg-white border border-black rounded-xl p-4 shadow-sm text-black">
            <p className="font-semibold text-base text-black mb-1">{name}</p>
            <p className="text-sm text-[#424242] mb-1">{location}</p>
            <p className="text-sm text-[#424242] mb-0">{priceOrCost}</p>
            {ratingOrCuisine != null && ratingOrCuisine !== "" && (
                <p className="text-sm text-[#424242] mt-1">{type === "vineyard" ? `Rating: ${ratingOrCuisine}` : `Cuisine: ${ratingOrCuisine}`}</p>
            )}
        </div>
    );
}
