/* app/api/vineyards/route.ts */

import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";
import { VineyardExperience } from "@/types/vineyard";
import { ObjectId } from "mongodb";

const EXPERIENCE_COLUMNS = [
    "Tasting Only", "Tour & Tasting", "Pairing & Lunch", "Lunch", "Vine Experience",
    "Masterclass / Workshop", "Wine Stay", "Cooking", "Urban", "By Appt", "Walk In"
];

/**
 * Transforms database documents into the UI format.
 * Uses '||' for critical strings to ensure empty strings from DB fall back to the correct key.
 */
function mapVineyard(doc: any): VineyardExperience {
    const experienceTypes: Record<string, boolean> = {};
    for (const key of EXPERIENCE_COLUMNS) {
        const val = doc[key];
        experienceTypes[key] = val === true || (typeof val === "string" && val.trim() !== "") || (typeof val === "number" && val !== 0);
    }
    const rawLowest = doc.lowestCost ?? doc["Lowest Cost (€)"];
    const lowestCost = rawLowest != null && rawLowest !== "" ? Number(rawLowest) : undefined;
    return {
        id: (doc.id ?? doc["Vineyard ID"] ?? doc._id?.toString() ?? "").toString(),
        name: doc.name || doc["Vineyard"] || "Unknown Vineyard",
        country: doc.country || doc["Country"] || "France",
        region: doc.region || doc["Region"] || "",
        subRegion: doc["Sub Region"] || doc.subRegion || "",
        commune: doc.commune || doc["Commune"] || "",
        type: doc["Type"] || doc.type || "",
        gkp: doc.gkp ?? doc["GKP"] ?? "",
        gkp2: doc.gkp2 ?? doc["GKP Link"] ?? "",
        rating: Number(doc.rating ?? doc["G"]) || 0,
        ratingUsers: Number(doc.ratingUsers ?? doc["G Users"]) || 0,
        score: Number(doc.score ?? doc["Rating"]) || 0,
        latitude: Number(doc.latitude ?? doc["Latitude"]) || 0,
        longitude: Number(doc.longitude ?? doc["Longitude"]) || 0,
        instagram: doc.instagram ?? doc["Instagram"] ?? "",
        saturday: doc.saturday ?? doc["Saturday"] ?? "",
        sunday: doc.sunday ?? doc["Sunday"] ?? "",
        lowestCost,
        highestCost: Number(doc.highestCost ?? doc["Highest Cost (€)"]) || 0,
        dominantGrape: doc.dominantGrape || doc["Dominant Grape"] || "",
        imageUrl: doc.imageUrl ?? "/images/vineyard-placeholder2.jpg",
        highlights: [
            doc["Reason 1"], doc["Reason 2"], doc["Reason 3"], doc["Reason 4"], doc["Reason 5"]
        ].filter((h): h is string => typeof h === "string" && h.trim().length > 0),
        mongoId: doc._id?.toString() ?? "",
        experienceTypes
    };
}

// --- GET ALL (Optimized with Projection) ---
export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("smartRoute");

        const docs = await db.collection("vineyards")
            .find({})
            .project({
                "Vineyard": 1,
                "Vineyard ID": 1,
                "Country": 1,
                "Region": 1,
                "Sub Region": 1,
                "Commune": 1, // <--- CRITICAL: This was missing
                "Type": 1,
                "G": 1,
                "G Users": 1,
                "Rating": 1,
                "GKP": 1,
                "GKP Link": 1,
                "Lowest Cost (€)": 1,
                "Highest Cost (€)": 1,
                "imageUrl": 1,
                "Reason 1": 1, "Reason 2": 1, "Reason 3": 1, "Reason 4": 1, "Reason 5": 1,
                "Latitude": 1, "Longitude": 1, "Instagram": 1, "Saturday": 1, "Sunday": 1,
                "Dominant Grape": 1,
                "Tasting Only": 1, "Tour & Tasting": 1, "Pairing & Lunch": 1, "Lunch": 1, "Vine Experience": 1,
                "Masterclass / Workshop": 1, "Wine Stay": 1, "Cooking": 1, "Urban": 1, "By Appt": 1, "Walk In": 1
            })
            .toArray();

        const mapped = docs.map(mapVineyard);
        return NextResponse.json(mapped);
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

// --- CREATE NEW ---
export async function POST(req: Request) {
    try {
        const client = await clientPromise;
        const db = client.db("smartRoute");
        const data = await req.json();

        const newDoc = {
            "Vineyard ID": data.id,
            "Vineyard": data.name,
            "Country": data.country || "France",
            "Region": data.region,
            "Sub Region": data.subRegion,
            "Commune": data.commune,
            "Latitude": Number(data.latitude) || 0,
            "Longitude": Number(data.longitude) || 0,
            "Instagram": data.instagram,
            "Saturday": data.saturday,
            "Sunday": data.sunday,
            "Dominant Grape": data.dominantGrape,
            "Lowest Cost (€)": Number(data.lowestCost) || 0,
            "Highest Cost (€)": Number(data.highestCost) || 0,
            "Reason 1": data.reason1 || "",
            "Reason 2": data.reason2 || "",
            "Reason 3": data.reason3 || "",
            "Reason 4": data.reason4 || "",
            "Reason 5": data.reason5 || "",
        };

        const result = await db.collection("vineyards").insertOne(newDoc);
        return NextResponse.json({ success: true, id: result.insertedId });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}

// --- UPDATE EXISTING ---
export async function PUT(req: Request) {
    try {
        const client = await clientPromise;
        const db = client.db("smartRoute");
        const body = await req.json();

        if (!body.mongoId) return NextResponse.json({ error: "Missing mongoId" }, { status: 400 });

        const updatedDoc = {
            "Vineyard ID": body.id,
            "Vineyard": body.name,
            "Region": body.region,
            "Sub Region": body.subRegion,
            "Commune": body.commune,
            "Latitude": Number(body.latitude) || 0,
            "Longitude": Number(body.longitude) || 0,
            "Instagram": body.instagram,
            "Saturday": body.saturday,
            "Sunday": body.sunday,
            "Dominant Grape": body.dominantGrape,
            "Lowest Cost (€)": Number(body.lowestCost) || 0,
            "Highest Cost (€)": Number(body.highestCost) || 0,
            "Reason 1": body.reason1 || "",
            "Reason 2": body.reason2 || "",
            "Reason 3": body.reason3 || "",
            "Reason 4": body.reason4 || "",
            "Reason 5": body.reason5 || "",
        };

        await db.collection("vineyards").updateOne(
            { _id: new ObjectId(body.mongoId) },
            { $set: updatedDoc }
        );

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// --- DELETE ---
export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "No ID provided" }, { status: 400 });

        const client = await clientPromise;
        const db = client.db("smartRoute");
        await db.collection("vineyards").deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}