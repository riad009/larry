// types/lunch.ts
export type LunchExperience = {
    id: string;
    restaurantName?: string; // Add this line with the '?'
    name?: string;
    country?: string;
    region?: string;
    subRegion?: string;
    commune?: string;
    type?: string;
    description?: string;
    gkp?: string;
    open?: string;
    rating?: number;
    latitude?: number;
    longitude?: number;
    lunchCost?: number;
    bracket?: string;
    mongoId?: string; // Add this line
};
