// app/(trip)/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import TopTabs from "@/components/explorer-components/top-tabs";
import { ExpiryWarningBanner } from "@/components/expiry-warning-banner";
import { Home, Compass, CreditCard, MapPin, User } from "lucide-react";

const FOOTER_ITEMS = [
    { label: "Home", href: "/plan-like-an-expert", icon: Home },
    { label: "Explore", href: "/vineyard", icon: Compass },
    { label: "Plans", href: "/plan", icon: CreditCard },
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

            <main className={`w-full flex-1 ${!isAuthPage ? "pb-24" : ""}`}>
                {children}
            </main>

            {!isAuthPage && (
                <footer className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white/80 backdrop-blur-xl border-t border-warm-border py-3 shadow-[0_-4px_20px_rgba(155,27,48,0.05)]">
                    <nav className="flex justify-center items-center gap-6 flex-wrap px-4" aria-label="Footer navigation">
                        {FOOTER_ITEMS.map(({ label, href, icon: Icon }) => {
                            const isActive = pathname === href || (href !== "/plan" && pathname.startsWith(href));
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`flex flex-col items-center gap-1 text-sm font-medium transition-all duration-300 ${
                                        isActive
                                            ? "text-wine-600"
                                            : "text-warm-gray hover:text-wine-500"
                                    }`}
                                >
                                    <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                                        isActive
                                            ? "bg-wine-50 shadow-sm"
                                            : ""
                                    }`}>
                                        <Icon className="w-5 h-5" aria-hidden />
                                    </div>
                                    <span className="text-xs">{label}</span>
                                    {isActive && (
                                        <div className="w-1 h-1 rounded-full bg-wine-500 animate-fade-in" />
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