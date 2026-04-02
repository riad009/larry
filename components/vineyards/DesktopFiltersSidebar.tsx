// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Filter, ChevronRight } from "lucide-react";
// import Link from "next/link";
// import { VineyardExperience, VineyardFilters } from "@/types/vineyard";
// import { Option } from "@/types/option";
// import {
//     VINEYARD_TYPE_OPTIONS,
//     VINEYARD_COST_BUCKET_OPTIONS,
//     VINEYARD_EXPERIENCE_TYPE_OPTIONS,
// } from "@/config/vineyardFiltersConfig";
// import { Input } from "@/components/ui/input";
//
// interface DesktopFiltersSidebarProps {
//     pendingFilters: VineyardFilters;
//     setPendingFilters: (f: VineyardFilters | ((prev: VineyardFilters) => VineyardFilters)) => void;
//     areas: string[];
//     items: VineyardExperience[];
//     selectedVineyards: VineyardExperience[];
//     onGo: () => void;
//     onClearFilters: () => void;
//     validationError: string | null;
//     selectedRegion: Option | null;
//     selectedSubRegion: Option | null;
// }
//
// export default function DesktopFiltersSidebar({
//     pendingFilters,
//     setPendingFilters,
//     areas,
//     items,
//     selectedVineyards,
//     onGo,
//     onClearFilters,
//     validationError,
//     selectedRegion,
//     selectedSubRegion,
// }: DesktopFiltersSidebarProps) {
//     const update = (key: keyof VineyardFilters, value: string) => {
//         setPendingFilters((prev) => ({ ...prev, [key]: value }));
//     };
//
//     // Area options are region-scoped from parent (only Sub Regions for selected Region). No fallback.
//     const areaOptions = areas;
//     const hasVineyardsInRegion = items.length > 0;
//
//     return (
//         <div className="sticky top-6">
//             <div className="p-6 bg-zinc-900 rounded-3xl border border-zinc-800 mb-6">
//                 <div className="flex items-center gap-3 mb-6">
//                     <div className="p-2 bg-green-500/20 rounded-lg">
//                         <Filter className="w-5 h-5 text-green-500" />
//                     </div>
//                     <h2 className="text-lg font-bold text-white">Filter Vineyards</h2>
//                     {selectedRegion && (
//                         <span className="ml-auto text-sm text-zinc-400 bg-zinc-800 px-3 py-1 rounded-lg">
//                             Region: {selectedRegion.name}
//                         </span>
//                     )}
//                 </div>
//
//                 {!hasVineyardsInRegion && selectedRegion && (
//                     <div className="text-center py-8">
//                         <p className="text-zinc-400 mb-2">No vineyards found in</p>
//                         <p className="text-lg font-bold text-white mb-4">{selectedRegion?.name || "selected region"}</p>
//                         <p className="text-sm text-zinc-500">Please select a different region</p>
//                     </div>
//                 )}
//
//                 {hasVineyardsInRegion && (
//                     <>
//                         <div className="space-y-6">
//                             <div>
//                                 <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2 block">
//                                     Area *
//                                 </label>
//                                 <select
//                                     value={pendingFilters.selectedArea}
//                                     onChange={(e) => update("selectedArea", e.target.value)}
//                                     disabled={areaOptions.length === 0}
//                                     className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-xl text-sm h-12 outline-none hover:border-zinc-600 focus:border-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                     <option value="">{areaOptions.length === 0 ? "Select a region first" : "Select Area"}</option>
//                                     {areaOptions.map((a) => (
//                                         <option key={a} value={a}>
//                                             {a}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//
//                             <div>
//                                 <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2 block">
//                                     Type *
//                                 </label>
//                                 <select
//                                     value={pendingFilters.selectedType}
//                                     onChange={(e) => update("selectedType", e.target.value)}
//                                     className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-xl text-sm h-12 outline-none hover:border-zinc-600 focus:border-green-500 transition-colors"
//                                 >
//                                     <option value="">Select Type</option>
//                                     {VINEYARD_TYPE_OPTIONS.map((o) => (
//                                         <option key={o.value} value={o.value}>
//                                             {o.label}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//
//                             <div>
//                                 <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2 block">
//                                     Cost *
//                                 </label>
//                                 <select
//                                     value={pendingFilters.selectedCostBucket}
//                                     onChange={(e) => update("selectedCostBucket", e.target.value)}
//                                     className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-xl text-sm h-12 outline-none hover:border-zinc-600 focus:border-green-500 transition-colors"
//                                 >
//                                     <option value="">Select Cost</option>
//                                     {VINEYARD_COST_BUCKET_OPTIONS.map((o) => (
//                                         <option key={o.value} value={o.value}>
//                                             {o.label}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//
//                             <div>
//                                 <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2 block">
//                                     Experience Type *
//                                 </label>
//                                 <select
//                                     value={pendingFilters.selectedExperienceType}
//                                     onChange={(e) => update("selectedExperienceType", e.target.value)}
//                                     className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-xl text-sm h-12 outline-none hover:border-zinc-600 focus:border-green-500 transition-colors"
//                                 >
//                                     <option value="">Select Experience Type</option>
//                                     {VINEYARD_EXPERIENCE_TYPE_OPTIONS.map((o) => (
//                                         <option key={o.value} value={o.value}>
//                                             {o.label}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//
//                             <div>
//                                 <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2 block">
//                                     Search Vineyards (optional)
//                                 </label>
//                                 <Input
//                                     type="text"
//                                     placeholder="Vineyard or commune..."
//                                     value={pendingFilters.searchText}
//                                     onChange={(e) => update("searchText", e.target.value)}
//                                     className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-xl text-sm h-12 text-white placeholder:text-zinc-500"
//                                 />
//                             </div>
//                         </div>
//
//                         {validationError && (
//                             <p className="mt-4 text-sm text-amber-400" role="alert">
//                                 {validationError}
//                             </p>
//                         )}
//
//                         <div className="flex gap-3 mt-8">
//                             <Button
//                                 onClick={onGo}
//                                 className="flex-1 font-bold h-14 rounded-xl text-base transition-all duration-300 shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 hover:shadow-green-500/20"
//                             >
//                                 GO
//                             </Button>
//                             <Link
//                                 href="/lunch"
//                                 className={`flex-1 ${selectedVineyards.length === 0 ? "pointer-events-none" : ""}`}
//                             >
//                                 <Button
//                                     disabled={selectedVineyards.length === 0}
//                                     className={`w-full font-bold h-14 rounded-xl text-base transition-all shadow-lg ${
//                                         selectedVineyards.length > 0
//                                             ? "bg-gradient-to-r from-white to-zinc-100 hover:from-zinc-100 hover:to-zinc-200 text-charcoal opacity-100 hover:shadow-white/20"
//                                             : "bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed"
//                                     }`}
//                                 >
//                                     CONTINUE
//                                     <ChevronRight className="ml-2 w-5 h-5" />
//                                 </Button>
//                             </Link>
//                         </div>
//
//                         <button
//                             onClick={onClearFilters}
//                             className="mt-6 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
//                         >
//                             Clear all filters
//                         </button>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }




