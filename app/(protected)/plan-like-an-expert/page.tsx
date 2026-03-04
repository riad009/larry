// "use client";
// import React, { useState, useRef, useEffect, useMemo } from "react";
// import Link from "next/link";
// import { Option } from "@/types/option";
// import { useTripStore } from "@/store/tripStore";
// import { normalize } from "@/utils/strings";
// import { LunchExperience } from "@/types/lunch";
// import { VineyardExperience } from "@/types/vineyard";
//
// type PanelState = "country" | "region" | null;
//
// function mapLunch(doc: any): LunchExperience {
//     return {
//         id: doc.id ?? doc["Restaurant ID"] ?? doc._id?.toString?.() ?? "",
//         name: doc.name ?? doc["Restaurants"],
//         country: doc.country ?? doc["Country"],
//         region: doc.region ?? doc["Region"],
//         subRegion: doc.subRegion ?? doc["Sub Region"],
//         commune: doc.commune ?? doc["Commune"],
//         type: doc.type ?? doc["Type"],
//         description: doc.description ?? doc["Short Description"],
//         gkp: doc.gkp ?? doc["GKP"],
//         open: doc.open ?? doc["Open"],
//         rating: typeof doc.rating === "number" ? doc.rating : Number(doc["G"]) || undefined,
//         latitude: typeof doc.latitude === "number" ? doc.latitude : Number(doc["Latitude"]) || undefined,
//         longitude: typeof doc.longitude === "number" ? doc.longitude : Number(doc["Longitude"]) || undefined,
//         lunchCost: typeof doc.lunchCost === "number" ? doc.lunchCost : Number(doc["Lunch Cost (€)"]) || undefined,
//         bracket: doc.bracket ?? doc["Bracket"],
//     };
// }
//
// function mapVineyard(doc: any): VineyardExperience {
//     return {
//         id: doc.id ?? doc["Vineyard ID"] ?? doc._id?.toString?.() ?? "",
//         name: doc.name ?? doc["Name"],
//         country: doc.country ?? doc["Country"],
//         region: doc.region ?? doc["Region"],
//         subRegion: doc.subRegion ?? doc["Sub Region"],
//         commune: doc.commune ?? doc["Commune"],
//         type: doc.type ?? doc["Type"],
//         description: doc.description ?? doc["Short Description"] ?? doc["Description"],
//         gkp: doc.gkp ?? doc["GKP"],
//         open: doc.open ?? doc["Open"],
//         rating: typeof doc.rating === "number" ? doc.rating : Number(doc["Rating"]) || undefined,
//         latitude: typeof doc.latitude === "number" ? doc.latitude : Number(doc["Latitude"]) || undefined,
//         longitude: typeof doc.longitude === "number" ? doc.longitude : Number(doc["Longitude"]) || undefined,
//         booking: doc.booking ?? doc["Booking"],
//     };
// }
//
// export default function CountryRegionSelector() {
//     const [openPanel, setOpenPanel] = useState<PanelState>("country");
//     const [countryHeight, setCountryHeight] = useState<number>(0);
//     const [regionHeight, setRegionHeight] = useState<number>(0);
//
//     const countryRef = useRef<HTMLDivElement>(null);
//     const regionRef = useRef<HTMLDivElement>(null);
//
//     const { country, region, setCountry, setRegion } = useTripStore();
//
//     const isCountryOpen = useMemo(() => openPanel === "country", [openPanel]);
//     const isRegionOpen = useMemo(() => openPanel === "region", [openPanel]);
//
//     // Fetch lunch + vineyard data
//     const [lunchItems, setLunchItems] = useState<LunchExperience[]>([]);
//     const [vineyardItems, setVineyardItems] = useState<VineyardExperience[]>([]);
//
//     useEffect(() => {
//         let active = true;
//         (async () => {
//             try {
//                 const [lRes, vRes] = await Promise.all([
//                     fetch("/api/lunch", { cache: "no-store" }),
//                     fetch("/api/vineyards", { cache: "no-store" }),
//                 ]);
//                 const [lRaw, vRaw] = await Promise.all([lRes.json(), vRes.json()]);
//                 if (active) {
//                     setLunchItems(Array.isArray(lRaw) ? lRaw.map(mapLunch) : []);
//                     setVineyardItems(Array.isArray(vRaw) ? vRaw.map(mapVineyard) : []);
//                 }
//             } catch (e) {
//                 console.error("Error fetching options:", e);
//             }
//         })();
//         return () => {
//             active = false;
//         };
//     }, []);
//
//     const combined = useMemo(() => [...lunchItems, ...vineyardItems], [lunchItems, vineyardItems]);
//
//     // Dynamic country options
//     const countryOptions: Option[] = useMemo(() => {
//         const unique = Array.from(new Set(combined.map(i => i.country).filter(Boolean)));
//         return unique.map(c => ({ key: c!, name: c! }));
//     }, [combined]);
//
//     // Dynamic region options scoped by selected country
//     const regionOptions: Option[] = useMemo(() => {
//         if (!country) return [];
//         const scoped = combined.filter(i => normalize(i.country) === normalize(country.key));
//         const unique = Array.from(new Set(scoped.map(i => i.region).filter(Boolean)));
//         return unique.map(r => ({ key: r!, name: r! }));
//     }, [combined, country]);
//
//     useEffect(() => {
//         setCountryHeight(openPanel === "country" && countryRef.current ? countryRef.current.scrollHeight : 0);
//     }, [openPanel, countryOptions]);
//
//     useEffect(() => {
//         setRegionHeight(openPanel === "region" && regionRef.current ? regionRef.current.scrollHeight : 0);
//     }, [openPanel, regionOptions]);
//
//     const togglePanel = (panel: "country" | "region") => {
//         setOpenPanel(openPanel === panel ? null : panel);
//     };
//
//     const handleSelect = (type: "country" | "region", option: Option) => {
//         if (type === "country") {
//             setCountry(option);
//             setRegion(null);
//             setOpenPanel("region");
//         } else {
//             setRegion(option);
//             setOpenPanel(null);
//         }
//     };
//
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen w-full p-4">
//             {/* Header */}
//             <div className="text-center mb-10 px-6">
//                 <h1 className="text-4xl font-extrabold text-white tracking-wide mb-2 uppercase">
//                     PLAN LIKE AN EXPERT
//                 </h1>
//                 <p className="text-lg text-gray-200">
//                     Start exploring curated vineyards in your favorite destinations.
//                 </p>
//             </div>
//
//             {/* Selector Box */}
//             <div className="w-full max-w-sm mx-auto shadow-2xl rounded-xl overflow-hidden">
//                 {/* COUNTRY Dropdown */}
//                 <div className={`${isCountryOpen ? "bg-brand-700 text-white" : "bg-brand-300 text-gray-900"} border-b border-gray-400`}>
//                     <div
//                         className="flex justify-between items-center p-4 cursor-pointer font-medium"
//                         onClick={() => togglePanel("country")}
//                     >
//                         <span>Country {country ? `: ${country.name}` : ""}</span>
//                     </div>
//                     <div ref={countryRef} className="transition-all duration-300 ease-in-out overflow-hidden bg-white text-gray-900" style={{ maxHeight: countryHeight }}>
//                         {countryOptions.map((option) => (
//                             <div
//                                 key={option.key}
//                                 className={`py-3 px-4 border-t border-gray-200 cursor-pointer transition-colors ${country?.key === option.key ? "bg-brand-100 font-semibold" : "hover:bg-gray-100"}`}
//                                 onClick={() => handleSelect("country", option)}
//                             >
//                                 {option.name}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//
//                 {/* REGION Dropdown */}
//                 <div className={`${isRegionOpen ? "bg-brand-700 text-white" : "bg-brand-300 text-gray-900"} border-b border-gray-400`}>
//                     <div
//                         className="flex justify-between items-center p-4 cursor-pointer font-medium"
//                         onClick={() => togglePanel("region")}
//                     >
//                         <span>Region {region ? `: ${region.name}` : ""}</span>
//                     </div>
//                     <div ref={regionRef} className="transition-all duration-300 ease-in-out overflow-hidden bg-white text-gray-900" style={{ maxHeight: regionHeight }}>
//                         {regionOptions.map((option) => (
//                             <div
//                                 key={option.key}
//                                 className={`py-3 px-4 border-t border-gray-200 cursor-pointer transition-colors ${region?.key === option.key ? "bg-brand-100 font-semibold" : "hover:bg-gray-100"}`}
//                                 onClick={() => handleSelect("region", option)}
//                             >
//                                 {option.name}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//
//             {/* CONTINUE Button */}
//             <div className="w-full max-w-sm mt-8">
//                 <Link href={country && region ? "/region-highlights" : "#"}>
//                     <button
//                         className={`w-full py-3 text-lg font-semibold rounded-full shadow-2xl border-2 transition-colors ${
//                             country && region
//                                 ? "bg-brand-600 text-white hover:bg-brand-700 border-brand-600"
//                                 : "bg-gray-400 text-gray-700 cursor-not-allowed"
//                         }`}
//                         type="button"
//                         disabled={!country || !region}
//                     >
//                         CONTINUE
//                     </button>
//                 </Link>
//             </div>
//         </div>
//     );
// }





