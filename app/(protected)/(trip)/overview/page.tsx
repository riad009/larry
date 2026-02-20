/* app/overview/page.tsx */
"use client";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTripStore, useTripHydrationStore } from "@/store/tripStore";
import {
    OverviewLoadingState, MapDisplay, VineyardCard,
    LunchCard, TimelineCard, ActionButtonsGrid,
    PrimaryActionButton, OverviewLayout
} from "@/components/overview";

export default function OverviewPage() {
    const hasHydrated = useTripHydrationStore((s) => s.hasHydrated);
    const { vineyards, lunches, transport, selectedOffer } = useTripStore();
    const vineyard = vineyards?.[0] ?? null;
    const firstLunch = lunches?.[0] ?? null;
    const router = useRouter();

    useEffect(() => {
        if (!hasHydrated) return;
        if (!vineyards?.length) router.push("/vineyard");
        else if (!lunches?.length) router.push("/lunch");
    }, [hasHydrated, vineyards?.length, lunches?.length, router]);

    const { timelineItems, totalTripDuration } = useMemo(() => {
        if (!vineyard || !firstLunch) return { timelineItems: [], totalTripDuration: "0h" };

        const startTime = new Date();
        startTime.setHours(9, 30, 0);

        const formatTime = (date: Date) =>
            date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

        const formatDuration = (mins: number) => {
            const h = Math.floor(mins / 60);
            const m = mins % 60;
            return h > 0 ? `${h}h ${m > 0 ? m + 'm' : ''}` : `${m}m`;
        };

        // --- Stage 1: Vineyard ---
        // Safety check: use duration from offer or default to 120 mins
        const vDuration = Number(selectedOffer?.duration) || 120;
        const travelStartTime = new Date(startTime.getTime() + vDuration * 60000);

        // --- Stage 2: Travel ---
        const tDuration = transport?.duration ? parseInt(transport.duration) : 30;
        const lunchStartTime = new Date(travelStartTime.getTime() + tDuration * 60000);

        // --- Stage 3: Lunch ---
        const lDuration = 90;

        const items = [
            {
                time: formatTime(startTime),
                title: "Vineyard Visit",
                description: `${vineyard.name}${selectedOffer?.title ? ` • ${selectedOffer.title}` : ""}`,
                duration: formatDuration(vDuration),
                color: "green" as const,
            },
            {
                time: formatTime(travelStartTime),
                title: "Travel",
                description: transport ? `${transport.type} to Restaurant` : "Commute",
                duration: formatDuration(tDuration),
                color: "purple" as const,
            },
            {
                time: formatTime(lunchStartTime),
                title: "Lunch Break",
                description: firstLunch.restaurantName || firstLunch.name || "Restaurant",
                duration: formatDuration(lDuration),
                color: "blue" as const,
            }
        ];

        const totalMins = vDuration + tDuration + lDuration;
        return {
            timelineItems: items,
            totalTripDuration: `${(totalMins / 60).toFixed(1)} Hours`
        };
    }, [vineyard, firstLunch, transport, selectedOffer]);

    if (!hasHydrated || !vineyards?.length || !lunches?.length) return <OverviewLoadingState />;

    return (
        <OverviewLayout>
            <div className="mb-6 md:mb-8">
                <MapDisplay
                    vineyard={{ latitude: vineyard.latitude, longitude: vineyard.longitude }}
                    lunch={{ latitude: firstLunch.latitude, longitude: firstLunch.longitude, name: firstLunch.name }}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <VineyardCard vineyard={vineyard} />
                <div className="space-y-4">
                    {lunches.map((lunch) => (
                        <LunchCard key={lunch.id} lunch={lunch} />
                    ))}
                </div>
                <TimelineCard
                    items={timelineItems}
                    totalDuration={totalTripDuration}
                    hasTransport={!!transport}
                />
            </div>

            <div className="mb-6 md:mb-8">
                <ActionButtonsGrid onButtonClick={(id) => console.log(id)} />
            </div>

            <PrimaryActionButton
                hasTransport={!!transport}
                href={transport ? "/itinerary" : "/transport"}
            />
        </OverviewLayout>
    );
}