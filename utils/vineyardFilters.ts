import { VineyardExperience, VineyardFilters } from "@/types/vineyard";

/**
 * Filters LIST rows by activeFilters. Used only after GO (hasSearched).
 * Cost: uses lowestCost; null/blank excluded. Experience: selected column must be true/non-empty.
 * Search: vineyard name or commune contains searchText (case-insensitive).
 */
export function filterVineyardsByActiveFilters(
    items: VineyardExperience[],
    activeFilters: VineyardFilters
): VineyardExperience[] {
    return items.filter((row) => {
        if (activeFilters.selectedArea && row.subRegion !== activeFilters.selectedArea) return false;
        if (activeFilters.selectedType && row.type !== activeFilters.selectedType) return false;

        const cost = row.lowestCost;
        if (cost == null || cost === undefined || (typeof cost === "number" && isNaN(cost))) return false;
        const numCost = Number(cost);
        switch (activeFilters.selectedCostBucket) {
            case "UNDER_25":
                if (numCost >= 25) return false;
                break;
            case "RANGE_25_40":
                if (numCost < 25 || numCost > 40) return false;
                break;
            case "RANGE_40_70":
                if (numCost <= 40 || numCost > 70) return false;
                break;
            case "OVER_70":
                if (numCost <= 70) return false;
                break;
            default:
                break;
        }

        if (activeFilters.selectedExperienceType) {
            const exp = row.experienceTypes?.[activeFilters.selectedExperienceType];
            if (!exp) return false;
        }

        const search = (activeFilters.searchText || "").trim();
        if (search) {
            const name = (row.name || "").toLowerCase();
            const commune = (row.commune || "").toLowerCase();
            const q = search.toLowerCase();
            if (!name.includes(q) && !commune.includes(q)) return false;
        }

        return true;
    });
}

/**
 * Top 6 vineyards in the selected Area/Sub Region only. Ignores Type, Cost, Experience Type, Search.
 * Ranking: LIST/G (rating) DESC, tie-break LIST/Rating (score) DESC, then LIST/Vineyard ASC. Blank = -1.
 */
export function getTopRatedInArea(
    listRows: VineyardExperience[],
    selectedArea: string
): VineyardExperience[] {
    const area = (selectedArea ?? "").trim();
    if (!area) return [];
    const byArea = listRows.filter((row) => (row.subRegion ?? "").trim() === area);
    const ratingSort = (v: VineyardExperience) =>
        typeof v.rating === "number" && !Number.isNaN(v.rating) ? v.rating : -1;
    const scoreSort = (v: VineyardExperience) =>
        typeof v.score === "number" && !Number.isNaN(v.score) ? v.score : -1;
    return [...byArea]
        .sort((a, b) => {
            const ra = ratingSort(a);
            const rb = ratingSort(b);
            if (rb !== ra) return rb - ra;
            const sa = scoreSort(a);
            const sb = scoreSort(b);
            if (sb !== sa) return sb - sa;
            const na = (a.name ?? "").trim().toLowerCase();
            const nb = (b.name ?? "").trim().toLowerCase();
            return na.localeCompare(nb);
        })
        .slice(0, 6);
}
