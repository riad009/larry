// src/types/transport.ts

/**
 * Represents a transport option for the trip.
 * Used in TransportPage and OverviewPage.
 */
export interface TransportOption {
    /** Unique numeric ID */
    id: number;

    /** Type of transport (e.g., Train, Car, Bus) */
    type: string;

    /** Provider name (e.g., TGV Express, Avis, FlixBus) */
    provider: string;

    /** Price range in euros (string for display, e.g., "€30–€50") */
    priceRange: string;

    /** Duration of travel (string, e.g., "2 hr 39 min") */
    duration: string;

    /** Distance in kilometers */
    distance: number;
    description?: string;
}
