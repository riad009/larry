/* app/overview/page.tsx */
"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTripStore, useTripHydrationStore } from "@/store/tripStore";
import {
    OverviewLoadingState,
    GoogleOverviewMap,
    RouteOrderList,
    ActionButtonsGrid,
    PrimaryActionButton,
    OverviewLayout,
    type RouteStop,
} from "@/components/overview";

type MapViewMode = "normal" | "fullscreen" | "hidden";

export default function OverviewPage() {
    const hasHydrated = useTripHydrationStore((s) => s.hasHydrated);
    const { vineyards, lunches, removeVineyard, removeLunch, country, region, subRegion } = useTripStore();
    const router = useRouter();
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

    const handleActionClick = useCallback(async (id: string) => {
        if (id === "save") {
            setSaveStatus("saving");
            try {
                const res = await fetch("/api/bookings", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        tripName: `${region || "Wine"} Trip — ${new Date().toLocaleDateString()}`,
                        country,
                        region,
                        subRegion,
                        vineyards,
                        lunches,
                    }),
                });
                if (res.ok) {
                    setSaveStatus("saved");
                    setTimeout(() => setSaveStatus("idle"), 3000);
                } else {
                    setSaveStatus("error");
                    setTimeout(() => setSaveStatus("idle"), 3000);
                }
            } catch {
                setSaveStatus("error");
                setTimeout(() => setSaveStatus("idle"), 3000);
            }
        }
    }, [vineyards, lunches, country, region, subRegion]);

    const defaultRouteStops = React.useMemo<RouteStop[]>(
        () => [
            ...vineyards.map((v) => ({ type: "vineyard" as const, data: v })),
            ...lunches.map((l) => ({ type: "lunch" as const, data: l })),
        ],
        [vineyards, lunches]
    );

    const [routeStops, setRouteStops] = useState<RouteStop[]>([]);
    const [mapViewMode, setMapViewMode] = useState<MapViewMode>("normal");

    useEffect(() => {
        if (defaultRouteStops.length === 0) return;
        if (routeStops.length === 0) {
            setRouteStops(defaultRouteStops);
        } else if (routeStops.length !== defaultRouteStops.length) {
            setRouteStops(defaultRouteStops);
        }
    }, [defaultRouteStops, defaultRouteStops.length, routeStops.length]);

    useEffect(() => {
        if (!hasHydrated) return;
        if (!vineyards?.length) router.push("/vineyard");
        else if (!lunches?.length) router.push("/lunch");
    }, [hasHydrated, vineyards?.length, lunches?.length, router]);

    if (!hasHydrated || !vineyards?.length || !lunches?.length) return <OverviewLoadingState />;

    const orderedStops = routeStops.length > 0 ? routeStops : defaultRouteStops;

    if (mapViewMode === "fullscreen") {
        return (
            <OverviewLayout fullViewport>
                <div className="relative w-full h-screen flex-shrink-0 min-w-0">
                    <div className="absolute top-2 right-2 z-10">
                        <button
                            type="button"
                            onClick={() => setMapViewMode("normal")}
                            className="px-3 py-2 text-sm font-medium bg-white/80 backdrop-blur-sm border border-warm-border rounded-lg shadow-sm hover:bg-wine-50 text-charcoal"
                        >
                            Exit fullscreen
                        </button>
                    </div>
                    <div className="w-full h-full">
                        <GoogleOverviewMap routeStops={orderedStops} />
                    </div>
                </div>
            </OverviewLayout>
        );
    }

    return (
        <OverviewLayout fullViewport>
            <div className="flex flex-col md:flex-row flex-1 min-h-0 w-full overflow-hidden md:overflow-hidden">
                <div className="flex flex-col w-full md:w-[68%] flex-shrink-0 min-w-0">
                    {/* <div className="flex flex-wrap items-center gap-2 p-2 border-b border-[#E0E0E0] bg-white">
                        <button
                            type="button"
                            onClick={() => setMapViewMode("normal")}
                            className="px-3 py-1.5 text-sm font-medium bg-white border border-[#E0E0E0] rounded-lg hover:bg-[#F5F5F5] text-black disabled:opacity-50"
                            disabled={mapViewMode === "normal"}
                        >
                            View Map
                        </button>
                        <button
                            type="button"
                            onClick={() => setMapViewMode("hidden")}
                            className="px-3 py-1.5 text-sm font-medium bg-white border border-[#E0E0E0] rounded-lg hover:bg-[#F5F5F5] text-black disabled:opacity-50"
                            disabled={mapViewMode === "hidden"}
                        >
                            Hide Map
                        </button>
                        <button
                            type="button"
                            onClick={() => setMapViewMode("fullscreen")}
                            className="px-3 py-1.5 text-sm font-medium bg-white border border-[#E0E0E0] rounded-lg hover:bg-[#F5F5F5] text-black"
                        >
                            Fullscreen
                        </button>
                    </div> */}
                    {mapViewMode !== "hidden" && (
                        <div
                            className={`relative w-full flex-shrink-0 min-w-0 ${
                                mapViewMode === "normal" ? "h-[65vh] md:h-full" : ""
                            }`}
                        >
                            <GoogleOverviewMap routeStops={orderedStops} />
                        </div>
                    )}
                </div>
                <div className="w-full min-w-0 md:w-[32%] h-auto md:h-full flex-shrink-0 bg-white/70 backdrop-blur-sm border-l border-warm-border p-4 md:p-6 md:flex md:flex-col md:overflow-hidden flex-1 min-h-0 overflow-y-auto md:overflow-y-auto">
                    <div className="md:flex-1 md:min-h-0 md:overflow-y-auto min-w-0">
                        <h2 className="text-lg font-bold text-charcoal mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Your Trip Route</h2>
                        <RouteOrderList
                            routeStops={orderedStops}
                            onReorder={setRouteStops}
                            onRemove={(stop) => {
                                if (stop.type === "vineyard") removeVineyard(stop.data.id);
                                else removeLunch(stop.data.id);
                            }}
                        />
                    </div>
                    <div className="mt-6 md:mt-0 md:flex-shrink-0 md:border-t md:border-warm-border md:pt-4 md:bg-white/50">
                        <ActionButtonsGrid onButtonClick={handleActionClick} />
                        {saveStatus === "saved" && (
                            <div className="mt-2 text-sm text-green-600 font-medium text-center animate-fade-in">
                                ✓ Trip saved! View it in your Profile.
                            </div>
                        )}
                        {saveStatus === "saving" && (
                            <div className="mt-2 text-sm text-warm-gray font-medium text-center">
                                Saving...
                            </div>
                        )}
                        {saveStatus === "error" && (
                            <div className="mt-2 text-sm text-red-500 font-medium text-center">
                                Failed to save. Please try again.
                            </div>
                        )}
                        <div className="mt-6">
                            <PrimaryActionButton href="/transport" />
                        </div>
                    </div>
                </div>
            </div>
        </OverviewLayout>
    );
}
