"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function formatCountdown(ms: number): string {
  if (ms <= 0) return "Expired";
  const d = Math.floor(ms / (24 * 60 * 60 * 1000));
  const h = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const m = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }
    if (status !== "authenticated" || !session?.user) return;

    const trialEnd = (session.user as any).trialEndDate;
    if (!trialEnd) {
      setCountdown("Expired");
      return;
    }

    const update = () => {
      const end = new Date(trialEnd).getTime();
      if (Number.isNaN(end)) {
        setCountdown("Expired");
        return;
      }
      const now = Date.now();
      setCountdown(formatCountdown(end - now));
    };

    update();
    const t = setInterval(update, 60 * 1000);
    return () => clearInterval(t);
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black">Loading...</p>
      </div>
    );
  }

  if (!session?.user) return null;

  const user = session.user as any;

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-md mx-auto">
        <div className="rounded-xl border border-[#E0E0E0] bg-white p-6 shadow-sm">
          <h1 className="text-xl font-bold text-black mb-6">Profile</h1>

          <div className="space-y-4 text-black">
            <div>
              <p className="text-xs font-bold text-[#424242] uppercase tracking-wider mb-1">Name</p>
              <p className="text-base">{user.name ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-[#424242] uppercase tracking-wider mb-1">Email</p>
              <p className="text-base">{user.email ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-[#424242] uppercase tracking-wider mb-1">Subscription Plan</p>
              <p className="text-base">Free</p>
            </div>
            <div>
              <p className="text-xs font-bold text-[#424242] uppercase tracking-wider mb-1">Account validity countdown</p>
              <p className="text-base font-semibold">{countdown || "—"}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E0E0E0]">
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full py-3 rounded-xl bg-black text-white font-semibold text-base border border-black hover:bg-[#424242]"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
