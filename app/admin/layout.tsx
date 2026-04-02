"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Loader2, Wine } from "lucide-react";
import AdminHeader from "@/components/AdminHeader";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-wine-900">
                <div className="p-3 rounded-xl gradient-wine shadow-lg mb-4 animate-pulse-glow">
                    <Wine className="w-8 h-8 text-white" />
                </div>
                <Loader2 className="animate-spin text-gold-400" size={32} />
            </div>
        );
    }

    const isAdmin = session?.user && (session.user as any).role === "admin";

    if (!isAdmin) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-wine-900 p-6 text-center">
                <div className="p-6 rounded-2xl bg-wine-700/30 mb-6 border border-wine-600/30">
                    <ShieldAlert size={64} className="text-wine-300" />
                </div>
                <h1 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                    Access Denied
                </h1>
                <p className="text-wine-300 text-sm max-w-sm mb-8 font-medium">
                    Account: <span className="text-white">{session?.user?.email || "Not Logged In"}</span><br/>
                    Role: <span className="text-gold-400 uppercase font-bold">{(session?.user as any)?.role || "None"}</span>
                </p>
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="gradient-gold-cta text-charcoal px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-95 shadow-lg border-0"
                >
                    Log in as Admin
                </button>
            </div>
        );
    }

    return (
        <div className="bg-cream min-h-screen text-charcoal">
            <AdminHeader />
            <main>
                {children}
            </main>
        </div>
    );
}