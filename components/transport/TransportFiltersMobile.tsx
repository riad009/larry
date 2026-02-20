// components/transport/TransportFiltersMobile.tsx
import { Filter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TransportOption } from "@/types/transport";
import { ChevronRight } from "lucide-react";

interface TransportFiltersMobileProps {
    filters: {
        type: string;
        provider: string;
        cost: string;
    };
    appliedFilters: {
        type: string;
        provider: string;
        cost: string;
    } | null;
    hasActiveFilters: boolean;
    onFilterChange: (key: "type" | "provider" | "cost", value: string) => void;
    onApplyFilters: () => void;
    onClearFilters: () => void;
    typeOptions: Array<{ key: string; name: string }>;
    providerOptions: Array<{ key: string; name: string }>;
    costOptions: Array<{ key: string; name: string }>;
    selectedTransport: TransportOption | null;
}

export function TransportFiltersMobile({
                                           filters,
                                           appliedFilters,
                                           hasActiveFilters,
                                           onFilterChange,
                                           onApplyFilters,
                                           onClearFilters,
                                           typeOptions,
                                           providerOptions,
                                           costOptions,
                                           selectedTransport,
                                       }: TransportFiltersMobileProps) {
    return (
        <div className="w-full max-w-sm p-4 bg-zinc-900 rounded-3xl mb-6 border border-zinc-800">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-green-500" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                    Filter Transport
                </h2>
            </div>

            {/* Filter Dropdowns - Horizontal Layout */}
            <div className="flex flex-row gap-2 mb-4">
                <div className="flex-1">
                    <label className="text-[12px] font-bold text-zinc-500 uppercase ml-1 mb-1 block">
                        TYPE
                    </label>
                    <select
                        value={filters.type}
                        onChange={(e) => onFilterChange("type", e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded-lg text-[11px] h-9 outline-none hover:border-zinc-600 transition-colors"
                    >
                        {typeOptions.map((opt) => (
                            <option key={opt.key} value={opt.key}>
                                {opt.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex-1">
                    <label className="text-[12px] font-bold text-zinc-500 uppercase ml-1 mb-1 block">
                        PROVIDER
                    </label>
                    <select
                        value={filters.provider}
                        onChange={(e) => onFilterChange("provider", e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded-lg text-[11px] h-9 outline-none hover:border-zinc-600 transition-colors"
                    >
                        {providerOptions.map((opt) => (
                            <option key={opt.key} value={opt.key}>
                                {opt.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex-1">
                    <label className="text-[12px] font-bold text-zinc-500 uppercase ml-1 mb-1 block">
                        COST
                    </label>
                    <select
                        value={filters.cost}
                        onChange={(e) => onFilterChange("cost", e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded-lg text-[11px] h-9 outline-none hover:border-zinc-600 transition-colors"
                    >
                        {costOptions.map((opt) => (
                            <option key={opt.key} value={opt.key}>
                                {opt.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Filter Controls */}
            <div className="flex gap-3">
                <Button
                    onClick={onApplyFilters}
                    disabled={!hasActiveFilters}
                    className={`flex-1 font-bold h-12 rounded-xl transition-all duration-300 shadow-lg text-sm ${
                        hasActiveFilters
                            ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 hover:shadow-green-500/20"
                            : "bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed"
                    }`}
                >
                    APPLY FILTERS
                </Button>

                <Link
                    href="/plan"
                    className={`flex-1 ${!selectedTransport ? "pointer-events-none" : ""}`}
                >
                    <Button
                        disabled={!selectedTransport}
                        className={`w-full font-bold h-12 rounded-xl transition-all shadow-lg text-sm ${
                            selectedTransport
                                ? "bg-gradient-to-r from-white to-zinc-100 hover:from-zinc-100 hover:to-zinc-200 text-black opacity-100 hover:shadow-white/20"
                                : "bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed"
                        }`}
                    >
                        CONTINUE
                        <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                </Link>
            </div>

            {/* Applied Filters - Simplified Mobile Version */}
            {appliedFilters && (
                <div className="mt-4 pt-4 border-t border-zinc-800">
                    <p className="text-xs text-zinc-400 mb-2">Applied filters:</p>
                    <div className="flex flex-wrap gap-2">
                        {appliedFilters.type !== "ALL" && (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-lg border border-green-500/30">
                Type: {appliedFilters.type}
              </span>
                        )}
                        {appliedFilters.provider !== "ALL" && (
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-lg border border-blue-500/30">
                Provider: {appliedFilters.provider}
              </span>
                        )}
                        {appliedFilters.cost !== "ALL" && (
                            <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-lg border border-amber-500/30">
                Price: {appliedFilters.cost}
              </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}