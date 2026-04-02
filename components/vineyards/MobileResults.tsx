// import React from "react";
// import VineyardCard from "@/components/VineyardCard";
// import { Filter, Wine } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { VineyardExperience } from "@/types/vineyard";
//
// interface MobileResultsProps {
//     items: VineyardExperience[];
//     filteredResults: VineyardExperience[];
//     hasSearched: boolean;
//     areaTotalCount: number | undefined;
//     topRatedInArea: VineyardExperience[];
//     selectedVineyards: VineyardExperience[];
//     onAddVineyard: (v: VineyardExperience) => void;
//     onRemoveVineyard: (id: string) => void;
//     loadOffers: (id: string) => Promise<any>;
//     onClearFilters: () => void;
// }
//
// export default function MobileResults({
//     items,
//     filteredResults,
//     hasSearched,
//     areaTotalCount,
//     topRatedInArea,
//     selectedVineyards,
//     onAddVineyard,
//     onRemoveVineyard,
//     loadOffers,
//     onClearFilters,
// }: MobileResultsProps) {
//     const resultsExcludingSelected = filteredResults.filter((v) => !selectedVineyards.some((s) => s.id === v.id));
//
//     return (
//         <div className="w-full max-w-sm space-y-4 pb-20">
//             {/* Before GO: no results list, no count */}
//             {!hasSearched && (
//                 <div className="text-center py-8">
//                     <div className="p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800 mb-4">
//                         <Filter className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
//                         <p className="text-zinc-400 text-sm mb-2">
//                             Set Area, Type, Cost, and Experience Type, then tap GO to see vineyards
//                         </p>
//                         <p className="text-zinc-500 text-xs">Found {items.length} vineyards in our database</p>
//                     </div>
//                 </div>
//             )}
//
//             {/* After GO, no matches */}
//             {hasSearched && filteredResults.length === 0 && (
//                 <div className="text-center py-8">
//                     <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
//                         <Wine className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
//                         <p className="text-zinc-400 text-sm mb-2">No vineyards match these criteria</p>
//                         <p className="text-zinc-500 text-xs mb-4">Try adjusting your filters and tap GO again</p>
//                         <Button onClick={onClearFilters} className="bg-zinc-800 hover:bg-zinc-700 text-sm">
//                             Reset filters
//                         </Button>
//                     </div>
//                 </div>
//             )}
//
//             {/* Results Meta count line: only after GO, X = area (Sub Region) base count */}
//             {hasSearched && areaTotalCount !== undefined && (
//                 <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
//                     <p className="text-sm text-zinc-400">
//                         <span className="font-bold text-white">{areaTotalCount}</span> vineyard{areaTotalCount !== 1 ? "s" : ""} in this area. Select up to 6 to view in Trip.
//                     </p>
//                     <button
//                         onClick={onClearFilters}
//                         className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
//                     >
//                         Clear all
//                     </button>
//                 </div>
//             )}
//
//             {/* Pinned: Selected for Trip */}
//             {hasSearched && selectedVineyards.length > 0 && (
//                 <section className="mb-6">
//                     <h2 className="text-lg font-bold text-white mb-3">
//                         Selected for Trip ({selectedVineyards.length}/6)
//                     </h2>
//                     {selectedVineyards.map((v) => (
//                         <VineyardCard
//                             key={v.id}
//                             vineyard={v}
//                             loadOffers={loadOffers}
//                             isSelected={true}
//                             onAdd={() => onAddVineyard(v)}
//                             onRemove={(id) => onRemoveVineyard(id)}
//                         />
//                     ))}
//                 </section>
//             )}
//
//             {/* Vineyard cards only after GO (main list, excluding selected to avoid duplicates) */}
//             {hasSearched &&
//                 resultsExcludingSelected.map((v) => (
//                     <VineyardCard
//                         key={v.id}
//                         vineyard={v}
//                         loadOffers={loadOffers}
//                         isSelected={selectedVineyards.some((s) => s.id === v.id)}
//                         onAdd={() => onAddVineyard(v)}
//                         onRemove={(id) => onRemoveVineyard(id)}
//                     />
//                 ))}
//
//             {/* Top rated in this area: same VineyardCard as main results, from topRatedInArea (up to 6) */}
//             {hasSearched && topRatedInArea.length > 0 && (
//                 <section className="mt-8 pt-6 border-t border-zinc-800">
//                     <h2 className="text-lg font-bold text-white mb-3">Top rated in this area</h2>
//                     {topRatedInArea.map((v) => (
//                         <VineyardCard
//                             key={v.id}
//                             vineyard={v}
//                             loadOffers={loadOffers}
//                             isSelected={selectedVineyards.some((s) => s.id === v.id)}
//                             onAdd={() => onAddVineyard(v)}
//                             onRemove={(id) => onRemoveVineyard(id)}
//                         />
//                     ))}
//                 </section>
//             )}
//         </div>
//     );
// }


// /src/components/MobileResults.tsx

"use client";

import React, { useState } from "react";
import VineyardCard from "@/components/VineyardCard";
import CompactVineyardCard from "@/components/CompactVineyardCard";
import { Button } from "@/components/ui/button";
import { Filter, Wine, ChevronUp } from "lucide-react";
import { VineyardExperience } from "@/types/vineyard";

