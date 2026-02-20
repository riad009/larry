// components/overview/VineyardCard.tsx
import { Wine, MapPin, Star } from "lucide-react";
import { DestinationCard } from "./DestinationCard";
import { VineyardExperience } from "@/types/vineyard"; // Assuming this type exists

interface VineyardCardProps {
    vineyard: {
        name: string;
        rating?: number;
        commune?: string;
        subRegion?: string;
        type?: string;
    };
}

export function VineyardCard({ vineyard }: VineyardCardProps) {
    return (
        <DestinationCard
            type="vineyard"
            title={vineyard.name}
            icon={Wine}
            color="green"
            rating={vineyard.rating}
            location={vineyard.commune || vineyard.subRegion}
            tag={vineyard.type}
        />
    );
}