import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json(
                { error: "Token and password are required" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("smartRoute");

        // 1. Find the user with this token and check if it's still valid (not expired)
        const user = await db.collection("users").findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() } // Date must be in the future
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid or expired reset token" },
                { status: 400 }
            );
        }

        // 2. Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Update the user, then CLEAR the token fields
        await db.collection("users").updateOne(
            { _id: user._id },
            {
                $set: { password: hashedPassword },
                $unset: {
                    resetPasswordToken: "",
                    resetPasswordExpires: ""
                }
            }
        );

        return NextResponse.json({
            success: true,
            message: "Password has been reset successfully"
        });

    } catch (err) {
        console.error("Reset password error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}