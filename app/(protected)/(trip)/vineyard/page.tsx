"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTripStore, useTripHydrationStore } from "@/store/tripStore";
import { mapVineyardDoc } from "@/utils/mappers";
import { filterVineyardsByActiveFilters, getTopRatedInArea } from "@/utils/vineyardFilters";
import {
    LoadingSkeleton,
    DesktopFiltersSidebar,
    MobileFilterControls,
    ResultsGrid,
    MobileResults
} from "@/components/vineyards";
import { VineyardExperience, VineyardFilters } from "@/types/vineyard";

const FILTERS_STORAGE_KEY = "smartRoute:vineyards:filters";

const initialPendingFilters: VineyardFilters = {
    selectedArea: "",
    selectedType: "",
    selectedCostBucket: "",
    selectedExperienceType: "",
    searchText: "",
};

function loadFiltersFromStorage(): {
    pendingFilters: VineyardFilters;
    activeFilters: VineyardFilters | null;
    hasSearched: boolean;
} {
    if (typeof window === "undefined") {
        return { pendingFilters: { ...initialPendingFilters }, activeFilters: null, hasSearched: false };
    }
    try {
        const raw = localStorage.getItem(FILTERS_STORAGE_KEY);
        if (!raw) return { pendingFilters: { ...initialPendingFilters }, activeFilters: null, hasSearched: false };
        const parsed = JSON.parse(raw);
        const pf = parsed.pendingFilters && typeof parsed.pendingFilters === "object" ? parsed.pendingFilters : null;
        const pendingFilters: VineyardFilters = pf
            ? {
                selectedArea: String(pf.selectedArea ?? ""),
                selectedType: String(pf.selectedType ?? ""),
                selectedCostBucket: String(pf.selectedCostBucket ?? ""),
                selectedExperienceType: String(pf.selectedExperienceType ?? ""),
                searchText: String(pf.searchText ?? ""),
            }
            : { ...initialPendingFilters };
        const af = parsed.activeFilters && typeof parsed.activeFilters === "object" ? parsed.activeFilters : null;
        const activeFilters: VineyardFilters | null = af
            ? {
                selectedArea: String(af.selectedArea ?? ""),
                selectedType: String(af.selectedType ?? ""),
                selectedCostBucket: String(af.selectedCostBucket ?? ""),
                selectedExperienceType: String(af.selectedExperienceType ?? ""),
                searchText: String(af.searchText ?? ""),
            }
            : null;
        const hasSearched = typeof parsed.hasSearched === "boolean" ? parsed.hasSearched : false;
        return {
            pendingFilters,
            activeFilters: hasSearched ? activeFilters : null,
            hasSearched,
        };
    } catch {
        return { pendingFilters: { ...initialPendingFilters }, activeFilters: null, hasSearched: false };
    }
}

