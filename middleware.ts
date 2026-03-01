import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const PLAN_PATH = "/plan";
const PROFILE_PATH = "/profile";

function isTrialExpired(token: { trialEndDate?: string | null } | null): boolean {
    if (!token?.trialEndDate) return true;
    try {
        const end = new Date(token.trialEndDate);
        return isNaN(end.getTime()) ? true : new Date() > end;
    } catch {
        return true;
    }
}

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;
        const isAdminPage = path.startsWith("/admin");

        if (isAdminPage && token?.role !== "admin") {
            return NextResponse.rewrite(new URL("/", req.url));
        }

        if (token?.role === "admin") {
            return NextResponse.next();
        }

        // Expired free plan: only allow /plan and /profile
        if (token && isTrialExpired(token)) {
            const allowedWhenExpired = path === PLAN_PATH || path.startsWith(PROFILE_PATH);
            if (!allowedWhenExpired) {
                return NextResponse.redirect(new URL(PLAN_PATH, req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/login",
        },
    }
);

export const config = {
    matcher: [
        "/lunch",
        "/lunch/:path*",
        "/overview",
        "/overview/:path*",
        "/transport",
        "/transport/:path*",
        "/vineyard",
        "/vineyard/:path*",
        "/plan-like-an-expert",
        "/plan-like-an-expert/:path*",
        "/region-highlights",
        "/region-highlights/:path*",
        "/region-map",
        "/region-map/:path*",
        "/profile",
        "/profile/:path*",
        "/admin",
        "/admin/:path*",
    ]
};