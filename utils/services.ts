import {VineyardExperience, VineyardOffer} from "@/types/vineyard";

export function mapVineyardDoc(doc: any): VineyardExperience {
    const id = (doc["Vineyard ID"] ?? doc.id ?? doc._id?.toString?.() ?? "").toString().trim();

    return {
        id,
        name: doc["Vineyard"] ?? "",
        country: doc["Country"] ?? "",
        region: doc["Region"] ?? "",
        subRegion: doc["Sub Region"] ?? "",
        commune: doc["Commune"] ?? "",
        type: doc["Type"] ?? "",
        gkp: doc["GKP"] ?? "",
        rating: doc["G"] !== undefined ? Number(doc["G"]) : undefined as any,
        ratingUsers: doc["G Users"] !== undefined ? Number(doc["G Users"]) : undefined as any,
        score: doc["Rating"] !== undefined ? Number(doc["Rating"]) : undefined as any,
        latitude: doc["Latitude"] !== undefined ? Number(doc["Latitude"]) : undefined as any,
        longitude: doc["Longitude"] !== undefined ? Number(doc["Longitude"]) : undefined as any,
        instagram: doc["Instagram"] ?? "",
        saturday: doc["Saturday"] ?? "",
        sunday: doc["Sunday"] ?? "",
        lowestCost: doc["Lowest Cost (€)"] !== undefined ? Number(doc["Lowest Cost (€)"]) : undefined as any,
        highestCost: doc["Highest Cost (€)"] !== undefined ? Number(doc["Highest Cost (€)"]) : undefined as any,
        dominantGrape: doc["Dominant Grape"] ?? "",
        imageUrl: doc.imageUrl ?? "",
        highlights: [
            doc["Reason 1"],
            doc["Reason 2"],
            doc["Reason 3"],
            doc["Reason 4"],
            doc["Reason 5"],
        ].filter(Boolean),
    } as VineyardExperience;
}

export function mapVineyardOfferDoc(doc: any): VineyardOffer {
    return {
        id: (doc._id?.toString?.() ?? "").toString(),
        vineyardId: (doc["Vineyard ID"] ?? "").toString().trim(),
        title: doc["Offers"] ?? "",
        type: doc["Experience"] ?? "",
        price: doc["Cost (€)"] !== undefined ? Number(doc["Cost (€)"]) : undefined as any,
        duration: doc["Duration (min)"] !== undefined ? Number(doc["Duration (min)"]) : undefined as any,
        link: doc["Platform Link"] ?? "",
    };
}
