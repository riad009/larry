"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTripStore } from "@/store/tripStore";
import { REGIONAL_HIGHLIGHTS_DATA } from "@/data/regionalHighlights";

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
            <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12 md:px-12">
                <p className="text-base font-bold text-black">No region selected. Please go back.</p>
            </div>
        );
    }

    const displayName = highlights ? highlights.regionName : region.name;
    const pointsList = highlights?.pointsOfInterest?.split(/;\s*/).filter(Boolean) ?? [];

    return (
        <div className="min-h-screen bg-white px-6 py-12 md:px-12">
            <div className="mx-auto max-w-5xl">
                {/* Header: two columns */}
                <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
                    <div>
                        <h1 className="text-5xl font-bold uppercase tracking-tight text-black md:text-6xl">
                            {displayName}
                        </h1>
                        <p className="mt-4 text-lg text-[#424242]">
                            {vineyardCount !== null
                                ? `${vineyardCount} vineyard${vineyardCount === 1 ? "" : "s"} listed`
                                : "..."}
                        </p>
                    </div>
                    <div className="flex justify-start md:justify-end">
                        <Link
                            href="/region-map"
                            className="font-medium text-black hover:underline"
                        >
                            View region map →
                        </Link>
                    </div>
                </div>

                {highlights ? (
                    <>
                        {/* Two-column content */}
                        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
                            {/* Left: Sub region varietals */}
                            <section>
                                <h2 className="mb-4 text-xl font-semibold text-black">
                                    Sub region varietals
                                </h2>
                                <ul className="space-y-2">
                                    {highlights.subRegionVarietals.map((item, index) => (
                                        <li key={index} className="flex gap-3">
                                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-black" />
                                            <span className="text-[#424242]">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Right: Access + Points of interest */}
                            <section className="space-y-10">
                                <div>
                                    <h2 className="mb-4 text-xl font-semibold text-black">
                                        Closest major city, station, airport
                                    </h2>
                                    <div className="flex gap-3">
                                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-black" />
                                        <p className="text-[#424242]">{highlights.closestMajorCity}</p>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="mb-4 text-xl font-semibold text-black">
                                        Travel duration by train
                                    </h2>
                                    <div className="flex gap-3">
                                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-black" />
                                        <p className="text-[#424242]">{highlights.closestTravelTime}</p>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="mb-4 text-xl font-semibold text-black">
                                        Points of interest
                                    </h2>
                                    {pointsList.length > 0 ? (
                                        <ul className="space-y-2">
                                            {pointsList.map((point, index) => (
                                                <li key={index} className="flex gap-3">
                                                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-black" />
                                                    <span className="text-[#424242]">{point.trim()}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-[#424242]">{highlights.pointsOfInterest}</p>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* CTA */}
                        <section className="mt-16 text-center">
                            <Link
                                href="/vineyard"
                                className="inline-block rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:bg-[#222]"
                            >
                                Explore vineyards
                            </Link>
                            <p className="mt-4 text-sm text-[#424242]">
                                Discover {displayName} estates
                            </p>
                        </section>
                    </>
                ) : (
                    <>
                        <section className="mt-12 flex min-h-[40vh] flex-col items-center justify-center text-center">
                            <h2 className="mb-2 text-xl font-semibold uppercase tracking-wide text-black">
                                Content coming soon
                            </h2>
                            <p className="text-[#424242]">
                                Terroir data for {region.name} is being curated
                            </p>
                        </section>
                        <section className="mt-16 text-center">
                            <Link
                                href="/vineyard"
                                className="inline-block rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:bg-[#222]"
                            >
                                Explore vineyards
                            </Link>
                            <p className="mt-4 text-sm text-[#424242]">
                                Discover {region.name} estates
                            </p>
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default RegionalHighlights;
