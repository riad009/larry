/* app/api/lunch/route.ts */
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import { LunchExperience } from "@/types/lunch";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function requireAdmin() {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string }).role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return null;
}

/**
 * Optimized Mapper: Uses || to handle cases where a field might be an empty string.
 */
function mapLunch(doc: any): LunchExperience {
    return {
        id: doc["Restaurant ID"] || doc.id || doc._id?.toString() || "",
        mongoId: doc._id?.toString() ?? "",
        name: doc["Restaurants"] || doc.name || "Unknown Restaurant",
        country: doc["Country"] || doc.country || "France",
        region: doc["Region"] || doc.region || "",
        subRegion: doc["Sub Region"] || doc.subRegion || "",
        commune: doc["Commune"] || doc.commune || "", // Reliable Commune mapping
        type: doc["Type"] || doc.type || "",
        description: doc["Short Description"] || doc.description || "",
        gkp: doc["GKP"] || doc.gkp || "",
        open: doc["Open"] || doc.open || "",
        rating: Number(doc["G"] ?? doc.rating) || 0,
        latitude: Number(doc["Latitude"] ?? doc.latitude) || 0,
        longitude: Number(doc["Longitude"] ?? doc.longitude) || 0,
        lunchCost: Number(doc["Lunch Cost (€)"] ?? doc.lunchCost) || 0,
        bracket: doc["Bracket"] || doc.bracket || "",
    };
}

// --- GET ALL (Optimized with Projection) ---
export async function GET() {
    // No admin check — all authenticated users can read restaurants
    try {
        const client = await clientPromise;
        const db = client.db("smartRoute");

        // Using project to only download necessary fields for speed
        const docs = await db.collection("restaurants")
            .find({})
            .project({
                "Restaurant ID": 1,
                "Restaurants": 1,
                "Country": 1,
                "Region": 1,
                "Sub Region": 1,
                "Commune": 1, // Ensured this is included
                "Type": 1,
                "Short Description": 1,
                "GKP": 1,
                "Open": 1,
                "G": 1,
                "Latitude": 1,
                "Longitude": 1,
                "Lunch Cost (€)": 1,
                "Bracket": 1
            })
            .toArray();

        const mapped = docs.map(mapLunch);
        return NextResponse.json(mapped);
    } catch (err) {
        console.error("Lunch GET Error:", err);
        return NextResponse.json({ error: "Failed to fetch lunch data" }, { status: 500 });
    }
}

// --- CREATE ---
export async function POST(req: Request) {
    const authError = await requireAdmin();
    if (authError) return authError;
    try {
        const client = await clientPromise;
        const db = client.db("smartRoute");
        const data = await req.json();

        const newDoc = {
            "Restaurant ID": data.id,
            "Restaurants": data.name,
            "Country": data.country || "France",
            "Region": data.region,
            "Sub Region": data.subRegion,
            "Commune": data.commune,
            "Type": data.type,
            "Short Description": data.description,
            "GKP": data.gkp,
            "Open": data.open,
            "G": Number(data.rating) || 0,
            "Latitude": Number(data.latitude) || 0,
            "Longitude": Number(data.longitude) || 0,
            "Lunch Cost (€)": Number(data.lunchCost) || 0,
            "Bracket": data.bracket
        };

        const result = await db.collection("restaurants").insertOne(newDoc);
        return NextResponse.json({ success: true, mongoId: result.insertedId });
    } catch (err) {
        return NextResponse.json({ error: "Create failed" }, { status: 500 });
    }
}

// --- UPDATE ---
export async function PUT(req: Request) {
    const authError = await requireAdmin();
    if (authError) return authError;
    try {
        const client = await clientPromise;
        const db = client.db("smartRoute");
        const data = await req.json();

        if (!data.mongoId) return NextResponse.json({ error: "Missing mongoId" }, { status: 400 });

        const updateData = {
            "Restaurant ID": data.id,
            "Restaurants": data.name,
            "Country": data.country ?? "",
            "Region": data.region,
            "Sub Region": data.subRegion,
            "Commune": data.commune,
            "Short Description": data.description,
            "G": Number(data.rating),
            "Latitude": Number(data.latitude),
            "Longitude": Number(data.longitude),
            "Lunch Cost (€)": Number(data.lunchCost),
            "Bracket": data.bracket,
            "Open": data.open,
            "GKP": data.gkp
        };

        const result = await db.collection("restaurants").updateOne(
            { _id: new ObjectId(data.mongoId) },
            { $set: updateData }
        );

        return NextResponse.json({ success: true, modified: result.modifiedCount });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// --- DELETE ---
export async function DELETE(req: Request) {
    const authError = await requireAdmin();
    if (authError) return authError;
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "No ID" }, { status: 400 });

        const client = await clientPromise;
        const db = client.db("smartRoute");
        await db.collection("restaurants").deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}