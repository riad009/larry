"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";

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
    if (remaining <= 0) return null; // Expired: no warning (access is blocked elsewhere)
    if (remaining < MS_24H) return "Your plan expires today. Upgrade to continue access.";
    if (remaining < MS_48H) return "Your free access expires in less than 24 hours.";
    return null;
  }, [session?.user?.trialEndDate, status]);

  if (!message) return null;

  return (
    <div
      className="w-full border-b border-[#E0E0E0] bg-[#F5F5F5] px-4 py-2 text-center text-sm text-black"
      role="status"
    >
      {message}
    </div>
  );
}
