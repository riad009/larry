import React, { useEffect } from "react";
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
interface MobileFilterControlsProps {
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

export default function MobileFilterControls({
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
}: MobileFilterControlsProps) {
    const update = (key: keyof VineyardFilters, value: string) => {
        setPendingFilters((prev) => ({ ...prev, [key]: value }));
    };

    // Area options are region-scoped from parent (only Sub Regions for selected Region). No fallback.
    const areaOptions = areas;
    const regionFilteredItems = selectedRegion?.name
        ? items.filter((v) => v.region === selectedRegion.name)
        : items;
    const hasVineyardsInRegion = regionFilteredItems.length > 0;

    useEffect(() => {
        if (selectedSubRegion?.name && !pendingFilters.selectedArea) {
            setPendingFilters((prev) => ({ ...prev, selectedArea: selectedSubRegion.name }));
        }
    }, [selectedSubRegion?.name]);

    if (!hasVineyardsInRegion && selectedRegion) {
        return (
            <div className="w-full max-w-sm p-6 bg-white rounded-3xl mb-6 border border-[#E0E0E0] shadow-sm">
                <div className="text-center">
                    <div className="p-2 bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg inline-block mb-4">
                        <Filter className="w-5 h-5 text-black" />
                    </div>
                    <h2 className="text-base font-bold text-black mb-2">No Vineyards Available</h2>
                    <p className="text-sm text-[#424242] mb-2">No vineyards found in</p>
                    <p className="text-base font-bold text-black mb-4">{selectedRegion?.name || "selected region"}</p>
                    <p className="text-sm text-[#424242]">Please select a different region</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-sm p-4 bg-white rounded-3xl mb-6 border border-[#E0E0E0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-black" />
                    <h2 className="text-sm font-bold text-black uppercase tracking-wider">Vineyard Filter</h2>
                </div>
                <div className="flex items-center gap-2">
                    {selectedRegion && (
                        <span className="text-xs text-black bg-[#F5F5F5] border border-[#E0E0E0] px-2 py-1 rounded">
                            {selectedRegion.name}
                        </span>
                    )}
                    <button
                        onClick={onClearFilters}
                        className="text-sm text-[#424242] hover:text-black"
                    >
                        Clear
                    </button>
                </div>
            </div>

            <div className="space-y-3 mb-4">
                <div>
                    <label className="text-sm font-bold text-black uppercase ml-1 mb-1 block">Area *</label>
                    <select
                        value={pendingFilters.selectedArea}
                        onChange={(e) => update("selectedArea", e.target.value)}
                        disabled={areaOptions.length === 0}
                        className="w-full bg-white border border-[#E0E0E0] p-2 rounded-lg text-base h-10 outline-none hover:border-[#9E9E9E] focus:border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="">{areaOptions.length === 0 ? "Select a region first" : "Select Area"}</option>
                        {areaOptions.map((a) => (
                            <option key={a} value={a}>
                                {a}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-sm font-bold text-black uppercase ml-1 mb-1 block">Type *</label>
                    <select
                        value={pendingFilters.selectedType}
                        onChange={(e) => update("selectedType", e.target.value)}
                        className="w-full bg-white border border-[#E0E0E0] p-2 rounded-lg text-base h-10 outline-none hover:border-[#9E9E9E] focus:border-black transition-colors"
                    >
                        <option value="">Select Type</option>
                        {VINEYARD_TYPE_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-sm font-bold text-black uppercase ml-1 mb-1 block">Cost *</label>
                    <select
                        value={pendingFilters.selectedCostBucket}
                        onChange={(e) => update("selectedCostBucket", e.target.value)}
                        className="w-full bg-white border border-[#E0E0E0] p-2 rounded-lg text-base h-10 outline-none hover:border-[#9E9E9E] focus:border-black transition-colors"
                    >
                        <option value="">Select Cost</option>
                        {VINEYARD_COST_BUCKET_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-sm font-bold text-black uppercase ml-1 mb-1 block">Experience Type *</label>
                    <select
                        value={pendingFilters.selectedExperienceType}
                        onChange={(e) => update("selectedExperienceType", e.target.value)}
                        className="w-full bg-white border border-[#E0E0E0] p-2 rounded-lg text-base h-10 outline-none hover:border-[#9E9E9E] focus:border-black transition-colors"
                    >
                        <option value="">All</option>
                        {VINEYARD_EXPERIENCE_TYPE_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {validationError && (
                <p className="mb-2 text-sm text-black border border-[#E0E0E0] bg-[#F5F5F5] px-3 py-2 rounded-lg" role="alert">
                    {validationError}
                </p>
            )}

            <div className="flex gap-3">
                <Button
                    onClick={onGo}
                    disabled={
                        !pendingFilters.selectedArea ||
                        !pendingFilters.selectedType ||
                        !pendingFilters.selectedCostBucket
                    }
                    className="flex-1 font-bold h-12 rounded-xl transition-all duration-300 shadow-sm bg-black text-white hover:bg-[#424242] border border-black"
                >
                    GO
                </Button>
                <Link
                    href="/lunch"
                    className={`flex-1 ${selectedVineyards.length === 0 ? "pointer-events-none" : ""}`}
                >
                    <Button
                        disabled={selectedVineyards.length === 0}
                        className={`w-full font-bold h-12 rounded-xl transition-all shadow-sm border ${
                            selectedVineyards.length > 0
                                ? "bg-white text-black hover:bg-[#F5F5F5] border-[#E0E0E0]"
                                : "bg-[#F5F5F5] text-[#424242] opacity-50 cursor-not-allowed border-[#E0E0E0]"
                        }`}
                    >
                        NEXT
                        <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
