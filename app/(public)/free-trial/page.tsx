"use client";
import React from 'react'
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Check, Wine, Sparkles, ArrowRight } from "lucide-react";

function Page() {
    const { status } = useSession();
    const destination = status === "authenticated" ? "/plan-like-an-expert" : "/signup";

    const features = [
        { text: "View", detail: "a limited number of Champagne vineyards" },
        { text: "View", detail: "all restaurants" },
        { text: "See", detail: "experience ratings" },
        { text: "Filter", detail: "by area & cost" },
        { text: "Create", detail: "a trip map" },
    ];

    return (
        <div className="app-background flex items-center justify-center min-h-screen p-4">
            {/* Decorative blurs */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-20 left-1/4 w-64 h-64 bg-wine-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-sm">
                {/* Glass card */}
                <div className="glass-card rounded-3xl p-8 shadow-xl animate-fade-in-up">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="p-4 rounded-2xl gradient-wine shadow-lg animate-pulse-glow">
                            <Wine className="w-10 h-10 text-white" />
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-200/50 border border-gold-300/50 mb-3">
                            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                            <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">Free Access</span>
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight text-charcoal mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                            <span className="text-gradient-wine">FREE</span>
                        </h2>
                        <p className="text-base text-warm-gray leading-relaxed">
                            Sample SmartRoute&apos;s vineyard experience
                        </p>
                    </div>

                    {/* Feature list */}
                    <ul className="space-y-3 mb-8">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-wine-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-sm text-charcoal leading-relaxed">
                                    <strong className="font-semibold text-wine-600">{feature.text}</strong> {feature.detail}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA */}
                    <Link href={destination}>
                        <button className="group w-full gradient-cta text-white p-4 rounded-2xl font-bold text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg border-0 active:scale-[0.98] transition-all">
                            {status === "loading" ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Checking...</span>
                                </div>
                            ) : (
                                <>
                                    <span>Test Now</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Page
