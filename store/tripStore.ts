/* store/tripStore.ts */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { VineyardExperience, VineyardOffer } from "@/types/vineyard";
import { LunchExperience } from "@/types/lunch";
import { Option } from "@/types/option";

/** Used by Trip/Overview to avoid redirect before persist has rehydrated. */
export const useTripHydrationStore = create<{
    hasHydrated: boolean;
    setHasHydrated: (v: boolean) => void;
}>((set) => ({
    hasHydrated: false,
    setHasHydrated: (v) => set({ hasHydrated: v }),
}));

type TripState = {
    country: Option | null;
    region: Option | null;
    subRegion: Option | null;
    vineyards: VineyardExperience[];
    selectedOffer: VineyardOffer | null;
    lunches: LunchExperience[];

    setCountry: (c: Option | null) => void;
    setRegion: (r: Option | null) => void;
    setSubRegion: (s: Option | null) => void;
    addVineyard: (v: VineyardExperience) => void;
    removeVineyard: (id: string) => void;
    setVineyards: (v: VineyardExperience[]) => void;
    setSelectedOffer: (o: VineyardOffer | null) => void;
    addLunch: (lunch: LunchExperience) => void;
    removeLunch: (id: string) => void;

    resetTrip: () => void;
};

export const useTripStore = create<TripState>()(
    persist(
        (set) => ({
            country: null,
            region: null,
            subRegion: null,
            vineyards: [],
            selectedOffer: null,
            lunches: [],

            setCountry: (c) =>
                set({
                    country: c,
                    region: null,
                    subRegion: null,
                    vineyards: [],
                    selectedOffer: null,
                    lunches: [],
                }),

            setRegion: (r) =>
                set({
                    region: r,
                    subRegion: null,
                    vineyards: [],
                    selectedOffer: null,
                    lunches: [],
                }),

            setSubRegion: (s) =>
                set({
                    subRegion: s,
                    vineyards: [],
                    selectedOffer: null,
                    lunches: [],
                }),

            addVineyard: (v) =>
                set((state) => {
                    if (state.vineyards.some((x) => x.id === v.id)) return state;
                    if (state.vineyards.length >= 6) return state;
                    const next = [...state.vineyards, v];
                    if (typeof window !== "undefined") {
                        try {
                            window.localStorage.setItem("smartRoute:vineyards:selected", JSON.stringify(next));
                        } catch (_) {}
                    }
                    return { ...state, vineyards: next };
                }),

            removeVineyard: (id) =>
                set((state) => {
                    const next = state.vineyards.filter((x) => x.id !== id);
                    if (typeof window !== "undefined") {
                        try {
                            window.localStorage.setItem("smartRoute:vineyards:selected", JSON.stringify(next));
                        } catch (_) {}
                    }
                    return { ...state, vineyards: next };
                }),

            setVineyards: (v) =>
                set((state) => {
                    const list = Array.isArray(v) ? v.slice(0, 6) : [];
                    if (typeof window !== "undefined") {
                        try {
                            window.localStorage.setItem("smartRoute:vineyards:selected", JSON.stringify(list));
                        } catch (_) {}
                    }
                    return { ...state, vineyards: list };
                }),

            setSelectedOffer: (o) => set({ selectedOffer: o }),

            addLunch: (lunch) =>
                set((state) => {
                    if (state.lunches.some((x) => x.id === lunch.id)) return state;
                    if (state.lunches.length >= 3) return state;
                    return { ...state, lunches: [...state.lunches, lunch] };
                }),
            removeLunch: (id) =>
                set((state) => ({
                    ...state,
                    lunches: state.lunches.filter((x) => x.id !== id),
                })),

            resetTrip: () =>
                set({
                    country: null,
                    region: null,
                    subRegion: null,
                    vineyards: [],
                    selectedOffer: null,
                    lunches: [],
                }),
        }),
        {
            name: "trip-storage",
            merge: (persisted, current) => {
                const c = current as TripState;
                const raw = persisted as Record<string, unknown> | null | undefined;
                const state = (raw && typeof raw === "object" && "state" in raw
                    ? (raw.state as Record<string, unknown>)
                    : raw) as Record<string, unknown> | null | undefined;
                if (!state || typeof state !== "object") return c;
                const out = { ...state };
                if ("lunch" in out) {
                    if (!("lunches" in out) || !Array.isArray(out.lunches)) {
                        out.lunches = out.lunch ? [out.lunch] : [];
                    }
                    delete out.lunch;
                }
                if (!("lunches" in out) || !Array.isArray(out.lunches)) {
                    out.lunches = [];
                }
                return { ...c, ...out } as TripState;
            },
            onRehydrateStorage: () => (state, err) => {
                useTripHydrationStore.getState().setHasHydrated(true);
            },
        }
    )
);


