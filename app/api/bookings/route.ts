import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongo";
import { ObjectId } from "mongodb";

// GET /api/bookings — fetch user's bookings (or all for admin)
export async function GET(req: Request) {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";

    let filter: Record<string, unknown> = { userEmail: session.user.email };

    // Admin can fetch all bookings
    if (all) {
        const user = await db.collection("users").findOne({ email: session.user.email });
        if (user?.role === "admin") {
            filter = {};
        }
    }

    const bookings = await db
        .collection("bookings")
        .find(filter)
        .sort({ createdAt: -1 })
        .toArray();

    return NextResponse.json(bookings);
}

// POST /api/bookings — create a new booking
export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
        tripName,
        country,
        region,
        subRegion,
        vineyards,
        lunches,
        transportOption,
        notes,
    } = body;

    if (!tripName || !vineyards?.length) {
        return NextResponse.json(
            { error: "Trip name and at least one vineyard are required" },
            { status: 400 }
        );
    }

    const client = await clientPromise;
    const db = client.db();

    const now = new Date().toISOString();
    const booking = {
        userId: session.user.email,
        userName: session.user.name || "User",
        userEmail: session.user.email,
        tripName: String(tripName).slice(0, 200),
        country: String(country || ""),
        region: String(region || ""),
        subRegion: String(subRegion || ""),
        vineyards: Array.isArray(vineyards) ? vineyards : [],
        lunches: Array.isArray(lunches) ? lunches : [],
        transportOption: transportOption ? String(transportOption) : undefined,
        notes: notes ? String(notes).slice(0, 1000) : undefined,
        status: "confirmed" as const,
        createdAt: now,
        updatedAt: now,
    };

    const result = await db.collection("bookings").insertOne(booking);

    return NextResponse.json(
        { ...booking, _id: result.insertedId.toString() },
        { status: 201 }
    );
}

// DELETE /api/bookings?id=xxx — delete a booking
export async function DELETE(req: Request) {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
        return NextResponse.json({ error: "Missing booking id" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Users can only delete their own bookings, admins can delete any
    const user = await db.collection("users").findOne({ email: session.user.email });
    const filter: Record<string, unknown> = { _id: new ObjectId(id) };
    if (user?.role !== "admin") {
        filter.userEmail = session.user.email;
    }

    const result = await db.collection("bookings").deleteOne(filter);

    if (result.deletedCount === 0) {
        return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
}
