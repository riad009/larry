// // app/api/offers/[vineyardId]/route.ts
// import clientPromise from "@/lib/mongo";
// import { NextResponse } from "next/server";
//
// export async function GET(_: Request, { params }: { params: { vineyardId: string } }) {
//     const client = await clientPromise;
//     const db = client.db(process.env.MONGODB_DB);
//     const offers = await db.collection("offers")
//         .find({ vineyardId: params.vineyardId })
//         .sort({ price: 1 })
//         .toArray();
//
//     return NextResponse.json(offers);
// }
import { NextRequest, NextResponse } from "next/server";

// 1. Change the type of context to expect a Promise
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ vineyardId: string }> }
) {
    // 2. Await the params before using them
    const { vineyardId } = await context.params;

    try {
        // ... your database logic using vineyardId ...
        console.log("Fetching offers for:", vineyardId);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}
