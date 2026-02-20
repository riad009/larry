import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import {ObjectId} from "bson";

export async function GET() {
    const client = await clientPromise;
    const db = client.db("smartRoute");
    const listings = await db.collection("listings").find({}).toArray();
    return NextResponse.json(listings);
}

export async function POST(req: Request) {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("smartRoute");

    const result = await db.collection("listings").insertOne({
        ...body,
        createdAt: new Date(),
    });

    return NextResponse.json({ insertedId: result.insertedId });
}

export async function PUT(req: Request) {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("smartRoute");

    await db.collection("listings").updateOne(
        { _id: new ObjectId(body._id) },
        { $set: body }
    );

    return NextResponse.json({ message: "Listing updated" });
}
