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
        <div className="bg-white/70 backdrop-blur-sm border border-wine-500 rounded-xl p-4 shadow-sm text-charcoal">
            <p className="font-semibold text-base text-charcoal mb-1">{name}</p>
            <p className="text-sm text-warm-gray mb-1">{location}</p>
            <p className="text-sm text-warm-gray mb-0">{priceOrCost}</p>
            {ratingOrCuisine != null && ratingOrCuisine !== "" && (
                <p className="text-sm text-warm-gray mt-1">{type === "vineyard" ? `Rating: ${ratingOrCuisine}` : `Cuisine: ${ratingOrCuisine}`}</p>
            )}
        </div>
    );
}
