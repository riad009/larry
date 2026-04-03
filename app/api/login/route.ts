import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        // Ensure we are reading JSON. If the body is empty, catch the error.
        const body = await req.json().catch(() => ({}));
        const { email, password } = body;

        // 1. Basic Validation
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const db = await getDb();

        // 2. Find user (Case-insensitive)
        const user = await db.collection("users").findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // 3. Check if account is ACTIVE
        if (user.isActive === false) {
            return NextResponse.json(
                { error: "Your account is deactivated. Please contact support." },
                { status: 403 }
            );
        }

        // 4. Verify Password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // 5. Trial expiry: do not block login; app will redirect expired users to Plan page

        // 6. Update Last Login Timestamp
        await db.collection("users").updateOne(
            { _id: user._id },
            {
                $set: {
                    lastLoginAt: new Date(),
                    updatedAt: new Date()
                }
            }
        );

        // 7. Return Success (Sanitized Data) – include trialEndDate and createdAt for session/countdown
        const trialEnd = user.trialEndDate ? new Date(user.trialEndDate) : null;
        const created = user.createdAt ? new Date(user.createdAt) : null;
        return NextResponse.json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                userType: user.userType,
                displayName: user.displayName || user.name,
                role: user.role || "user",
                trialEndDate: trialEnd?.toISOString?.() ?? null,
                createdAt: created?.toISOString?.() ?? null,
            }
        }, { status: 200 });

    } catch (err) {
        console.error("Login API error:", err);
        return NextResponse.json(
            { error: "Internal server error. Please try again." },
            { status: 500 }
        );
    }
}