import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, ChevronRight } from "lucide-react";
import Link from "next/link";
import { VineyardExperience, VineyardFilters } from "@/types/vineyard";
import { Option } from "@/types/option";
import {
    VINEYARD_TYPE_OPTIONS,
    VINEYARD_COST_BUCKET_OPTIONS,
    VINEYARD_EXPERIENCE_TYPE_OPTIONS,
} from "@/config/vineyardFiltersConfig";

interface DesktopFiltersSidebarProps {
    pendingFilters: VineyardFilters;
    setPendingFilters: (f: VineyardFilters | ((prev: VineyardFilters) => VineyardFilters)) => void;
    areas: string[];
    items: VineyardExperience[];
    selectedVineyards: VineyardExperience[];
    onGo: () => void;
    onClearFilters: () => void;
    validationError: string | null;
    selectedRegion: Option | null;
    selectedSubRegion: Option | null;
}

export default function DesktopFiltersSidebar({
                                                  pendingFilters,
                                                  setPendingFilters,
                                                  areas,
                                                  items,
                                                  selectedVineyards,
                                                  onGo,
                                                  onClearFilters,
                                                  validationError,
                                                  selectedRegion,
                                                  selectedSubRegion,
                                              }: DesktopFiltersSidebarProps) {
    const update = (key: keyof VineyardFilters, value: string) => {
        setPendingFilters((prev) => ({ ...prev, [key]: value }));
    };

    const hasVineyardsInRegion = items.length > 0;

    return (
        <div className="sticky top-6">
            <div className="p-6 glass-card rounded-3xl mb-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 gradient-wine-light rounded-lg">
                        <Filter className="w-5 h-5 text-wine-500" />
                    </div>
                    <h2 className="text-lg font-bold text-charcoal">Vineyard Filter</h2>
                    {selectedRegion && (
                        <span className="ml-auto text-sm text-wine-600 bg-wine-50 px-3 py-1 rounded-lg border border-wine-100">
                            Region: {selectedRegion.name}
                        </span>
                    )}
                </div>

                {!hasVineyardsInRegion && selectedRegion && (
                    <div className="text-center py-8">
                        <p className="text-warm-gray mb-2">No vineyards found in</p>
                        <p className="text-lg font-bold text-charcoal mb-4">{selectedRegion?.name || "selected region"}</p>
                        <p className="text-sm text-warm-gray">Please select a different region</p>
                    </div>
                )}

                {hasVineyardsInRegion && (
                    <>
                        <div className="space-y-6">
                            {/* Area Filter */}
                            <div>
                                <label className="text-sm font-bold text-wine-600 uppercase tracking-wider mb-2 block">
                                    Area *
                                </label>
                                <select
                                    value={pendingFilters.selectedArea}
                                    onChange={(e) => update("selectedArea", e.target.value)}
                                    className="w-full bg-white/80 border border-warm-border p-3 rounded-xl text-base h-12 text-charcoal outline-none hover:border-wine-200 focus:border-wine-500 focus:ring-2 focus:ring-wine-500/20 transition-colors"
                                >
                                    <option value="" className="text-warm-gray">
                                        {areas.length === 0 ? "Loading Areas..." : "Select Area"}
                                    </option>
                                    {pendingFilters.selectedArea && !areas.includes(pendingFilters.selectedArea) && (
                                        <option value={pendingFilters.selectedArea}>{pendingFilters.selectedArea}</option>
                                    )}
                                    {areas.map((a) => (
                                        <option key={a} value={a}>{a}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Type Filter */}
                            <div>
                                <label className="text-sm font-bold text-charcoal uppercase tracking-wider mb-2 block">
                                    Type *
                                </label>
                                <select
                                    value={pendingFilters.selectedType}
                                    onChange={(e) => update("selectedType", e.target.value)}
                                    className="w-full bg-white/70 backdrop-blur-sm border border-warm-border p-3 rounded-xl text-base h-12 text-charcoal outline-none hover:border-wine-200 focus:border-wine-500 focus:ring-2 focus:ring-wine-500/20 transition-colors"
                                >
                                    <option value="" className="text-warm-gray">Select Type</option>
                                    {VINEYARD_TYPE_OPTIONS.map((o) => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Cost Filter */}
                            <div>
                                <label className="text-sm font-bold text-charcoal uppercase tracking-wider mb-2 block">
                                    Cost *
                                </label>
                                <select
                                    value={pendingFilters.selectedCostBucket}
                                    onChange={(e) => update("selectedCostBucket", e.target.value)}
                                    className="w-full bg-white/70 backdrop-blur-sm border border-warm-border p-3 rounded-xl text-base h-12 text-charcoal outline-none hover:border-wine-200 focus:border-wine-500 focus:ring-2 focus:ring-wine-500/20 transition-colors"
                                >
                                    <option value="" className="text-warm-gray">Select Cost</option>
                                    {VINEYARD_COST_BUCKET_OPTIONS.map((o) => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Experience Filter */}
                            <div>
                                <label className="text-sm font-bold text-charcoal uppercase tracking-wider mb-2 block">
                                    Experience Type *
                                </label>
                                <select
                                    value={pendingFilters.selectedExperienceType}
                                    onChange={(e) => update("selectedExperienceType", e.target.value)}
                                    className="w-full bg-white/70 backdrop-blur-sm border border-warm-border p-3 rounded-xl text-base h-12 text-charcoal outline-none hover:border-wine-200 focus:border-wine-500 focus:ring-2 focus:ring-wine-500/20 transition-colors"
                                >
                                    <option value="" className="text-warm-gray">All</option>
                                    {VINEYARD_EXPERIENCE_TYPE_OPTIONS.map((o) => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {validationError && (
                            <p className="mt-4 text-sm text-wine-700 font-medium border border-wine-200 bg-wine-50 px-3 py-2 rounded-lg" role="alert">
                                {validationError}
                            </p>
                        )}

                        <div className="flex gap-3 mt-8">
                            <Button
                                onClick={onGo}
                                disabled={
                                    !pendingFilters.selectedArea ||
                                    !pendingFilters.selectedType ||
                                    !pendingFilters.selectedCostBucket
                                }
                                className="flex-1 font-bold h-14 rounded-xl text-base transition-all duration-300 shadow-sm gradient-cta text-white border-0"
                            >
                                GO
                            </Button>
                            <Link
                                href="/lunch"
                                className={`flex-1 ${selectedVineyards.length === 0 ? "pointer-events-none" : ""}`}
                            >
                                <Button
                                    disabled={selectedVineyards.length === 0}
                                    className={`w-full font-bold h-14 rounded-xl text-base transition-all shadow-sm border ${
                                        selectedVineyards.length > 0
                                            ? "bg-white/70 backdrop-blur-sm text-charcoal hover:bg-wine-50 border-warm-border"
                                            : "bg-cream text-warm-gray opacity-50 cursor-not-allowed border-warm-border"
                                    }`}
                                >
                                    CONTINUE
                                    <ChevronRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>

                        <button
                            onClick={onClearFilters}
                            className="mt-6 text-sm text-warm-gray hover:text-wine-600 transition-colors underline underline-offset-4"
                        >
                            Clear all filters
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}