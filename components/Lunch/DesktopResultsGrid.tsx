// components/Lunch/DesktopResultsGrid.tsx
import React, { useState } from "react";
import LunchCard from "@/components/LunchCard";
import CompactLunchCard from "@/components/CompactLunchCard";
import { LunchExperience } from "@/types/lunch";
import { Filter, Utensils, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DesktopResultsGridProps {
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
    showLunchWarning?: boolean;
    onDismissLunchWarning?: () => void;
    onClearFilters: () => void;
    onAddLunch: (lunch: LunchExperience) => void;
    onRemoveLunch: (id: string) => void;
    onRetry?: () => void;
}

export default function DesktopResultsGrid({
                                               appliedFilters,
                                               filteredResults,
                                               filteredResultsCount,
                                               mainGridResults,
                                               areaTotalCount,
                                               topRatedInArea,
                                               items,
                                               selectedLunches,
                                               error,
                                               showLunchWarning,
                                               onDismissLunchWarning,
                                               onClearFilters,
                                               onAddLunch,
                                               onRemoveLunch,
                                               onRetry,
                                           }: DesktopResultsGridProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <div className="flex-1">
            {showLunchWarning && (
                <div className="mb-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                    <p className="text-amber-800 text-sm font-medium">Delete a selection to add a new one.</p>
                    {onDismissLunchWarning && (
                        <button
                            type="button"
                            onClick={onDismissLunchWarning}
                            className="text-amber-700 hover:text-amber-900 text-sm font-medium underline"
                        >
                            Dismiss
                        </button>
                    )}
                </div>
            )}

            {/* Results Meta - match Vineyard: mb-6, text-black, Clear button style */}
            <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
                {!appliedFilters ? (
                    <p className="text-black">
                        Select filters to discover from <span className="font-bold">{items.length}</span> restaurants
                    </p>
                ) : (
                    <p className="text-black">
                        Showing <span className="font-bold">{mainGridResults.length}</span> of <span className="font-bold">{filteredResultsCount}</span> restaurants
                    </p>
                )}
                {appliedFilters && (
                    <button
                        onClick={onClearFilters}
                        className="px-4 py-2 text-base text-black hover:bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg transition-colors"
                    >
                        Clear filters
                    </button>
                )}
            </div>

            {/* Content: order = main grid → selected section → top section (mirror Vineyard) */}
            {!appliedFilters ? (
                <NoFiltersState itemsCount={items.length} />
            ) : error ? (
                <ErrorState error={error} onRetry={onRetry} />
            ) : (
                <>
                    {/* No matches empty state */}
                    {filteredResults.length === 0 && (
                        <NoResultsState onClearFilters={onClearFilters} />
                    )}

                    {/* 1. Main results grid (max 6, exclude selected) */}
                    {mainGridResults.length > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 mb-10">
                            {mainGridResults.map((r) => (
                                <div
                                    key={r.id}
                                    className="transform transition-transform duration-300 hover:scale-[1.02]"
                                >
                                    <LunchCard
                                        lunch={r}
                                        isSelected={selectedLunches.some((l) => l.id === r.id)}
                                        onAdd={() => onAddLunch(r)}
                                        onRemove={() => onRemoveLunch(r.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 2. Selected for Trip - compact by default, click to expand, one at a time (match Vineyard) */}
                    {selectedLunches.length > 0 && (
                        <section className="mb-10 py-8 border-t border-[#E0E0E0]">
                            <h2 className="text-xl font-bold text-black mb-4">
                                Selected for Lunch ({selectedLunches.length}/3)
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                                {selectedLunches.map((r) => (
                                    <div key={r.id}>
                                        {expandedId === r.id ? (
                                            <div className="relative group">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setExpandedId(null);
                                                    }}
                                                    className="absolute top-4 right-4 z-10 bg-black p-2 rounded-full text-white hover:bg-[#424242] border border-[#E0E0E0] transition-colors"
                                                    title="Minimize"
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
                                            <div
                                                onClick={() => setExpandedId(r.id)}
                                                className="cursor-pointer"
                                            >
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

                    {/* 3. Top rated in this area (max 6) - match Vineyard */}
                    {topRatedInArea.length > 0 && (
                        <section className="mt-10 pt-8 border-t border-[#E0E0E0]">
                            <h2 className="text-xl font-bold text-black mb-4">Top rated in this area</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                                {topRatedInArea.map((r) => (
                                    <div key={r.id}>
                                        <LunchCard
                                            lunch={r}
                                            isSelected={selectedLunches.some((l) => l.id === r.id)}
                                            onAdd={() => onAddLunch(r)}
                                            onRemove={() => onRemoveLunch(r.id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </>
            )}
        </div>
    );
}

// Sub-components - match Vineyard empty/error state styling
function NoFiltersState({ itemsCount }: { itemsCount: number }) {
    return (
        <div className="text-center py-12">
            <div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-[#E0E0E0] shadow-sm">
                <Filter className="w-12 h-12 text-black mx-auto mb-4" />
                <h3 className="text-xl font-bold text-black mb-2">Start Exploring</h3>
                <p className="text-[#424242] text-base">Set filters and tap GO to see results</p>
                <div className="flex items-center justify-center gap-2 text-[#424242] text-sm mt-2">
                    <Utensils className="w-4 h-4" />
                    <span>{itemsCount} restaurants available</span>
                </div>
            </div>
        </div>
    );
}

function NoResultsState({ onClearFilters }: { onClearFilters: () => void }) {
    return (
        <div className="text-center py-12">
            <div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-[#E0E0E0] shadow-sm">
                <div className="p-4 bg-[#F5F5F5] rounded-2xl inline-block mb-4 border border-[#E0E0E0]">
                    <Utensils className="w-12 h-12 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">No Matches Found</h3>
                <p className="text-[#424242] mb-4">Try adjusting your filters and tap GO again</p>
                <Button onClick={onClearFilters} className="bg-black text-white hover:bg-[#424242] border border-black">
                    Reset All Filters
                </Button>
            </div>
        </div>
    );
}

function ErrorState({
                        error,
                        onRetry,
                    }: {
    error: string;
    onRetry?: () => void;
}) {
    return (
        <div className="text-center py-12">
            <div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-[#E0E0E0] shadow-sm">
                <div className="p-4 bg-red-500/10 rounded-2xl inline-block mb-4 border border-red-500/20">
                    <Utensils className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Error Loading Data</h3>
                <p className="text-[#424242] mb-4">{error}</p>
                <button
                    onClick={onRetry}
                    className="px-6 py-3 bg-black text-white hover:bg-[#424242] rounded-xl text-sm font-medium transition-colors border border-black"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
