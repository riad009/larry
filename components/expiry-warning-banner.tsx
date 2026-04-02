"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { AlertTriangle } from "lucide-react";

const MS_24H = 24 * 60 * 60 * 1000;
const MS_48H = 48 * 60 * 60 * 1000;

export function ExpiryWarningBanner() {
  const { data: session, status } = useSession();

  const message = useMemo(() => {
    const trialEndDate = session?.user?.trialEndDate;
    if (status !== "authenticated" || !trialEndDate) return null;
    const end = new Date(trialEndDate).getTime();
    const now = Date.now();
    const remaining = end - now;
    if (remaining <= 0) return null;
    if (remaining < MS_24H) return "Your plan expires today. Upgrade to continue access.";
    if (remaining < MS_48H) return "Your free access expires in less than 24 hours.";
    return null;
  }, [session?.user?.trialEndDate, status]);

  if (!message) return null;

  return (
    <div
      className="w-full border-b border-gold-300/50 bg-gradient-to-r from-gold-200/50 via-gold-300/30 to-gold-200/50 px-4 py-2.5 text-center text-sm text-wine-700 font-medium flex items-center justify-center gap-2"
      role="status"
    >
      <AlertTriangle className="w-4 h-4 text-gold-600" />
      {message}
    </div>
  );
}
