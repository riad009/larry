// import React from "react";
// import VineyardCard from "@/components/VineyardCard";
// import { Button } from "@/components/ui/button";
// import { Filter, Wine } from "lucide-react";
// import { VineyardExperience } from "@/types/vineyard";
//
// interface ResultsGridProps {
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
// export default function ResultsGrid({
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
// }: ResultsGridProps) {
//     const resultsExcludingSelected = filteredResults.filter((v) => !selectedVineyards.some((s) => s.id === v.id));
//
//     return (
//         <div className="flex-1">
//             <div className="mb-6">
//                 <h1 className="text-3xl font-bold text-white mb-2">Discover Vineyards</h1>
//                 <p className="text-zinc-100">Explore our curated selection of premium vineyard experiences</p>
//             </div>
//
//             {/* Results Meta count line: only after GO, X = area (Sub Region) base count */}
//             {hasSearched && areaTotalCount !== undefined && (
//                 <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
//                     <p className="text-zinc-100">
//                         <span className="text-white font-bold">{areaTotalCount}</span> vineyard{areaTotalCount !== 1 ? "s" : ""} in this area. Select up to 6 to view in Trip.
//                     </p>
//                     <button
//                         onClick={onClearFilters}
//                         className="px-4 py-2 text-sm text-white hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
//                     >
//                         Clear filters
//                     </button>
//                 </div>
//             )}
//
//             {/* Before GO: no results, no count, no top rated — only filter CTA */}
//             {!hasSearched && (
//                 <div className="text-center py-12">
//                     <div className="max-w-md mx-auto p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800">
//                         <div className="p-4 bg-zinc-800/50 rounded-2xl inline-block mb-4">
//                             <Filter className="w-12 h-12 text-zinc-600" />
//                         </div>
//                         <h3 className="text-xl font-bold text-white mb-2">Start Exploring</h3>
//                         <p className="text-zinc-400 mb-4">
//                             Set Area, Type, Cost, and Experience Type, then tap GO to see vineyard results
//                         </p>
//                         <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm">
//                             <Wine className="w-4 h-4" />
//                             <span>{items.length} vineyards available</span>
//                         </div>
//                     </div>
//                 </div>
//             )}
//
//             {/* Pinned: Selected for Trip (only when hasSearched and at least one selected) */}
//             {hasSearched && selectedVineyards.length > 0 && (
//                 <section className="mb-8">
//                     <h2 className="text-xl font-bold text-white mb-4">
//                         Selected for Trip ({selectedVineyards.length}/6)
//                     </h2>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
//                         {selectedVineyards.map((v) => (
//                             <div key={v.id} className="transform transition-transform duration-300 hover:scale-[1.02]">
//                                 <VineyardCard
//                                     vineyard={v}
//                                     loadOffers={loadOffers}
//                                     isSelected={true}
//                                     onAdd={() => onAddVineyard(v)}
//                                     onRemove={(id) => onRemoveVineyard(id)}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </section>
//             )}
//
//             {/* After GO: show results or empty state */}
//             {hasSearched && filteredResults.length === 0 && (
//                 <div className="text-center py-12">
//                     <div className="max-w-md mx-auto p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800">
//                         <div className="p-4 bg-zinc-800/50 rounded-2xl inline-block mb-4">
//                             <Wine className="w-12 h-12 text-zinc-600" />
//                         </div>
//                         <h3 className="text-xl font-bold text-white mb-2">No Matches Found</h3>
//                         <p className="text-zinc-400 mb-4">Try adjusting your filters and tap GO again</p>
//                         <Button
//                             onClick={onClearFilters}
//                             className="bg-zinc-800 hover:bg-zinc-700"
//                         >
//                             Reset All Filters
//                         </Button>
//                     </div>
//                 </div>
//             )}
//
//             {hasSearched && resultsExcludingSelected.length > 0 && (
//                 <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
//                     {resultsExcludingSelected.map((v) => (
//                         <div key={v.id} className="transform transition-transform duration-300 hover:scale-[1.02]">
//                             <VineyardCard
//                                 vineyard={v}
//                                 loadOffers={loadOffers}
//                                 isSelected={selectedVineyards.some((s) => s.id === v.id)}
//                                 onAdd={() => onAddVineyard(v)}
//                                 onRemove={(id) => onRemoveVineyard(id)}
//                             />
//                         </div>
//                     ))}
//                 </div>
//             )}
//
//             {/* Top rated in this area: same VineyardCard as main results, from topRatedInArea (up to 6) */}
//             {hasSearched && topRatedInArea.length > 0 && (
//                 <section className="mt-10 pt-8 border-t border-zinc-800">
//                     <h2 className="text-xl font-bold text-white mb-4">Top rated in this area</h2>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
//                         {topRatedInArea.map((v) => (
//                             <div key={v.id} className="transform transition-transform duration-300 hover:scale-[1.02]">
//                                 <VineyardCard
//                                     vineyard={v}
//                                     loadOffers={loadOffers}
//                                     isSelected={selectedVineyards.some((s) => s.id === v.id)}
//                                     onAdd={() => onAddVineyard(v)}
//                                     onRemove={(id) => onRemoveVineyard(id)}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </section>
//             )}
//         </div>
//     );
// }


