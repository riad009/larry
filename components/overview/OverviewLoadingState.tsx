// components/overview/OverviewLoadingState.tsx
import { Route } from "lucide-react";

export function OverviewLoadingState() {
    return (
        <div className="min-h-screen text-white p-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-sm text-center">
                <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-full border-4 border-zinc-800 border-t-green-500 animate-spin mx-auto"></div>
                    <Route className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-green-500" />
                </div>
                <h1 className="text-xl font-bold text-white mb-2">Loading Your Trip</h1>
                <p className="text-zinc-400 text-xs">Preparing your itinerary...</p>
            </div>
        </div>
    );
}