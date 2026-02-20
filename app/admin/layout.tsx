"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Loader2 } from "lucide-react";
import AdminHeader from "@/components/AdminHeader";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    // 1. Show a loading spinner while NextAuth checks the session
    if (status === "loading") {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
                <Loader2 className="animate-spin text-green-500" size={40} />
            </div>
        );
    }

    // 2. Check if user is logged in AND is an admin
    // Note: We cast session.user as any to access the 'role' we added in [...nextauth]
    const isAdmin = session?.user && (session.user as any).role === "admin";

    if (!isAdmin) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-950 p-6 text-center">
                <div className="p-6 rounded-full bg-red-500/10 mb-6 border border-red-500/20">
                    <ShieldAlert size={64} className="text-red-500" />
                </div>
                <h1 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-2">
                    Access Denied
                </h1>
                <p className="text-zinc-500 text-sm max-w-sm mb-8 font-medium">
                    Account: <span className="text-white">{session?.user?.email || "Not Logged In"}</span><br/>
                    Role: <span className="text-red-400 uppercase font-bold">{(session?.user as any)?.role || "None"}</span>
                </p>
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-green-500 transition-all active:scale-95"
                >
                    Log in as Admin
                </button>
            </div>
        );
    }

    // 3. If they are an admin, show the protected content
    return (
        <div className="bg-zinc-950 min-h-screen text-white">
            <AdminHeader />
            <main>
                {children}
            </main>
        </div>
    );
}