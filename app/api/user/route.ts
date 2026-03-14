import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// Helper function to check if the user is an Admin
async function isAdmin() {
    const session = await getServerSession(authOptions);
    return session?.user?.role === "admin";
}

export async function GET() {
    try {
        // 1. Protection: Only admins can see the full user list
        if (!(await isAdmin())) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const client = await clientPromise;
        const db = client.db("smartRoute");
        const users = await db.collection("users").find({}).toArray();

        const mappedUsers = users.map(u => ({
            ...u,
            mongoId: u._id.toString(),
            password: ""
        }));

        return NextResponse.json(mappedUsers);
    } catch (err) {
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        // 2. Protection: Only admins can create users this way
        if (!(await isAdmin())) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { name, email, password, userType, role } = await req.json();
        const client = await clientPromise;
        const db = client.db("smartRoute");

        const cleanEmail = email.toLowerCase().trim();
        const existingUser = await db.collection("users").findOne({ email: cleanEmail });

        if (existingUser) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            name: name.trim(),
            email: cleanEmail,
            password: hashedPassword,
            userType: userType,
            displayName: userType === "wineLover" ? "Wine Lover" : "Travel Pro",
            role: role || "user",
            isActive: true,
            trialEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection("users").insertOne(userData);
        return NextResponse.json({ success: true, mongoId: result.insertedId });
    } catch (err) {
        return NextResponse.json({ error: "Create failed" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        // 3. Protection: Only admins can update users
        if (!(await isAdmin())) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const client = await clientPromise;
        const db = client.db("smartRoute");
        const data = await req.json();

        if (!data.mongoId) return NextResponse.json({ error: "No ID" }, { status: 400 });

        const updateData: any = {
            name: data.name.trim(),
            email: data.email.toLowerCase().trim(),
            userType: data.userType,
            displayName: data.userType === "wineLover" ? "Wine Lover" : "Travel Pro",
            role: data.role,
            isActive: data.isActive,
            updatedAt: new Date()
        };

        if (data.password && data.password.trim().length > 0) {
            updateData.password = await bcrypt.hash(data.password, 10);
        }

        await db.collection("users").updateOne(
            { _id: new ObjectId(data.mongoId) },
            { $set: updateData }
        );

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        // 4. Protection: Only admins can delete users
        if (!(await isAdmin())) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "No ID" }, { status: 400 });

        const client = await clientPromise;
        const db = client.db("smartRoute");
        await db.collection("users").deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}