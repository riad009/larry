// components/Lunch/DesktopFiltersSidebar.tsx
import React from "react";
import { Utensils, Filter, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
interface FilterOption {
    key: string;
    name: string;
}

interface DesktopFiltersSidebarProps {
    filters: {
        area: string;
        type: string;
        cost: string;
    };
    appliedFilters: {
        area: string;
        type: string;
        cost: string;
    } | null;
    subRegionOptions: FilterOption[];
    typeOptions: FilterOption[];
    costOptions: FilterOption[];
    hasActiveFilters: boolean;
    hasSelectedLunch: boolean;
    onFilterChange: (filterType: "area" | "type" | "cost", value: string) => void;
    onApplyFilters: () => void;
    onClearFilters: () => void;
                                onRemoveFilter: (filterType: "area" | "type" | "cost") => void;
    totalRestaurantsCount: number;
    areasCount: number;
    cuisineTypesCount: number;
}

export default function DesktopFiltersSidebar({
                                                  filters,
                                                  appliedFilters,
                                                  subRegionOptions,
                                                  typeOptions,
                                                  costOptions,
                                                  hasActiveFilters,
                                                  hasSelectedLunch,
                                                  onFilterChange,
                                                  onApplyFilters,
                                                  onClearFilters,
                                                  onRemoveFilter,
                                                  totalRestaurantsCount,
                                                  areasCount,
                                                  cuisineTypesCount,
                                              }: DesktopFiltersSidebarProps) {
    return (
        <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-6">
                {/* Main Filters Card - match Vineyard */}
                <div className="p-6 bg-white/70 backdrop-blur-sm rounded-3xl border border-warm-border mb-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-cream rounded-lg border border-warm-border">
                            <Filter className="w-5 h-5 text-charcoal" />
                        </div>
                        <h2 className="text-lg font-bold text-charcoal">Lunch Filter</h2>
                    </div>

                    <div className="space-y-6">
                        {/* Area Filter */}
                        <div>
                            <label className="text-sm font-bold text-charcoal uppercase tracking-wider mb-2 block">
                                Area *
                            </label>
                            <select
                                value={filters.area}
                                onChange={(e) => onFilterChange("area", e.target.value)}
                                className="w-full bg-white/70 backdrop-blur-sm border border-warm-border p-3 rounded-xl text-base h-12 text-charcoal outline-none hover:border-wine-200 focus:border-wine-500 focus:ring-2 focus:ring-wine-500/20 transition-colors"
                            >
                                {subRegionOptions.map((opt) => (
                                    <option key={opt.key} value={opt.key} className="text-warm-gray">
                                        {opt.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Cost Filter - required; no "ALL"; mirrors Vineyard Cost structure */}
                        <div>
                            <label className="text-sm font-bold text-charcoal uppercase tracking-wider mb-2 block">
                                Cost *
                            </label>
                            <select
                                value={filters.cost}
                                onChange={(e) => onFilterChange("cost", e.target.value)}
                                className="w-full bg-white/70 backdrop-blur-sm border border-warm-border p-3 rounded-xl text-base h-12 text-charcoal outline-none hover:border-wine-200 focus:border-wine-500 focus:ring-2 focus:ring-wine-500/20 transition-colors"
                            >
                                <option value="" className="text-warm-gray">Select Cost</option>
                                {costOptions.map((opt) => (
                                    <option key={opt.key} value={opt.key}>
                                        {opt.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Type Filter */}
                        <div>
                            <label className="text-sm font-bold text-charcoal uppercase tracking-wider mb-2 block">
                                Type
                            </label>
                            <select
                                value={filters.type}
                                onChange={(e) => onFilterChange("type", e.target.value)}
                                className="w-full bg-white/70 backdrop-blur-sm border border-warm-border p-3 rounded-xl text-base h-12 text-charcoal outline-none hover:border-wine-200 focus:border-wine-500 focus:ring-2 focus:ring-wine-500/20 transition-colors"
                            >
                                {typeOptions.map((opt) => (
                                    <option key={opt.key} value={opt.key}>
                                        {opt.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Action Buttons - match Vineyard: GO black, CONTINUE white/gray */}
                    <div className="flex gap-3 mt-8">
                        <Button
                            onClick={onApplyFilters}
                            disabled={!hasActiveFilters}
                            className="flex-1 font-bold h-14 rounded-xl text-base transition-all duration-300 shadow-sm gradient-cta text-white hover:bg-wine-700 border border-wine-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-cream disabled:text-warm-gray disabled:border-warm-border"
                        >
                            GO
                        </Button>

                        <Link
                            href="/overview"
                            className={`flex-1 ${!hasSelectedLunch ? "pointer-events-none" : ""}`}
                        >
                            <Button
                                disabled={!hasSelectedLunch}
                                className={`w-full font-bold h-14 rounded-xl text-base transition-all shadow-sm border ${
                                    hasSelectedLunch
                                        ? "bg-white/70 backdrop-blur-sm text-charcoal hover:bg-cream border-warm-border"
                                        : "bg-cream text-warm-gray opacity-50 cursor-not-allowed border-warm-border"
                                }`}
                            >
                                CONTINUE
                                <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>

                    {/* Applied Filters Indicator - match Vineyard light theme */}
                    {appliedFilters && (
                        <div className="mt-6 pt-6 border-t border-warm-border">
                            <p className="text-sm text-warm-gray mb-3">Active Filters:</p>
                            <div className="flex flex-wrap gap-2">
                                {appliedFilters.area !== "ALL" && (
                                    <span className="px-3 py-2 bg-cream text-charcoal text-sm rounded-lg border border-warm-border flex items-center gap-2">
                                        Area: {appliedFilters.area}
                                        <button
                                            onClick={() => onRemoveFilter("area")}
                                            className="hover:text-warm-gray"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {appliedFilters.type !== "ALL" && (
                                    <span className="px-3 py-2 bg-cream text-charcoal text-sm rounded-lg border border-warm-border flex items-center gap-2">
                                        Type: {appliedFilters.type}
                                        <button
                                            onClick={() => onRemoveFilter("type")}
                                            className="hover:text-warm-gray"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {appliedFilters.cost !== "" && (
                                    <span className="px-3 py-2 bg-cream text-charcoal text-sm rounded-lg border border-warm-border flex items-center gap-2">
                                        {costOptions.find((o) => o.key === appliedFilters.cost)?.name ?? appliedFilters.cost}
                                        <button
                                            onClick={() => onRemoveFilter("cost")}
                                            className="hover:text-warm-gray"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={onClearFilters}
                                className="mt-3 text-sm text-warm-gray hover:text-charcoal transition-colors underline underline-offset-4"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Stats Card (commented out in original) */}
                {/* Uncomment if you want to use it */}
                {false && (
                    <div className="p-6 bg-zinc-900 rounded-3xl border border-zinc-800">
                        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">
                            Database Stats
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-500">Total Restaurants</span>
                                <span className="text-white font-bold">{totalRestaurantsCount}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-500">Areas</span>
                                <span className="text-white font-bold">{areasCount}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-500">Cuisine Types</span>
                                <span className="text-white font-bold">{cuisineTypesCount}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}