// components/Lunch/MobileResultsList.tsx
import React, { useState } from "react";
import LunchCard from "@/components/LunchCard";
import CompactLunchCard from "@/components/CompactLunchCard";
import { LunchExperience } from "@/types/lunch";
import { Filter, Utensils, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileResultsListProps {
    appliedFilters: {
        area: string;
        type: string;
        cost: string;
    } | null;
    filteredResults: LunchExperience[];
    filteredResultsCount: number;
    mainGridResults: LunchExperience[];
    areaTotalCount: number | undefined;
    topRatedInArea: LunchExperience[];
    items: LunchExperience[];
    selectedLunches: LunchExperience[];
    error: string | null;
    loading: boolean;
    showLunchWarning?: boolean;
    onDismissLunchWarning?: () => void;
    onClearFilters: () => void;
    onAddLunch: (lunch: LunchExperience) => void;
    onRemoveLunch: (id: string) => void;
    onRetry?: () => void;
}

export default function MobileResultsList({
                                              appliedFilters,
                                              filteredResults,
                                              filteredResultsCount,
                                              mainGridResults,
                                              areaTotalCount,
                                              topRatedInArea,
                                              items,
                                              selectedLunches,
                                              error,
                                              loading,
                                              showLunchWarning,
                                              onDismissLunchWarning,
                                              onClearFilters,
                                              onAddLunch,
                                              onRemoveLunch,
                                              onRetry,
                                          }: MobileResultsListProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    if (loading) {
        return null; // Loading handled by LoadingSkeleton
    }

    return (
        <div className="w-full px-4 pb-20 space-y-4">
            {showLunchWarning && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-2">
                    <p className="text-amber-800 text-sm font-medium">Delete a selection to add a new one.</p>
                    {onDismissLunchWarning && (
                        <button
                            type="button"
                            onClick={onDismissLunchWarning}
                            className="text-amber-700 hover:text-amber-900 text-sm font-medium underline shrink-0"
                        >
                            Dismiss
                        </button>
                    )}
                </div>
            )}
            {/* Error State - match Vineyard light */}
            {error && (
                <div className="text-center py-8">
                    <div className="p-6 rounded-2xl bg-white border border-[#E0E0E0] shadow-sm">
                        <Utensils className="w-12 h-12 text-red-600 mx-auto mb-3" />
                        <p className="text-[#424242] text-sm mb-2">{error}</p>
                        <p className="text-[#424242] text-xs">Please try refreshing the page</p>
                    </div>
                </div>
            )}

            {/* No Filters Applied State */}
            {!error && !appliedFilters && (
                <div className="text-center py-8">
                    <div className="w-full p-6 rounded-3xl bg-white border border-[#E0E0E0] shadow-sm">
                        <Filter className="w-10 h-10 text-black mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-black mb-2">Start Exploring</h3>
                        <p className="text-[#424242] text-base mb-4">Set filters and tap GO to see results</p>
                        <div className="flex items-center justify-center gap-2 text-[#424242] text-sm">
                            <Utensils className="w-3 h-3" />
                            <span>{items.length} restaurants available</span>
                        </div>
                    </div>
                </div>
            )}

            {/* No Results State */}
            {!error && appliedFilters && filteredResults.length === 0 && (
                <div className="text-center py-8">
                    <div className="w-full p-6 rounded-3xl bg-white border border-[#E0E0E0] shadow-sm">
                        <Utensils className="w-10 h-10 text-black mx-auto mb-4" />
                        <p className="text-black text-base mb-4">No restaurants match these criteria</p>
                        <Button onClick={onClearFilters} className="bg-black text-white text-base mt-4 border border-black">Reset Filters</Button>
                    </div>
                </div>
            )}

            {/* Results Meta + Main grid (max 6, exclude selected) - match Vineyard */}
            {!error && appliedFilters && mainGridResults.length > 0 && (
                <>
                    <div className="mb-6 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <p className="text-[#424242] text-base">
                                <span className="text-black font-bold">{mainGridResults.length}</span> of <span className="font-bold">{filteredResultsCount}</span> restaurants
                            </p>
                            <button
                                onClick={onClearFilters}
                                className="px-3 py-1.5 text-sm text-black hover:bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg transition-colors"
                            >
                                Clear filters
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4 mb-10">
                        {mainGridResults.map((r) => (
                            <LunchCard
                                key={r.id}
                                lunch={r}
                                className="mb-4"
                                isSelected={false}
                                onAdd={() => onAddLunch(r)}
                                onRemove={() => onRemoveLunch(r.id)}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Selected for Trip - compact by default, click to expand, one at a time (match Vineyard) */}
            {appliedFilters && selectedLunches.length > 0 && (
                <section className="mb-10 py-6 border-t border-[#E0E0E0]">
                    <h2 className="text-lg font-bold text-black mb-4">
                        Selected for Trip ({selectedLunches.length}/3)
                    </h2>
                    <div className="space-y-4">
                        {selectedLunches.map((r) => (
                            <div key={r.id}>
                                {expandedId === r.id ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => setExpandedId(null)}
                                            className="absolute top-4 right-4 z-10 bg-black p-2 rounded-full text-white border border-[#E0E0E0] shadow-md"
                                        >
                                            <ChevronUp className="w-4 h-4" />
                                        </button>
                                        <LunchCard
                                            lunch={r}
                                            isSelected={true}
                                            onAdd={() => onAddLunch(r)}
                                            onRemove={() => {
                                                onRemoveLunch(r.id);
                                                setExpandedId(null);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div onClick={() => setExpandedId(r.id)} className="cursor-pointer">
                                        <CompactLunchCard
                                            lunch={r}
                                            isSelected={true}
                                            onAdd={() => onAddLunch(r)}
                                            onRemove={(id) => onRemoveLunch(id)}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Top rated in this area - match Vineyard */}
            {appliedFilters && topRatedInArea.length > 0 && (
                <section className="mt-8 pt-6 border-t border-[#E0E0E0]">
                    <h2 className="text-lg font-bold text-black mb-4">Top rated in this area</h2>
                    <div className="space-y-4">
                        {topRatedInArea.map((r) => (
                            <LunchCard
                                key={r.id}
                                lunch={r}
                                className="mb-4"
                                isSelected={selectedLunches.some((l) => l.id === r.id)}
                                onAdd={() => onAddLunch(r)}
                                onRemove={() => onRemoveLunch(r.id)}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}