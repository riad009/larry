// "use client";
//
// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { Geist, Geist_Mono } from "next/font/google";
// import "@/app/globals.css";
// import TopTabs from "@/components/explorer-components/top-tabs";
// import { Loader2 } from "lucide-react";
//
// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// });
//
// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// });
//
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();
//     const pathname = usePathname();
//
//     useEffect(() => {
//         const user = localStorage.getItem("user");
//
//         // Define pages that DON'T need a login (Login, Signup, etc.)
//         const publicPages = ["/login", "/signup", "/forgot-password"];
//         const isPublicPage = publicPages.includes(pathname);
//
//         if (!user && !isPublicPage) {
//             // No user found and trying to access a private page
//             router.push("/login");
//         } else {
//             setLoading(false);
//         }
//     }, [pathname, router]);
//
//     return (
//         <html lang="en">
//         <body className={`${geistSans.variable} ${geistMono.variable} antialiased app-background flex flex-col items-center justify-start`}>
//         {loading ? (
//             <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
//                 <Loader2 className="animate-spin text-green-500" size={40} />
//             </div>
//         ) : (
//             <>
//                 {/* Only show Tabs if not on login/signup pages */}
//                 {!["/login", "/signup"].includes(pathname) && <TopTabs />}
//                 {children}
//             </>
//         )}
//         </body>
//         </html>
//     );
// }

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
                <footer className="fixed bottom-0 left-0 right-0 z-50 w-full border-t border-[#E0E0E0] bg-white py-4">
                    <nav className="flex justify-center items-center gap-6 flex-wrap px-4" aria-label="Footer navigation">
                        {FOOTER_ITEMS.map(({ label, href, icon: Icon }) => {
                            const isActive = pathname === href || (href !== "/plan" && pathname.startsWith(href));
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`flex flex-col items-center gap-1 text-sm font-medium transition-colors ${
                                        isActive ? "text-black" : "text-black hover:text-[#424242]"
                                    }`}
                                >
                                    <Icon className="w-5 h-5" aria-hidden />
                                    <span>{label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </footer>
            )}
        </div>
    );
}