import React, { useState } from "react";
import VineyardCard from "@/components/VineyardCard";
import CompactVineyardCard from "@/components/CompactVineyardCard";
import { Button } from "@/components/ui/button";
import { Filter, ChevronUp } from "lucide-react";
import { VineyardExperience } from "@/types/vineyard";

interface ResultsGridProps {
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

export default function ResultsGrid({
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
                                    }: ResultsGridProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <div className="flex-1">
            {showVineyardWarning && (
                <div className="mb-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                    <p className="text-amber-800 text-sm font-medium">Delete a selection to add a new one.</p>
                    {onDismissVineyardWarning && (
                        <button
                            type="button"
                            onClick={onDismissVineyardWarning}
                            className="text-amber-700 hover:text-amber-900 text-sm font-medium underline"
                        >
                            Dismiss
                        </button>
                    )}
                </div>
            )}
            {/*<div className="mb-6">*/}
            {/*    <h1 className="text-3xl font-bold text-white mb-2">Discover Vineyards</h1>*/}
            {/*    <p className="text-zinc-100">Explore our curated selection of premium vineyard experiences</p>*/}
            {/*</div>*/}

            {/* Results Meta */}
            {hasSearched && areaTotalCount !== undefined && (
                <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
                    <p className="text-black">
                        <span className="font-bold">{areaTotalCount}</span> vineyard{areaTotalCount !== 1 ? "s" : ""} in this area. Select up to 6.
                    </p>
                    <button onClick={onClearFilters} className="px-4 py-2 text-base text-black hover:bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg transition-colors">
                        Clear filters
                    </button>
                </div>
            )}

            {/* Empty State / Main Results */}
            {!hasSearched && (
                <div className="text-center py-12">
                    <div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-[#E0E0E0] shadow-sm">
                        <Filter className="w-12 h-12 text-black mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-black mb-2">Start Exploring</h3>
                        <p className="text-[#424242] text-base">Set filters and tap GO to see results</p>
                    </div>
                </div>
            )}

            {/* 1. Main Results Grid (capped at 6: filter → sort → exclude selected → slice in page) */}
            {hasSearched && mainGridResults.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                    {mainGridResults.map((v) => (
                        <div key={v.id} className="hover:scale-[1.02] transition-transform">
                            <VineyardCard
                                vineyard={v}
                                loadOffers={loadOffers}
                                isSelected={false}
                                onAdd={() => onAddVineyard(v)}
                                onRemove={onRemoveVineyard}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* 2. Empty state: only when no filtered results */}
            {hasSearched && filteredResults.length === 0 && (
                <div className="text-center py-6">
                    <p className="text-black text-base mb-3">No vineyards match your filters.</p>
                    <Button onClick={onClearFilters} className="bg-black text-white hover:bg-[#424242] border border-black">
                        Reset All Filters
                    </Button>
                </div>
            )}

            {hasSearched && selectedVineyards.length > 0 && (
                <section className="mb-10 py-8 border-t border-[#E0E0E0]">
                    <h2 className="text-xl font-bold text-black mb-4">
                        Selected for Trip ({selectedVineyards.length}/6)
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {selectedVineyards.map((v) => (
                            <div key={v.id}>
                                {expandedId === v.id ? (
                                    <div className="relative group">
                                        {/* Minimize Trigger */}
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
                                            onRemove={(id) => onRemoveVineyard(id)}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 3. Top Rated */}
            {hasSearched && topRatedInArea.length > 0 && (
                <section className="mt-10 pt-8 border-t border-[#E0E0E0]">
                    <h2 className="text-xl font-bold text-black mb-4">Top rated in this area</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {topRatedInArea.map((v) => (
                            <div key={v.id}>
                                <VineyardCard
                                    vineyard={v}
                                    loadOffers={loadOffers}
                                    isSelected={selectedVineyards.some((s) => s.id === v.id)}
                                    onAdd={() => onAddVineyard(v)}
                                    onRemove={onRemoveVineyard}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}