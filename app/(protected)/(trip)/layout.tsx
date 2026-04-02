// app/(trip)/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import TopTabs from "@/components/explorer-components/top-tabs";
import { ExpiryWarningBanner } from "@/components/expiry-warning-banner";
import { Home, Compass, CalendarDays, MapPin, User } from "lucide-react";

const FOOTER_ITEMS = [
    { label: "Home", href: "/plan-like-an-expert", icon: Home },
    { label: "Explore", href: "/vineyard", icon: Compass },
    { label: "My Trips", href: "/profile", icon: CalendarDays },
    { label: "Trip", href: "/overview", icon: MapPin },
    { label: "Profile", href: "/profile", icon: User },
];

export default function TripLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = ["/login", "/signup"].includes(pathname);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen">
            {!isAuthPage && <TopTabs />}
            {!isAuthPage && <ExpiryWarningBanner />}

            <main className={`w-full flex-1 ${!isAuthPage ? "pb-20" : ""}`}>
                {children}
            </main>

            {!isAuthPage && (
                <footer className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white/90 backdrop-blur-xl border-t border-warm-border py-2 shadow-[0_-4px_20px_rgba(155,27,48,0.05)]">
                    <nav className="flex justify-around items-center max-w-lg mx-auto px-2" aria-label="Footer navigation">
                        {FOOTER_ITEMS.map(({ label, href, icon: Icon }) => {
                            const isActive = pathname === href || (label === "Explore" && (pathname === "/vineyard" || pathname === "/lunch"));
                            return (
                                <Link
                                    key={label}
                                    href={href}
                                    className={`flex flex-col items-center gap-0.5 min-w-[48px] py-1 transition-all duration-200 ${
                                        isActive
                                            ? "text-wine-600"
                                            : "text-warm-gray hover:text-wine-500"
                                    }`}
                                >
                                    <div className={`p-1.5 rounded-xl transition-all duration-200 ${
                                        isActive ? "bg-wine-50" : ""
                                    }`}>
                                        <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} aria-hidden />
                                    </div>
                                    <span className={`text-[10px] font-semibold ${isActive ? "text-wine-600" : ""}`}>{label}</span>
                                    {isActive && (
                                        <div className="w-1 h-1 rounded-full bg-wine-500" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </footer>
            )}
        </div>
    );
}