import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const region = searchParams.get("region");

        if (!region || typeof region !== "string" || !region.trim()) {
            return NextResponse.json({ count: 0 });
        }

        const client = await clientPromise;
        const db = client.db("smartRoute");

        const count = await db.collection("vineyards").countDocuments({
            $or: [
                { Region: region.trim() },
                { region: region.trim() },
            ],
        });

        return NextResponse.json({ count });
    } catch (error) {
        console.error("vineyards/count GET error:", error);
        return NextResponse.json({ error: "Failed to fetch count" }, { status: 500 });
    }
}
