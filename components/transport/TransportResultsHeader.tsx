// components/transport/TransportResultsHeader.tsx
import { Car, Filter } from "lucide-react";

interface TransportResultsHeaderProps {
    appliedFilters: {
        type: string;
        provider: string;
        cost: string;
    } | null;
    filteredCount: number;
    totalCount: number;
    onClearFilters?: () => void;
    isMobile?: boolean;
}

export function TransportResultsHeader({
                                           appliedFilters,
                                           filteredCount,
                                           totalCount,
                                           onClearFilters,
                                           isMobile = false,
                                       }: TransportResultsHeaderProps) {
    // Desktop version
    if (!isMobile) {
        return (
            <div className="mb-6 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                <div className="flex items-center justify-between">
                    <div>
                        {!appliedFilters ? (
                            <div className="flex items-center gap-3">
                                <Car className="w-5 h-5 text-green-500" />
                                <p className="text-zinc-400">
                                    Select filters to discover from{" "}
                                    <span className="text-white font-bold">{totalCount}</span>{" "}
                                    transport options
                                </p>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Filter className="w-5 h-5 text-green-500" />
                                <p className="text-zinc-400">
                                    Showing{" "}
                                    <span className="text-white font-bold">{filteredCount}</span>{" "}
                                    of <span className="text-white font-bold">{totalCount}</span>{" "}
                                    options
                                </p>
                            </div>
                        )}
                    </div>
                    {appliedFilters && filteredCount > 0 && onClearFilters && (
                        <button
                            onClick={onClearFilters}
                            className="px-4 py-2 text-sm text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // Mobile version
    return (
        <div className="mb-4">
            <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-zinc-400">
                    Showing {filteredCount} of {totalCount} options
                </p>
                {onClearFilters && (
                    <button
                        onClick={onClearFilters}
                        className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                        Clear filters
                    </button>
                )}
            </div>
        </div>
    );
}