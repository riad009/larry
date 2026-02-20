// components/selector/utils/dataMappers.ts
import { LunchExperience } from "@/types/lunch";
import { VineyardExperience } from "@/types/vineyard";

export function mapLunch(doc: any): LunchExperience {
    return {
        id: doc.id ?? doc["Restaurant ID"] ?? doc._id?.toString?.() ?? "",
        name: doc.name ?? doc["Restaurants"],
        country: doc.country ?? doc["Country"],
        region: doc.region ?? doc["Region"],
        subRegion: doc.subRegion ?? doc["Sub Region"],
        commune: doc.commune ?? doc["Commune"],
        type: doc.type ?? doc["Type"],
        description: doc.description ?? doc["Short Description"],
        gkp: doc.gkp ?? doc["GKP"],
        open: doc.open ?? doc["Open"],
        rating: typeof doc.rating === "number" ? doc.rating : Number(doc["G"]) || undefined,
        latitude: typeof doc.latitude === "number" ? doc.latitude : Number(doc["Latitude"]) || undefined,
        longitude: typeof doc.longitude === "number" ? doc.longitude : Number(doc["Longitude"]) || undefined,
        lunchCost: typeof doc.lunchCost === "number" ? doc.lunchCost : Number(doc["Lunch Cost (€)"]) || undefined,
        bracket: doc.bracket ?? doc["Bracket"],
    };
}

export function mapVineyard(doc: any): VineyardExperience {
    return {
        id: doc.id ?? doc["Vineyard ID"] ?? doc._id?.toString?.() ?? "",
        name: doc.name ?? doc["Name"],
        country: doc.country ?? doc["Country"],
        region: doc.region ?? doc["Region"],
        subRegion: doc.subRegion ?? doc["Sub Region"],
        commune: doc.commune || doc["Commune"] || "N/A",
        type: doc.type ?? doc["Type"],
        description: doc.description ?? doc["Short Description"] ?? doc["Description"],
        gkp: doc.gkp ?? doc["GKP"],
        gkp2: doc.gkp ?? doc["GKP Link"],
        open: doc.open ?? doc["Open"],
        rating: typeof doc.rating === "number" ? doc.rating : Number(doc["Rating"]) || undefined,
        latitude: typeof doc.latitude === "number" ? doc.latitude : Number(doc["Latitude"]) || undefined,
        longitude: typeof doc.longitude === "number" ? doc.longitude : Number(doc["Longitude"]) || undefined,
        booking: doc.booking ?? doc["Booking"],
    };
}