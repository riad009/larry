import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { name, email, password, userType } = await req.json();

        // Validate required fields
        if (!name || !email || !password || !userType) {
            return NextResponse.json(
                { error: "Missing required fields: name, email, password, userType" },
                { status: 400 }
            );
        }

        // Validate userType
        const validUserTypes = ["wineLover", "travelPro"];
        if (!validUserTypes.includes(userType)) {
            return NextResponse.json(
                { error: "Invalid userType. Must be 'wineLover' or 'travelPro'" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("smartRoute");

        // Check if user already exists
        const existingUser = await db.collection("users").findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdAt = new Date();
        const trialEndDate = new Date(createdAt.getTime() + 3 * 24 * 60 * 60 * 1000); // 3-day free plan

        // Create user object
        const userData = {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            userType: userType, // Store as wineLover or travelPro
            displayName: userType === "wineLover" ? "Wine Lover" : "Travel Pro", // Human-readable version
            role: "user",
            isActive: true,
            trialEndDate,
            createdAt,
            updatedAt: new Date(),
        };

        // Insert into database
        const result = await db.collection("users").insertOne(userData);

        // Return success response (without sensitive data)
        return NextResponse.json(
            {
                success: true,
                message: "User created successfully",
                userId: result.insertedId,
                userType: userData.displayName,
                trialEndDate: userData.trialEndDate,
                createdAt: userData.createdAt,
            },
            { status: 201 }
        );

    } catch (err) {
        console.error("Signup error:", err);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}