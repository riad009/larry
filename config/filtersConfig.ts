// config/filtersConfig.ts
export const SUBREGIONS: Record<string, string[]> = {
    Rhone: ["North Rhone", "South Rhone"],
    Champagne: ["Montagne de Reims", "Côte des Blancs"],
    Bordeaux: ["Left Bank", "Right Bank"],
};

export const TYPE_OPTIONS = [
    { key: "ALL", name: "Select Type" },
    { key: "Gastronomic", name: "Gastronomic" }, // ✅ from your example
    { key: "Bistro (French)", name: "Bistro (French)" },
    { key: "Traditional", name: "Traditional" },
    { key: "Restaurant / French", name: "Restaurant / French" },
    { key: "Wine Restaurant", name: "Wine Restaurant" },
    { key: "Bistrot", name: "Bistrot" },
];

export const COST_OPTIONS = [
    { key: "ALL", name: "Select Cost Range" },
    { key: "C1", name: "≤ €15" },
    { key: "C2", name: "≤ €35" },
    { key: "C3", name: "> €35" },
];
