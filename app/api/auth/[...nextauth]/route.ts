import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

                try {
                    const res = await fetch(`${baseUrl}/api/login`, {
                        method: 'POST',
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password
                        }),
                        headers: { "Content-Type": "application/json" }
                    });

                    // Safety check: if the response isn't JSON/OK, don't parse it
                    if (!res.ok) {
                        return null;
                    }

                    const data = await res.json();

                    if (data && data.user) {
                        const u = data.user;
                        return {
                            id: u.id,
                            email: u.email,
                            name: u.name ?? u.displayName,
                            role: u.role,
                            trialEndDate: u.trialEndDate ?? undefined,
                            createdAt: u.createdAt ?? undefined,
                        };
                    }
                } catch (error) {
                    console.error("Auth authorize error:", error);
                }

                return null;
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