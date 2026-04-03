import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDb } from "@/lib/mongo";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    // Query MongoDB directly — no HTTP self-fetch needed.
                    // This works reliably on Vercel regardless of NEXTAUTH_URL.
                    const db = await getDb();
                    const user = await db.collection("users").findOne({
                        email: credentials.email.toLowerCase().trim()
                    });

                    if (!user) return null;
                    if (user.isActive === false) return null;

                    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                    if (!isValidPassword) return null;

                    // Update last login timestamp
                    await db.collection("users").updateOne(
                        { _id: user._id },
                        { $set: { lastLoginAt: new Date(), updatedAt: new Date() } }
                    );

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name ?? user.displayName,
                        role: user.role ?? "user",
                        trialEndDate: user.trialEndDate ? new Date(user.trialEndDate).toISOString() : undefined,
                        createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : undefined,
                    };
                } catch (error) {
                    console.error("Auth authorize error:", error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.id = (user as any).id;
                token.name = (user as any).name;
                token.trialEndDate = (user as any).trialEndDate;
                token.createdAt = (user as any).createdAt;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
                (session.user as any).name = token.name;
                (session.user as any).trialEndDate = token.trialEndDate;
                (session.user as any).createdAt = token.createdAt;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };