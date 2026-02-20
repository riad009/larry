// components/transport/TransportFiltersSidebar.tsx
import { Filter, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TransportOption } from "@/types/transport";

interface TransportFiltersSidebarProps {
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
    onRemoveFilter: (key: "type" | "provider" | "cost") => void;
    typeOptions: Array<{ key: string; name: string }>;
    providerOptions: Array<{ key: string; name: string }>;
    costOptions: Array<{ key: string; name: string }>;
    selectedTransport: TransportOption | null;
}

export function TransportFiltersSidebar({
                                            filters,
                                            appliedFilters,
                                            hasActiveFilters,
                                            onFilterChange,
                                            onApplyFilters,
                                            onClearFilters,
                                            onRemoveFilter,
                                            typeOptions,
                                            providerOptions,
                                            costOptions,
                                            selectedTransport,
                                        }: TransportFiltersSidebarProps) {
    return (
        <div className="w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-6">
                <div className="p-6 bg-zinc-900 rounded-3xl border border-zinc-800 mb-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                            <Filter className="w-5 h-5 text-green-500" />
                        </div>
                        <h2 className="text-lg font-bold text-white">Filter Transport</h2>
                    </div>

                    {/* Filter Dropdowns */}
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2 block">
                                Type
                            </label>
                            <select
                                value={filters.type}
                                onChange={(e) => onFilterChange("type", e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-xl text-sm h-12 outline-none hover:border-zinc-600 focus:border-green-500 transition-colors"
                            >
                                {typeOptions.map((opt) => (
                                    <option key={opt.key} value={opt.key}>
                                        {opt.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2 block">
                                Provider
                            </label>
                            <select
                                value={filters.provider}
                                onChange={(e) => onFilterChange("provider", e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-xl text-sm h-12 outline-none hover:border-zinc-600 focus:border-green-500 transition-colors"
                            >
                                {providerOptions.map((opt) => (
                                    <option key={opt.key} value={opt.key}>
                                        {opt.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2 block">
                                Cost
                            </label>
                            <select
                                value={filters.cost}
                                onChange={(e) => onFilterChange("cost", e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-xl text-sm h-12 outline-none hover:border-zinc-600 focus:border-green-500 transition-colors"
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
                    <div className="flex gap-3 mt-8">
                        <Button
                            onClick={onApplyFilters}
                            disabled={!hasActiveFilters}
                            className={`flex-1 font-bold h-14 rounded-xl text-base transition-all duration-300 shadow-lg ${
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
                                className={`w-full font-bold h-14 rounded-xl text-base transition-all shadow-lg ${
                                    selectedTransport
                                        ? "bg-gradient-to-r from-white to-zinc-100 hover:from-zinc-100 hover:to-zinc-200 text-black opacity-100 hover:shadow-white/20"
                                        : "bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed"
                                }`}
                            >
                                CONTINUE
                                <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>

                    {/* Applied Filters */}
                    {appliedFilters && (
                        <div className="mt-6 pt-6 border-t border-zinc-800">
                            <p className="text-sm text-zinc-400 mb-3">Active Filters:</p>
                            <div className="flex flex-wrap gap-2">
                                {appliedFilters.type !== "ALL" && (
                                    <span className="px-3 py-2 bg-green-500/20 text-green-400 text-sm rounded-lg border border-green-500/30 flex items-center gap-2">
                    Type: {appliedFilters.type}
                                        <button
                                            onClick={() => onRemoveFilter("type")}
                                            className="hover:text-green-300"
                                        >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                                )}
                                {appliedFilters.provider !== "ALL" && (
                                    <span className="px-3 py-2 bg-blue-500/20 text-blue-400 text-sm rounded-lg border border-blue-500/30 flex items-center gap-2">
                    Provider: {appliedFilters.provider}
                                        <button
                                            onClick={() => onRemoveFilter("provider")}
                                            className="hover:text-blue-300"
                                        >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                                )}
                                {appliedFilters.cost !== "ALL" && (
                                    <span className="px-3 py-2 bg-amber-500/20 text-amber-400 text-sm rounded-lg border border-amber-500/30 flex items-center gap-2">
                    Price: {appliedFilters.cost}
                                        <button
                                            onClick={() => onRemoveFilter("cost")}
                                            className="hover:text-amber-300"
                                        >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                                )}
                            </div>
                            <button
                                onClick={onClearFilters}
                                className="mt-3 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Note: Need to import ChevronRight at the top
import { ChevronRight } from "lucide-react";