/* app/country-region/page.tsx */
"use client";
import React, { useState } from "react";
import { useTripStore } from "@/store/tripStore";
import { Option } from "@/types/option";
import {
    CountryRegionLayout,
    SelectorHeader,
    DropdownSelector,
    ContinueButton,
    DataFetcher,
} from "@/components/selector";

export default function CountryRegionSelector() {
    const { country, region, setCountry, setRegion } = useTripStore();
    const [openPanel, setOpenPanel] = useState<"country" | "region" | null>(null);

    const togglePanel = (panel: "country" | "region") => {
        setOpenPanel(prev => prev === panel ? null : panel);
    };

    const handleSelect = (type: "country" | "region", option: Option) => {
        if (type === "country") {
            localStorage.removeItem("smartRoute:vineyards:filters");
            localStorage.removeItem("lunchFilters");
            setCountry(option);
            setRegion(null);
            // Open the region panel automatically after country is selected
            setTimeout(() => setOpenPanel("region"), 100);
        } else {
            localStorage.removeItem("smartRoute:vineyards:filters");
            localStorage.removeItem("lunchFilters");
            setRegion(option);
            setOpenPanel(null);
        }
    };

    return (
        <CountryRegionLayout>
            <SelectorHeader />

            <DataFetcher selectedCountry={country?.key}>
                {({ countryOptions, regionOptions, isLoading, error }) => {
                    if (isLoading) {
                        return (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                            </div>
                        );
                    }

                    if (error) return <div className="text-black text-center py-10 text-base">{error}</div>;

                    return (
                        <div className="flex flex-col items-center w-full">
                            {/* Selector Box */}
                            <div className="w-full max-w-sm bg-white border border-[#E0E0E0] rounded-xl overflow-hidden shadow-sm">

                                {/* COUNTRY */}
                                <DropdownSelector
                                    label="Country"
                                    type="country"
                                    value={country}
                                    options={countryOptions}
                                    isOpen={openPanel === "country"}
                                    onToggle={() => togglePanel("country")}
                                    onSelect={(opt) => handleSelect("country", opt)}
                                />

                                {/* REGION */}
                                <DropdownSelector
                                    label="Region"
                                    type="region"
                                    value={region}
                                    options={regionOptions}
                                    isOpen={openPanel === "region"}
                                    onToggle={() => country && togglePanel("region")}
                                    onSelect={(opt) => handleSelect("region", opt)}
                                    disabled={!country}
                                />
                            </div>

                            <div className="mt-8 w-full max-w-sm">
                                <ContinueButton
                                    isValid={!!(country && region)}
                                    href="/region-highlights"
                                />
                            </div>
                        </div>
                    );
                }}
            </DataFetcher>
        </CountryRegionLayout>
    );
}