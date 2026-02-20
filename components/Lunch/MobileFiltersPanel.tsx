// components/Lunch/MobileFiltersPanel.tsx
import React from "react";
import { Filter, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
interface FilterOption {
    key: string;
    name: string;
}

interface MobileFiltersPanelProps {
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
}

export default function MobileFiltersPanel({
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
                                           }: MobileFiltersPanelProps) {
    return (
        <div className="w-full max-w-sm p-4 bg-white rounded-3xl mb-6 border border-[#E0E0E0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-black" />
                    <h2 className="text-sm font-bold text-black uppercase tracking-wider">Lunch Filter</h2>
                </div>
                <button
                    onClick={onClearFilters}
                    className="text-sm text-[#424242] hover:text-black"
                >
                    Clear
                </button>
            </div>

            {/* Filter Row: Area, Cost, Type - match Vineyard mobile */}
            <div className="space-y-3 mb-4">
                <div>
                    <label className="text-sm font-bold text-black uppercase ml-1 mb-1 block">Area *</label>
                    <select
                        value={filters.area}
                        onChange={(e) => onFilterChange("area", e.target.value)}
                        className="w-full bg-white border border-[#E0E0E0] p-2 rounded-lg text-base h-10 outline-none hover:border-[#9E9E9E] focus:border-black transition-colors"
                    >
                        {subRegionOptions.map((opt) => (
                            <option key={opt.key} value={opt.key}>{opt.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-sm font-bold text-black uppercase ml-1 mb-1 block">Cost *</label>
                    <select
                        value={filters.cost}
                        onChange={(e) => onFilterChange("cost", e.target.value)}
                        className="w-full bg-white border border-[#E0E0E0] p-2 rounded-lg text-base h-10 outline-none hover:border-[#9E9E9E] focus:border-black transition-colors"
                    >
                        <option value="">Select Cost</option>
                        {costOptions.map((opt) => (
                            <option key={opt.key} value={opt.key}>{opt.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-sm font-bold text-black uppercase ml-1 mb-1 block">Type</label>
                    <select
                        value={filters.type}
                        onChange={(e) => onFilterChange("type", e.target.value)}
                        className="w-full bg-white border border-[#E0E0E0] p-2 rounded-lg text-base h-10 outline-none hover:border-[#9E9E9E] focus:border-black transition-colors"
                    >
                        {typeOptions.map((opt) => (
                            <option key={opt.key} value={opt.key}>{opt.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Action Buttons - match Vineyard mobile: GO black, NEXT white/gray */}
            <div className="flex gap-3">
                <Button
                    onClick={onApplyFilters}
                    disabled={!hasActiveFilters}
                    className="flex-1 font-bold h-12 rounded-xl transition-all duration-300 shadow-sm bg-black text-white hover:bg-[#424242] border border-black disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#F5F5F5] disabled:text-[#424242] disabled:border-[#E0E0E0]"
                >
                    GO
                </Button>

                <Link
                    href="/overview"
                    className={`flex-1 ${!hasSelectedLunch ? "pointer-events-none" : ""}`}
                >
                    <Button
                        disabled={!hasSelectedLunch}
                        className={`w-full font-bold h-12 rounded-xl transition-all shadow-sm border ${
                            hasSelectedLunch
                                ? "bg-white text-black hover:bg-[#F5F5F5] border-[#E0E0E0]"
                                : "bg-[#F5F5F5] text-[#424242] opacity-50 cursor-not-allowed border-[#E0E0E0]"
                        }`}
                    >
                        NEXT
                        <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                </Link>
            </div>

            {/* Applied Filters Indicator - light theme */}
            {appliedFilters && (
                <div className="mt-4 pt-4 border-t border-[#E0E0E0]">
                    <p className="text-xs text-[#424242] mb-2">Applied filters:</p>
                    <div className="flex flex-wrap gap-2">
                        {appliedFilters.area !== "ALL" && (
                            <span className="px-2 py-1 bg-[#F5F5F5] text-black text-xs rounded-lg border border-[#E0E0E0]">
                                Area: {appliedFilters.area}
                            </span>
                        )}
                        {appliedFilters.type !== "ALL" && (
                            <span className="px-2 py-1 bg-[#F5F5F5] text-black text-xs rounded-lg border border-[#E0E0E0]">
                                Type: {appliedFilters.type}
                            </span>
                        )}
                        {appliedFilters.cost !== "" && (
                            <span className="px-2 py-1 bg-[#F5F5F5] text-black text-xs rounded-lg border border-[#E0E0E0]">
                                {appliedFilters.cost}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}