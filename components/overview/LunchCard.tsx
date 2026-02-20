// components/overview/LunchCard.tsx
import { Utensils, Clock } from "lucide-react";
import { DestinationCard } from "./DestinationCard";
import { LunchExperience } from "@/types/lunch"; // Assuming this type exists

interface LunchCardProps {
    lunch: {
        restaurantName?: string;
        name?: string;
        lunchCost?: string | number;
        open?: string;
        type?: string;
    };
}

export function LunchCard({ lunch }: LunchCardProps) {
    return (
        <DestinationCard
            type="lunch"
            title={lunch.restaurantName || lunch.name || ""}
            icon={Utensils}
            color="blue"
            cost={lunch.lunchCost ? `€${lunch.lunchCost}` : "€ -"}
            hours={lunch.open || "Check hours"}
            tag={lunch.type}
        />
    );
}