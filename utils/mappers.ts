import { VineyardExperience, VineyardOffer } from "@/types/vineyard";

// export function mapVineyardDoc(doc: any): VineyardExperience {
//     return {
//         // id: (doc["Vineyard ID"] || doc.id || doc._id?.toString() || "").toString().trim(),
//         id: (doc["Vineyard ID"] || doc.id || doc._id?.$oid || doc._id?.toString() || "").toString().trim(),
//         name: doc["Vineyard"] || doc.name || "Unknown Vineyard",
//         country: doc["Country"] || doc.country || "",
//         region: doc["Region"] || doc.region || "",
//         subRegion: doc["Sub Region"] || doc.subRegion || "Unknown Sub-Region",
//         commune: doc["Commune"] || doc.commune || "",
//         type: doc["Type"] || doc.type || "Unknown Type",
//         gkp: doc["GKP"] || doc.gkp || "",
//         instagram: doc["Instagram"] || doc.instagram || "",
//         saturday: doc["Saturday"] || doc.saturday || "",
//         sunday: doc["Sunday"] || doc.sunday || "",
//         dominantGrape: doc["Dominant Grape"] || doc.dominantGrape || "",
//         imageUrl: doc.imageUrl || "/images/placeholders/vineyard-placeholder.jpg",
//
//         // Map "G" to rating (4.8) and "Rating" to score (90)
//         rating: Number(doc["G"]) || 0,
//         ratingUsers: Number(doc["G Users"]) || 0,
//         score: Number(doc["Rating"]) || 0,
//
//         latitude: Number(doc["Latitude"]) || 0,
//         longitude: Number(doc["Longitude"]) || 0,
//         lowestCost: Number(doc["Lowest Cost (€)"]) || 0,
//         highestCost: Number(doc["Highest Cost (€)"]) || 0,
//
//         // Highlights from Reason 1-5
//         highlights: [
//             doc["Reason 1"], doc["Reason 2"], doc["Reason 3"], doc["Reason 4"], doc["Reason 5"]
//         ].filter((h): h is string => typeof h === "string" && h.trim().length > 0),
//     };
// }



export function mapVineyardDoc(doc: any): VineyardExperience {
    // This function now receives the CLEAN data from your route.ts
    return {
        id: doc.id || "",
        name: doc.name || "Unknown Vineyard",
        country: doc.country || "",
        region: doc.region || "",
        subRegion: doc.subRegion || "",
        commune: doc.commune || "",
        type: doc.type || "",
        gkp: doc.gkp || "",
        gkp2: doc.gkp2 || "",
        instagram: doc.instagram || "",
        saturday: doc.saturday || "",
        sunday: doc.sunday || "",
        dominantGrape: doc.dominantGrape || "",
        imageUrl: doc.imageUrl || "/images/vineyard-placeholder2.jpg",

        // Use the clean keys already created in your route.ts
        rating: Number(doc.rating) || 0,
        ratingUsers: Number(doc.ratingUsers) || 0,
        score: Number(doc.score) || 0,
        latitude: Number(doc.latitude) || 0,
        longitude: Number(doc.longitude) || 0,
        lowestCost: Number(doc.lowestCost) || 0,
        highestCost: Number(doc.highestCost) || 0,

        // The route already turned Reason 1-5 into a "highlights" array
        highlights: Array.isArray(doc.highlights) ? doc.highlights : [],
        experienceTypes: doc.experienceTypes ?? undefined,
    };
}

export function mapVineyardOfferDoc(doc: any): VineyardOffer {
    return {
        id: (doc._id?.toString() || doc.id || "").toString(),
        vineyardId: (doc["Vineyard ID"] || doc.vineyardId || "").toString().trim(),
        title: doc["Offers"] || doc.title || "Tasting Experience",
        type: doc["Experience"] || doc.type || "General",
        price: Number(doc["Cost (€)"]) || Number(doc.price) || 0,
        duration: Number(doc["Duration (min)"]) || Number(doc.duration) || 0,
        link: doc["Platform Link"] || doc.link || "",
    };
}