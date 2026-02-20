// src/types/option.ts
/**
 * Generic option type used for filters and dropdowns.
 * Example: { key: "FRENCH", name: "French" }
 */
export interface Option {
    /** Display name shown in the UI */
    name: string;

    /** Unique key used internally for filtering or selection */
    key: string;
}