export default function VineyardPage() {
    const hasHydrated = useTripHydrationStore((s) => s.hasHydrated);
    const { region: storeRegion, subRegion: storeSubRegion, vineyards: selectedVineyards, addVineyard, removeVineyard, setVineyards } = useTripStore();
    const { region, subRegion } = useTripStore();
    const [showVineyardWarning, setShowVineyardWarning] = useState(false);
    const resultsSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (showVineyardWarning && resultsSectionRef?.current) {
            resultsSectionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [showVineyardWarning]);

    const [items, setItems] = useState<VineyardExperience[]>([]);
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false); // Test

    const [filterState, setFilterState] = useState(loadFiltersFromStorage);
    const pendingFilters = filterState.pendingFilters;
    const setPendingFilters = (updater: VineyardFilters | ((prev: VineyardFilters) => VineyardFilters)) => {
        setFilterState((prev) => ({
            ...prev,
            pendingFilters: typeof updater === "function" ? updater(prev.pendingFilters) : updater,
        }));
    };
    const activeFilters = filterState.activeFilters;
    const setActiveFilters = (v: VineyardFilters | null) => {
        setFilterState((prev) => ({ ...prev, activeFilters: v }));
    };
    const hasSearched = filterState.hasSearched;
    const setHasSearched = (v: boolean) => {
        setFilterState((prev) => ({ ...prev, hasSearched: v }));
    };

    const [validationError, setValidationError] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch("/api/vineyards");
                const data = await res.json();
                const mappedData = data.map(mapVineyardDoc);
                setItems(mappedData);
                setDataLoaded(true);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        if (storeSubRegion?.name && !pendingFilters.selectedArea) {
            setPendingFilters((prev) => ({ ...prev, selectedArea: storeSubRegion.name }));
        }
    }, [storeSubRegion?.name]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(
                FILTERS_STORAGE_KEY,
                JSON.stringify({
                    pendingFilters,
                    activeFilters,
                    hasSearched,
                })
            );
        }
    }, [pendingFilters, activeFilters, hasSearched]);

    // Restore selected vineyards from localStorage on mount
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const raw = localStorage.getItem("smartRoute:vineyards:selected");
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed) || parsed.length === 0) return;
            const list = parsed.slice(0, 6).filter((x: unknown) => x && typeof x === "object" && "id" in x && typeof (x as { id: unknown }).id === "string");
            if (list.length > 0) setVineyards(list as VineyardExperience[]);
        } catch (_) {}
    }, [setVineyards]);

    const filteredResults = useMemo(() => {
        if (!hasSearched || !activeFilters) return [];
        const filtered = filterVineyardsByActiveFilters(items, activeFilters);
        // Default sort: LIST/G (rating) desc, then LIST/Vineyard (name) asc. Treat blank rating as -1.
        return [...filtered].sort((a, b) => {
            const ra = typeof a.rating === "number" && !Number.isNaN(a.rating) ? a.rating : -1;
            const rb = typeof b.rating === "number" && !Number.isNaN(b.rating) ? b.rating : -1;
            if (rb !== ra) return rb - ra;
            const na = (a.name ?? "").trim().toLowerCase();
            const nb = (b.name ?? "").trim().toLowerCase();
            return na.localeCompare(nb);
        });
    }, [items, hasSearched, activeFilters]);

    // Main grid: filter → sort (above) → exclude selected → slice to 6. Order must not change.
    const mainGridResults = useMemo(() => {
        const excluded = filteredResults.filter(
            (v) => !selectedVineyards.some((s) => s.id === v.id)
        );
        return excluded.slice(0, 6);
    }, [filteredResults, selectedVineyards]);

    // Area-scoped base count for meta line (Sub Region only, no type/cost/experience/search)
    const areaTotalCount = useMemo(() => {
        if (!hasSearched || !activeFilters?.selectedArea) return undefined;
        return items.filter((row) => (row.subRegion ?? "").trim() === activeFilters.selectedArea.trim()).length;
    }, [items, hasSearched, activeFilters?.selectedArea]);

    // Top 6 in area only (ignores Type, Cost, Experience, Search). Shown only after GO when area has matches.
    const topRatedInArea = useMemo(() => {
        if (!hasSearched || !activeFilters?.selectedArea) return [];
        return getTopRatedInArea(items, activeFilters.selectedArea);
    }, [items, hasSearched, activeFilters?.selectedArea]);

    const handleGo = () => {
        setValidationError(null);
        const { selectedArea, selectedType, selectedCostBucket, selectedExperienceType } = pendingFilters;
        if (!selectedArea?.trim()) {
            setValidationError("Please select an Area.");
            return;
        }
        if (!selectedType?.trim()) {
            setValidationError("Please select a Type.");
            return;
        }
        if (!selectedCostBucket?.trim()) {
            setValidationError("Please select a Cost range.");
            return;
        }
        // "All" (value "") is valid; no validation required for experience type
        setActiveFilters({ ...pendingFilters });
        setHasSearched(true);
    };

    const handleClearFilters = () => {
        setFilterState({
            pendingFilters: { ...initialPendingFilters },
            activeFilters: null,
            hasSearched: false,
        });
        setValidationError(null);
        if (typeof window !== "undefined") {
            localStorage.removeItem(FILTERS_STORAGE_KEY);
        }
    };

    const handleAddVineyard = (v: VineyardExperience) => {
        if (selectedVineyards.length >= 6) {
            setShowVineyardWarning(true);
            return;
        }
        setShowVineyardWarning(false);
        addVineyard(v);
    };

    const handleRemoveVineyard = (id: string) => {
        setShowVineyardWarning(false);
        removeVineyard(id);
    };

    const loadOffers = async (id: string) => {
        const res = await fetch(`/api/vineyard-offers?vineyardId=${id}`);
        return res.json();
    };

    // Area dropdown: only Sub Regions belonging to the selected Region. Wait for store rehydration so storeRegion is available.
    const areas = useMemo(() => {
        if (!hasHydrated) return [];
        if (!storeRegion?.name) return [];
        const regionMatch = items.filter((row) => row.region === storeRegion.name);
        const subRegions = regionMatch.map((i) => i.subRegion).filter(Boolean);
        return [...new Set(subRegions)].sort();
    }, [hasHydrated, items, storeRegion?.name]);

    // When region or area list changes, reset selectedArea if it's no longer valid TEST
    // useEffect(() => {
    //     if (!storeRegion?.name && pendingFilters.selectedArea) {
    //         setPendingFilters((prev) => ({ ...prev, selectedArea: "" }));
    //         return;
    //     }
    //     if (areas.length === 0) return;
    //     if (pendingFilters.selectedArea && !areas.includes(pendingFilters.selectedArea)) {
    //         setPendingFilters((prev) => ({ ...prev, selectedArea: "" }));
    //     }
    // }, [storeRegion?.name, areas, pendingFilters.selectedArea]);
    //
    // if (loading) {
    //     return <LoadingSkeleton />;
    // }



    // FIXED EFFECT:
    useEffect(() => {
        // 1. If we haven't finished loading data yet, do NOT reset the filters.
        if (!dataLoaded) return;

        // 2. If the user cleared the region, then clear the area.
        if (!storeRegion?.name && pendingFilters.selectedArea) {
            setPendingFilters((prev) => ({ ...prev, selectedArea: "" }));
            return;
        }

        // 3. ONLY reset if the data is fully loaded, there are areas available,
        // AND the current selection is genuinely invalid.
        if (areas.length > 0 && pendingFilters.selectedArea && !areas.includes(pendingFilters.selectedArea)) {
            setPendingFilters((prev) => ({ ...prev, selectedArea: "" }));
        }
    }, [storeRegion?.name, areas, pendingFilters.selectedArea, dataLoaded]);

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (!hasHydrated) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="min-h-screen text-black bg-white p-4 md:p-6 lg:p-8">
            <div className="hidden md:block max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    <div className="lg:w-80 xl:w-96 flex-shrink-0">
                        <DesktopFiltersSidebar
                            pendingFilters={pendingFilters}
                            setPendingFilters={setPendingFilters}
                            areas={areas}
                            items={items}
                            selectedVineyards={selectedVineyards}
                            onGo={handleGo}
                            onClearFilters={handleClearFilters}
                            validationError={validationError}
                            selectedRegion={storeRegion}
                            selectedSubRegion={storeSubRegion}
                        />
                    </div>
                    <div className="flex-1">
                        <ResultsGrid
                            items={items}
                            filteredResults={filteredResults}
                            mainGridResults={mainGridResults}
                            hasSearched={hasSearched}
                            areaTotalCount={areaTotalCount}
                            topRatedInArea={topRatedInArea}
                            selectedVineyards={selectedVineyards}
                            onAddVineyard={handleAddVineyard}
                            onRemoveVineyard={handleRemoveVineyard}
                            loadOffers={loadOffers}
                            onClearFilters={handleClearFilters}
                            showVineyardWarning={showVineyardWarning}
                            onDismissVineyardWarning={() => setShowVineyardWarning(false)}
                        />
                    </div>
                </div>
            </div>

            <div className="md:hidden flex flex-col items-center w-full">
                <MobileFilterControls
                    pendingFilters={pendingFilters}
                    setPendingFilters={setPendingFilters}
                    areas={areas}
                    items={items}
                    selectedVineyards={selectedVineyards}
                    onGo={handleGo}
                    onClearFilters={handleClearFilters}
                    validationError={validationError}
                    selectedRegion={region}
                    selectedSubRegion={subRegion}
                />
                <div ref={resultsSectionRef} className="w-full min-w-0 max-w-full">
                <MobileResults
                    items={items}
                    filteredResults={filteredResults}
                    mainGridResults={mainGridResults}
                    hasSearched={hasSearched}
                    areaTotalCount={areaTotalCount}
                    topRatedInArea={topRatedInArea}
                    selectedVineyards={selectedVineyards}
                    onAddVineyard={handleAddVineyard}
                    onRemoveVineyard={handleRemoveVineyard}
                    loadOffers={loadOffers}
                    onClearFilters={handleClearFilters}
                    showVineyardWarning={showVineyardWarning}
                    onDismissVineyardWarning={() => setShowVineyardWarning(false)}
                />
                </div>
            </div>
        </div>
    );
}
