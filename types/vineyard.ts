
export interface VineyardExperience {
    id: string;
    name: string;
    country: string;
    region: string;
    subRegion: string;
    commune: string;
    type: string;
    gkp?: string;
    gkp2?: string;  // Google Maps link
    rating: number;            // star rating (e.g., 4.8)
    ratingUsers?: number;       // number of users
    score?: number;             // vineyard-wide score (e.g., 90)
    latitude: number;
    longitude: number;
    instagram?: string;
    saturday?: string;
    sunday?: string;
    lowestCost?: number;
    highestCost?: number;
    dominantGrape?: string;
    imageUrl?: string;
    highlights?: string[];      // Reason 1–5
    mongoId?: string;
    description?: string; // Add this for the error from before

    open?: string;        // Add this to fix the current error
    booking?: string;

    /** Experience columns from LIST (DB: "Tasting Only", "Tour & Tasting", etc.) */
    experienceTypes?: Record<string, boolean>;
}

/** Vineyard filter state: pending (UI) vs active (used for results after GO). */
export interface VineyardFilters {
    selectedArea: string;
    selectedType: string;
    selectedCostBucket: string;
    selectedExperienceType: string;
    searchText: string;
}


export interface VineyardOffer {
    id: string;
    vineyardId: string;
    title: string;
    type: string;
    price: number;
    duration: number;
    link?: string;
}


