import { TransportOption } from "@/types/transport";

export const TRANSPORT_OPTIONS: TransportOption[] = [
    {
        id: 1,
        type: "Train",
        provider: "TGV Express",
        priceRange: "€30–€50",
        duration: "2 hr 39 min",
        distance: 130,
    },
    {
        id: 2,
        type: "Car Rental",
        provider: "Avis",
        priceRange: "€60–€100",
        duration: "2 hr 20 min",
        distance: 130,
    },
    {
        id: 3,
        type: "Bus",
        provider: "FlixBus",
        priceRange: "€20–€40",
        duration: "3 hr 10 min",
        distance: 130,
    },
];
