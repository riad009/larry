// components/transport/TransportEmptyState.tsx
import { Car, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TransportEmptyStateProps {
    state: "initial" | "noResults";
    totalCount: number;
    onClearFilters?: () => void;
    isMobile?: boolean;
}

export function TransportEmptyState({
                                        state,
                                        totalCount,
                                        onClearFilters,
                                        isMobile = false,
                                    }: TransportEmptyStateProps) {
    if (state === "initial") {
        if (isMobile) {
            return (
                <div className="text-center py-8">
                    <div className="p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800 mb-4">
                        <Car className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                        <p className="text-zinc-400 text-sm mb-2">
                            Select filters and click Apply to find transport
                        </p>
                        <p className="text-zinc-500 text-xs">
                            Found {totalCount} transport options
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div className="text-center py-12">
                <div className="max-w-md mx-auto p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800">
                    <div className="p-4 bg-zinc-800/50 rounded-2xl inline-block mb-4">
                        <Car className="w-12 h-12 text-zinc-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Start Exploring</h3>
                    <p className="text-zinc-400 mb-4">
                        Use the filters to discover transport matching your preferences
                    </p>
                    <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm">
                        <Navigation className="w-4 h-4" />
                        <span>{totalCount} options available</span>
                    </div>
                </div>
            </div>
        );
    }

    // state === "noResults"
    if (isMobile) {
        return (
            <div className="text-center py-8">
                <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
                    <Navigation className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                    <p className="text-zinc-400 text-sm mb-2">
                        No transport options match these criteria
                    </p>
                    <p className="text-zinc-500 text-xs">Try adjusting your filters</p>
                </div>
            </div>
        );
    }

    return (
        <div className="text-center py-12">
            <div className="max-w-md mx-auto p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800">
                <div className="p-4 bg-zinc-800/50 rounded-2xl inline-block mb-4">
                    <Navigation className="w-12 h-12 text-zinc-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Matches Found</h3>
                <p className="text-zinc-400 mb-4">
                    Try adjusting your filters for more results
                </p>
                {onClearFilters && (
                    <Button
                        onClick={onClearFilters}
                        className="bg-zinc-800 hover:bg-zinc-700"
                    >
                        Reset All Filters
                    </Button>
                )}
            </div>
        </div>
    );
}