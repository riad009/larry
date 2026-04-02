"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTripStore } from "@/store/tripStore";
import { REGIONAL_HIGHLIGHTS_DATA } from "@/data/regionalHighlights";
import { MapPin, Grape, Train, Landmark, ArrowRight, Sparkles } from "lucide-react";

const RegionalHighlights = () => {
    const { region } = useTripStore();
    const [vineyardCount, setVineyardCount] = useState<number | null>(null);

    const regionKey = region?.name?.toUpperCase() || "";
    const highlights = REGIONAL_HIGHLIGHTS_DATA[regionKey];

    useEffect(() => {
        if (!region?.name) {
            setVineyardCount(null);
            return;
        }
        let cancelled = false;
        setVineyardCount(null);
        fetch(`/api/vineyards/count?region=${encodeURIComponent(region.name)}`)
            .then((res) => res.json())
            .then((data) => {
                if (!cancelled && typeof data.count === "number") setVineyardCount(data.count);
            })
            .catch(() => {
                if (!cancelled) setVineyardCount(null);
            });
        return () => {
            cancelled = true;
        };
    }, [region?.name]);

    if (!region) {
        return (
            <div className="flex min-h-screen items-center justify-center app-background px-6 py-12 md:px-12">
                <p className="text-base font-bold text-charcoal">No region selected. Please go back.</p>
            </div>
        );
    }

    const displayName = highlights ? highlights.regionName : region.name;
    const pointsList = highlights?.pointsOfInterest?.split(/;\s*/).filter(Boolean) ?? [];

    return (
        <div className="min-h-screen app-background px-6 py-12 md:px-12">
            <div className="mx-auto max-w-5xl animate-fade-in-up">
                {/* Header */}
                <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wine-50 border border-wine-100 mb-4">
                            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                            <span className="text-xs font-semibold text-wine-600 uppercase tracking-wider">Regional Overview</span>
                        </div>
                        <h1 className="text-5xl font-bold uppercase tracking-tight text-charcoal md:text-6xl" style={{ fontFamily: 'var(--font-playfair)' }}>
                            <span className="text-gradient-wine">{displayName}</span>
                        </h1>
                        <p className="mt-4 text-lg text-warm-gray">
                            {vineyardCount !== null
                                ? `${vineyardCount} vineyard${vineyardCount === 1 ? "" : "s"} listed`
                                : "..."}
                        </p>
                    </div>
                    <div className="flex justify-start md:justify-end">
                        <Link
                            href="/region-map"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-wine-600 font-medium hover-lift transition-all"
                        >
                            <MapPin className="w-4 h-4" />
                            View region map
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {highlights ? (
                    <>
                        {/* Two-column content */}
                        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
                            {/* Left: Sub region varietals */}
                            <section className="glass-card rounded-2xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Grape className="w-5 h-5 text-wine-500" />
                                    <h2 className="text-xl font-semibold text-charcoal" style={{ fontFamily: 'var(--font-playfair)' }}>
                                        Sub region varietals
                                    </h2>
                                </div>
                                <ul className="space-y-2">
                                    {highlights.subRegionVarietals.map((item: string, index: number) => (
                                        <li key={index} className="flex gap-3">
                                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-wine-500" />
                                            <span className="text-warm-gray">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Right: Access + Points of interest */}
                            <section className="space-y-6">
                                <div className="glass-card rounded-2xl p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Train className="w-5 h-5 text-wine-500" />
                                        <h2 className="text-xl font-semibold text-charcoal" style={{ fontFamily: 'var(--font-playfair)' }}>
                                            Access & Transport
                                        </h2>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex gap-3">
                                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
                                            <div>
                                                <p className="text-sm font-semibold text-charcoal">Closest city/station/airport</p>
                                                <p className="text-warm-gray">{highlights.closestMajorCity}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
                                            <div>
                                                <p className="text-sm font-semibold text-charcoal">Travel by train</p>
                                                <p className="text-warm-gray">{highlights.closestTravelTime}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card rounded-2xl p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Landmark className="w-5 h-5 text-wine-500" />
                                        <h2 className="text-xl font-semibold text-charcoal" style={{ fontFamily: 'var(--font-playfair)' }}>
                                            Points of interest
                                        </h2>
                                    </div>
                                    {pointsList.length > 0 ? (
                                        <ul className="space-y-2">
                                            {pointsList.map((point: string, index: number) => (
                                                <li key={index} className="flex gap-3">
                                                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-wine-500" />
                                                    <span className="text-warm-gray">{point.trim()}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-warm-gray">{highlights.pointsOfInterest}</p>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* CTA */}
                        <section className="mt-16 text-center">
                            <Link
                                href="/vineyard"
                                className="group inline-flex items-center gap-2 gradient-cta text-white rounded-full px-10 py-4 font-bold shadow-lg transition-all active:scale-[0.98]"
                            >
                                Explore vineyards
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </section>
                    </>
                ) : (
                    <>
                        <section className="mt-12 flex min-h-[40vh] flex-col items-center justify-center text-center">
                            <div className="p-4 rounded-2xl gradient-wine-light mb-4">
                                <Grape className="w-10 h-10 text-wine-500" />
                            </div>
                            <h2 className="mb-2 text-xl font-semibold uppercase tracking-wide text-charcoal" style={{ fontFamily: 'var(--font-playfair)' }}>
                                Content coming soon
                            </h2>
                            <p className="text-warm-gray">
                                Terroir data for {region.name} is being curated
                            </p>
                        </section>
                        <section className="mt-16 text-center">
                            <Link
                                href="/vineyard"
                                className="group inline-flex items-center gap-2 gradient-cta text-white rounded-full px-10 py-4 font-bold shadow-lg transition-all active:scale-[0.98]"
                            >
                                Explore vineyards
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default RegionalHighlights;
