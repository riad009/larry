// Vineyard Explore filter options (required fields). DB: LIST / Sub Region, Type, Lowest Cost (€), experience columns.

export const VINEYARD_TYPE_OPTIONS = [
    { value: "International", label: "International" },
    { value: "Boutique", label: "Boutique" },
    { value: "Growers", label: "Growers" },
] as const;

/** Cost buckets; DB: LIST / Lowest Cost (€). */
export const VINEYARD_COST_BUCKET_OPTIONS = [
    { value: "UNDER_25", label: "Under 25€" },
    { value: "RANGE_25_40", label: "25–40€" },
    { value: "RANGE_40_70", label: "40–70€" },
    { value: "OVER_70", label: "70€+" },
] as const;

/** Experience type options in exact display order. DB: LIST columns with these names. */
export const VINEYARD_EXPERIENCE_TYPE_OPTIONS = [
    { value: "Tasting Only", label: "Tasting Only" },
    { value: "Tour & Tasting", label: "Tour & Tasting" },
    { value: "Pairing & Lunch", label: "Pairing & Lunch" },
    { value: "Lunch", label: "Lunch" },
    { value: "Vine Experience", label: "Vine Experience" },
    { value: "Masterclass / Workshop", label: "Masterclass / Workshop" },
    { value: "Wine Stay", label: "Wine Stay" },
    { value: "Cooking", label: "Cooking" },
    { value: "Urban", label: "Urban" },
    { value: "By Appt", label: "By Appt" },
    { value: "Walk In", label: "Walk In" },
] as const;
