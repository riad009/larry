import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import crypto from "crypto";
import { Resend } from 'resend';

// Safety check: ensure the API key exists before starting
const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        // 1. Check if Resend is configured
        if (!resend) {
            console.error("ERROR: RESEND_API_KEY is missing in .env");
            return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
        }

        const db = await getDb();

        const user = await db.collection("users").findOne({
            email: email.toLowerCase().trim()
        });

        // Always return success message even if user doesn't exist (Security)
        if (!user) {
            return NextResponse.json({ message: "If an account exists, a link was sent." });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 3600000);

        await db.collection("users").updateOne(
            { _id: user._id },
            { $set: { resetPasswordToken: resetToken, resetPasswordExpires: resetTokenExpiry } }
        );

        const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
        const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

        // 2. Send Email
        const { data, error } = await resend.emails.send({
            from: 'SmartRoute <onboarding@smartroute.passportgourmet.com>',
            to: [email.toLowerCase().trim()],
            subject: 'Reset Your Password',
            html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`
        });

        if (error) {
            console.error("RESEND_ERROR:", error);
            // On free tier, you can ONLY send to your own sign-up email
            return NextResponse.json({
                error: "Resend only allows sending to your own email until you verify a domain."
            }, { status: 400 });
        }

        return NextResponse.json({ message: "Email sent" });

    } catch (err: any) {
        console.error("FORGOT_PASSWORD_DETAILED_ERROR:", err.message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
