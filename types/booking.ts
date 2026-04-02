import { VineyardExperience } from "./vineyard";
import { LunchExperience } from "./lunch";

export interface Booking {
    _id?: string;
    userId: string;
    userName: string;
    userEmail: string;
    tripName: string;
    country: string;
    region: string;
    subRegion: string;
    vineyards: VineyardExperience[];
    lunches: LunchExperience[];
    transportOption?: string;
    status: "draft" | "confirmed" | "completed" | "cancelled";
    notes?: string;
    createdAt: string;
    updatedAt: string;
}