interface MobileResultsProps {
    items: VineyardExperience[];
    filteredResults: VineyardExperience[];
    mainGridResults: VineyardExperience[];
    hasSearched: boolean;
    areaTotalCount: number | undefined;
    topRatedInArea: VineyardExperience[];
    selectedVineyards: VineyardExperience[];
    onAddVineyard: (v: VineyardExperience) => void;
    onRemoveVineyard: (id: string) => void;
    loadOffers: (id: string) => Promise<any>;
    onClearFilters: () => void;
    showVineyardWarning?: boolean;
    onDismissVineyardWarning?: () => void;
}

export default function MobileResults({
                                          items,
                                          filteredResults,
                                          mainGridResults,
                                          hasSearched,
                                          areaTotalCount,
                                          topRatedInArea,
                                          selectedVineyards,
                                          onAddVineyard,
                                          onRemoveVineyard,
                                          loadOffers,
                                          onClearFilters,
                                          showVineyardWarning,
                                          onDismissVineyardWarning,
                                      }: MobileResultsProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <div className="w-full px-4 pb-20">
            {showVineyardWarning && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-2 mb-4">
                    <p className="text-amber-800 text-sm font-medium">Delete a selection to add a new one.</p>
                    {onDismissVineyardWarning && (
                        <button
                            type="button"
                            onClick={onDismissVineyardWarning}
                            className="text-amber-700 hover:text-amber-900 text-sm font-medium underline shrink-0"
                        >
                            Dismiss
                        </button>
                    )}
                </div>
            )}
            {hasSearched && areaTotalCount !== undefined && (
                <div className="mb-6 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <p className="text-warm-gray text-base">
                            <span className="text-charcoal font-bold">{areaTotalCount}</span> vineyard{areaTotalCount !== 1 ? "s" : ""} in this area
                        </p>
                        <button
                            onClick={onClearFilters}
                            className="px-3 py-1.5 text-sm text-charcoal hover:bg-cream border border-warm-border rounded-lg transition-colors"
                        >
                            Clear filters
                        </button>
                    </div>
                    <p className="text-warm-gray text-sm">Select up to 6 to view in Trip.</p>
                </div>
            )}

            {!hasSearched ? (
                <div className="text-center py-8">
                    <div className="w-full p-6 rounded-3xl bg-white/70 backdrop-blur-sm border border-warm-border shadow-sm">
                        <Filter className="w-10 h-10 text-charcoal mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-charcoal mb-2">Start Exploring</h3>
                        <p className="text-warm-gray text-base mb-4">Set filters and tap GO to see results</p>
                        <div className="flex items-center justify-center gap-2 text-warm-gray text-sm">
                            <Wine className="w-3 h-3" />
                            <span>{items.length} vineyards available</span>
                        </div>
                    </div>
                </div>
            ) : filteredResults.length === 0 ? (
                <div className="text-center py-6">
                    <p className="text-charcoal text-base mb-3">No vineyards match your filters.</p>
                    <Button onClick={onClearFilters} className="gradient-cta text-white text-base border border-wine-500">Reset Filters</Button>
                </div>
            ) : (
                <div className="space-y-4 mb-10">
                    {mainGridResults.map((v) => (
                        <VineyardCard
                            key={v.id}
                            vineyard={v}
                            loadOffers={loadOffers}
                            isSelected={false}
                            onAdd={() => onAddVineyard(v)}
                            onRemove={onRemoveVineyard}
                        />
                    ))}
                </div>
            )}

            {hasSearched && selectedVineyards.length > 0 && (
                <section className="mb-10 py-6 border-t border-warm-border">
                    <h2 className="text-lg font-bold text-charcoal mb-4">
                        Selected for Trip ({selectedVineyards.length}/6)
                    </h2>
                    <div className="space-y-4">
                        {selectedVineyards.map((v) => (
                            <div key={v.id}>
                                {expandedId === v.id ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => setExpandedId(null)}
                                            className="absolute top-4 right-4 z-10 bg-black p-2 rounded-full text-white border border-warm-border shadow-md"
                                        >
                                            <ChevronUp className="w-4 h-4" />
                                        </button>
                                        <VineyardCard
                                            vineyard={v}
                                            loadOffers={loadOffers}
                                            isSelected={true}
                                            onAdd={() => onAddVineyard(v)}
                                            onRemove={(id) => {
                                                onRemoveVineyard(id);
                                                setExpandedId(null);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div onClick={() => setExpandedId(v.id)} className="cursor-pointer">
                                        <CompactVineyardCard
                                            vineyard={v}
                                            loadOffers={loadOffers}
                                            isSelected={true}
                                            onAdd={() => onAddVineyard(v)}
                                            onRemove={onRemoveVineyard}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {hasSearched && topRatedInArea.length > 0 && (
                <section className="mt-8 pt-6 border-t border-warm-border">
                    <h2 className="text-lg font-bold text-charcoal mb-4">Top rated in this area</h2>
                    <div className="space-y-4">
                        {topRatedInArea.map((v) => (
                            <VineyardCard
                                key={v.id}
                                vineyard={v}
                                loadOffers={loadOffers}
                                isSelected={selectedVineyards.some((s) => s.id === v.id)}
                                onAdd={() => onAddVineyard(v)}
                                onRemove={onRemoveVineyard}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}