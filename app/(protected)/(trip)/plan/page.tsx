"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Check, X, Lock } from "lucide-react";

const FEATURES = [
  { label: "Quality Ratings", basic: true, plus: true, premium: true, pro: true },
  { label: "Plan Download", basic: false, plus: "email", premium: "email", pro: "email / PDF" },
  { label: "Curated Offers", basic: false, plus: false, premium: true, pro: true },
  { label: "Wine Hotels", basic: false, plus: false, premium: "3", pro: "5" },
  { label: "Dinner Ideas", basic: false, plus: false, premium: "3", pro: "5" },
  { label: "Premium Offers", basic: false, plus: false, premium: false, pro: true },
  { label: "Wine Ratings", basic: false, plus: false, premium: true, pro: true },
  { label: "Access to Q&A", basic: false, plus: false, premium: false, pro: true },
];

function FeatureCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check className="w-5 h-5 text-charcoal flex-shrink-0" aria-hidden />;
  }
  if (value === false) {
    return <X className="w-5 h-5 text-warm-gray flex-shrink-0" aria-hidden />;
  }
  return <span className="text-sm font-medium text-charcoal">{value}</span>;
}

function isTrialActive(trialEndDate: string | null | undefined): boolean {
  if (!trialEndDate) return false;
  return new Date() <= new Date(trialEndDate);
}

export default function PlanPage() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated" && !!session?.user;
  const trialActive = isLoggedIn && isTrialActive(session?.user?.trialEndDate);
  const trialExpired = isLoggedIn && !isTrialActive(session?.user?.trialEndDate);

  return (
    <div className="min-h-screen bg-white/70 backdrop-blur-sm py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-charcoal tracking-wide mb-2 uppercase">
            Plans &amp; Pricing
          </h1>
          <p className="text-lg text-warm-gray leading-relaxed">
            Choose the plan that fits your journey.
          </p>
        </div>

        {trialExpired && (
          <div className="mb-6 rounded-xl border border-warm-border bg-cream px-4 py-3 text-center text-charcoal font-medium">
            Your plan has expired. Please upgrade to continue.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* PLAN 1: BASIC (FREE) - dynamic state */}
          <div
            className={`rounded-xl border-2 bg-white/70 backdrop-blur-sm p-5 shadow-sm flex flex-col ${
              trialExpired ? "border-warm-border opacity-90" : "border-wine-500"
            }`}
          >
            <h2 className="text-xl font-bold text-charcoal mb-1">Basic</h2>
            <p className="text-2xl font-bold text-charcoal mb-0.5">Free</p>
            <p className="text-sm text-warm-gray mb-4">
              {trialExpired ? "Expired" : "Saved for 3 Days"}
            </p>
            <ul className="space-y-2.5 flex-1 text-sm">
              {FEATURES.map((f) => (
                <li key={f.label} className="flex items-center gap-2">
                  <FeatureCell value={f.basic} />
                  <span className="text-charcoal">{f.label}</span>
                </li>
              ))}
            </ul>
            {!isLoggedIn && (
              <Link
                href="/signup"
                className="mt-6 w-full py-3 rounded-xl gradient-cta text-white font-semibold text-base border border-wine-500 text-center hover:bg-wine-700 transition-colors"
              >
                Free Registration
              </Link>
            )}
            {trialActive && (
              <button
                type="button"
                disabled
                className="mt-6 w-full py-3 rounded-xl bg-[#E0E0E0] text-warm-gray font-semibold text-base border border-warm-border cursor-not-allowed"
              >
                Already in use
              </button>
            )}
            {trialExpired && (
              <button
                type="button"
                disabled
                className="mt-6 w-full py-3 rounded-xl bg-[#E0E0E0] text-warm-gray font-semibold text-base border border-warm-border cursor-not-allowed"
              >
                Expired
              </button>
            )}
          </div>

          {/* PLAN 2: PLUS (COMING SOON) */}
          <div className="rounded-xl border border-warm-border bg-white/70 backdrop-blur-sm p-5 shadow-sm flex flex-col opacity-90">
            <h2 className="text-xl font-bold text-charcoal mb-1">Plus</h2>
            <p className="text-2xl font-bold text-charcoal mb-0.5">€25 / 1 Week</p>
            <p className="text-sm text-warm-gray mb-4">Saved for 1 Week</p>
            <ul className="space-y-2.5 flex-1 text-sm">
              {FEATURES.map((f) => (
                <li key={f.label} className="flex items-center gap-2">
                  <FeatureCell value={f.plus} />
                  <span className="text-charcoal">{f.label}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              disabled
              className="mt-6 w-full py-3 rounded-xl bg-cream text-warm-gray font-semibold text-base border border-warm-border cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" aria-hidden />
              Coming Soon
            </button>
          </div>

          {/* PLAN 3: PREMIUM (COMING SOON) */}
          <div className="rounded-xl border border-warm-border bg-white/70 backdrop-blur-sm p-5 shadow-sm flex flex-col opacity-90">
            <h2 className="text-xl font-bold text-charcoal mb-1">Premium</h2>
            <p className="text-2xl font-bold text-charcoal mb-0.5">€50 / 4 Weeks</p>
            <p className="text-sm text-warm-gray mb-4">Saved for 4 Weeks</p>
            <ul className="space-y-2.5 flex-1 text-sm">
              {FEATURES.map((f) => (
                <li key={f.label} className="flex items-center gap-2">
                  <FeatureCell value={f.premium} />
                  <span className="text-charcoal">{f.label}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              disabled
              className="mt-6 w-full py-3 rounded-xl bg-cream text-warm-gray font-semibold text-base border border-warm-border cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" aria-hidden />
              Coming Soon
            </button>
          </div>

          {/* PLAN 4: PRO (COMING SOON) */}
          <div className="rounded-xl border border-warm-border bg-white/70 backdrop-blur-sm p-5 shadow-sm flex flex-col opacity-90">
            <h2 className="text-xl font-bold text-charcoal mb-1">Pro</h2>
            <p className="text-2xl font-bold text-charcoal mb-0.5">€150 / 8 Weeks</p>
            <p className="text-sm text-warm-gray mb-4">Saved for 8 Weeks</p>
            <ul className="space-y-2.5 flex-1 text-sm">
              {FEATURES.map((f) => (
                <li key={f.label} className="flex items-center gap-2">
                  <FeatureCell value={f.pro} />
                  <span className="text-charcoal">{f.label}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              disabled
              className="mt-6 w-full py-3 rounded-xl bg-cream text-warm-gray font-semibold text-base border border-warm-border cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" aria-hidden />
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
