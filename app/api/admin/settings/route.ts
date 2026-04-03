import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";

export async function PUT(req: Request) {
    try {
        // 1. Get the current session to verify this is an Admin
        const session = await getServerSession();

        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Access Denied: Admins only." }, { status: 403 });
        }

        const body = await req.json();
        const { id, name, email, password } = body;

        // Validation
        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const db = await getDb();

        // 2. Prepare the update object
        const updateData: any = {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            updatedAt: new Date()
        };

        // 3. Only hash and update password if it was actually provided
        if (password && password.trim().length >= 6) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        // 4. Update the database
        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Admin profile updated successfully"
        });

    } catch (err: any) {
        console.error("Settings Update Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}