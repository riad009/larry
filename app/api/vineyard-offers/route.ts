import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { mapVineyardOfferDoc } from "@/utils/mappers";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const vineyardId = searchParams.get("vineyardId");

    if (!vineyardId) return NextResponse.json([], { status: 400 });

    try {
        const db = await getDb();

        // Query the offers collection for matches
        const rawOffers = await db.collection("vineyard-offers")
            .find({ "Vineyard ID": vineyardId })
            .toArray();

        return NextResponse.json(rawOffers.map(mapVineyardOfferDoc));
    } catch (e) {
        return NextResponse.json([], { status: 500 });
    }
}