/* app/overview/page.tsx */
"use client";
import React, { useEffect, useState } from "react";
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

export default function OverviewPage() {
    const hasHydrated = useTripHydrationStore((s) => s.hasHydrated);
    const { vineyards, lunches } = useTripStore();
    const router = useRouter();

    const defaultRouteStops = React.useMemo<RouteStop[]>(
        () => [
            ...vineyards.map((v) => ({ type: "vineyard" as const, data: v })),
            ...lunches.map((l) => ({ type: "lunch" as const, data: l })),
        ],
        [vineyards, lunches]
    );

    const [routeStops, setRouteStops] = useState<RouteStop[]>([]);

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

    return (
        <OverviewLayout fullViewport>
            <div className="flex flex-col md:flex-row flex-1 min-h-0 w-full overflow-hidden">
                <div className="relative w-full md:w-[68%] h-[65vh] md:h-full flex-shrink-0">
                    <GoogleOverviewMap routeStops={orderedStops} />
                </div>
                <div className="w-full md:w-[32%] h-auto md:h-full flex-shrink-0 bg-white border-l border-[#E0E0E0] p-4 md:p-6 md:flex md:flex-col md:overflow-hidden">
                    <div className="md:flex-1 md:min-h-0 md:overflow-y-auto">
                        <h2 className="text-lg font-bold text-black mb-4">Your Trip Route</h2>
                        <RouteOrderList routeStops={orderedStops} onReorder={setRouteStops} />
                    </div>
                    <div className="mt-6 md:mt-0 md:flex-shrink-0 md:border-t md:border-[#E0E0E0] md:pt-4 md:bg-white">
                        <ActionButtonsGrid onButtonClick={(id) => console.log(id)} />
                        <div className="mt-6">
                            <PrimaryActionButton href="/transport" />
                        </div>
                    </div>
                </div>
            </div>
        </OverviewLayout>
    );
}
