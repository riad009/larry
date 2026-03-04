// "use client";
//
// import React, { useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import LunchCard from "@/components/LunchCard";
// import { LunchExperience } from "@/types/lunch";
// import { useTripStore } from "@/store/tripStore";
// import { normalize } from "@/utils/strings";
// import { Loader2, Utensils, Filter, ChevronRight, X } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
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
// export default function LunchPage() {
//     const router = useRouter();
//     const { country, region, subRegion, lunch: selectedLunch, setLunch } = useTripStore();
//
//     // Load filter states from localStorage or initialize
//     const [filters, setFilters] = useState<{ area: string; type: string; cost: string }>(() => {
//         if (typeof window !== 'undefined') {
//             const saved = localStorage.getItem('lunchFilters');
//             if (saved) {
//                 const parsed = JSON.parse(saved);
//                 return {
//                     area: parsed.area || subRegion?.name || "ALL",
//                     type: parsed.type || "ALL",
//                     cost: parsed.cost || "ALL",
//                 };
//             }
//         }
//         return {
//             area: subRegion?.name || "ALL",
//             type: "ALL",
//             cost: "ALL",
//         };
//     });
//
//     const [appliedFilters, setAppliedFilters] = useState<{ area: string; type: string; cost: string } | null>(() => {
//         if (typeof window !== 'undefined') {
//             const saved = localStorage.getItem('lunchFilters');
//             if (saved) {
//                 const parsed = JSON.parse(saved);
//                 // Only restore applied state if we have active filters
//                 if (parsed.area !== "ALL" || parsed.type !== "ALL" || parsed.cost !== "ALL") {
//                     return parsed;
//                 }
//             }
//         }
//         return null;
//     });
//
//     // Check if at least one filter is active (not "ALL")
//     const hasActiveFilters = useMemo(() => {
//         return filters.area !== "ALL" || filters.type !== "ALL" || filters.cost !== "ALL";
//     }, [filters]);
//
//     const [items, setItems] = useState<LunchExperience[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//
//     // Fetch lunch data
//     useEffect(() => {
//         let active = true;
//         (async () => {
//             try {
//                 setError(null);
//                 setLoading(true);
//                 const res = await fetch("/api/lunch", { cache: "no-store" });
//                 if (!res.ok) throw new Error(`Failed to fetch lunch (${res.status})`);
//                 const raw = await res.json();
//                 const mapped = Array.isArray(raw) ? raw.map(mapLunch) : [];
//                 if (active) setItems(mapped);
//             } catch (e) {
//                 console.error(e);
//                 if (active) setError("Failed to load lunch options.");
//             } finally {
//                 if (active) setLoading(false);
//             }
//         })();
//         return () => {
//             active = false;
//         };
//     }, []);
//
//     // Save filters to localStorage whenever they change
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             localStorage.setItem('lunchFilters', JSON.stringify(filters));
//         }
//     }, [filters]);
//
//     // Save applied filters to localStorage
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             if (appliedFilters) {
//                 localStorage.setItem('lunchFilters', JSON.stringify(appliedFilters));
//             } else {
//                 // Only clear if we don't have any active filters
//                 if (filters.area === "ALL" && filters.type === "ALL" && filters.cost === "ALL") {
//                     localStorage.removeItem('lunchFilters');
//                 }
//             }
//         }
//     }, [appliedFilters, filters]);
//
//     // Dynamic Sub-Region options (scoped by stored country + region)
//     const subRegionOptions = useMemo(() => {
//         const base = [{ key: "ALL", name: "All Areas" }];
//         const scoped = items.filter(i => {
//             if (country && normalize(i.country) !== normalize(country.name)) return false;
//             if (region && normalize(i.region) !== normalize(region.name)) return false;
//             return true;
//         });
//         const unique = Array.from(new Set(scoped.map(i => i.subRegion).filter(Boolean)));
//         return base.concat(unique.map(sr => ({ key: sr!, name: sr! })));
//     }, [items, country, region]);
//
//     // Dynamic Type options (scoped by stored country + region + subRegion)
//     const typeOptions = useMemo(() => {
//         const base = [{ key: "ALL", name: "All Types" }];
//         const scoped = items.filter(i => {
//             if (country && normalize(i.country) !== normalize(country.name)) return false;
//             if (region && normalize(i.region) !== normalize(region.name)) return false;
//             if (filters.area !== "ALL" && normalize(i.subRegion) !== normalize(filters.area)) return false;
//             return true;
//         });
//         const unique = Array.from(new Set(scoped.map(i => i.type).filter(Boolean)));
//         return base.concat(unique.map(t => ({ key: t!, name: t! })));
//     }, [items, country, region, filters.area]);
//
//     // Static Cost options
//     const costOptions = [
//         { key: "ALL", name: "All Prices" },
//         { key: "C1", name: "≤ €15" },
//         { key: "C2", name: "≤ €35" },
//         { key: "C3", name: "€35+" },
//     ];
//
//     // Apply filters
//     const results = useMemo(() => {
//         if (!appliedFilters) return [];
//         const { area, type, cost } = appliedFilters;
//
//         return items.filter(i => {
//             if (country && normalize(i.country) !== normalize(country.name)) return false;
//             if (region && normalize(i.region) !== normalize(region.name)) return false;
//             if (area !== "ALL" && normalize(i.subRegion) !== normalize(area)) return false;
//             if (type !== "ALL" && normalize(i.type) !== normalize(type)) return false;
//
//             const v = i.lunchCost ?? 0;
//             if (cost === "C1" && v > 15) return false;
//             if (cost === "C2" && v > 35) return false;
//             if (cost === "C3" && v <= 35) return false;
//
//             return true;
//         }).slice(0, 6);
//     }, [appliedFilters, items, country, region]);
//
//     const handleApplyFilters = () => {
//         if (hasActiveFilters) {
//             const newApplied = { ...filters };
//             setAppliedFilters(newApplied);
//         }
//     };
//
//     const handleClearFilters = () => {
//         const defaultFilters = {
//             area: subRegion?.name || "ALL",
//             type: "ALL",
//             cost: "ALL",
//         };
//         setFilters(defaultFilters);
//         setAppliedFilters(null);
//         if (typeof window !== 'undefined') {
//             localStorage.removeItem('lunchFilters');
//         }
//     };
//
//     // Loading state - matching VineyardPage pattern
//     if (loading) {
//         return (
//             <div className="min-h-screen text-white p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center">
//                 <div className="w-full max-w-7xl">
//                     {/* Desktop loading skeleton */}
//                     <div className="hidden md:flex gap-6">
//                         {/* Filters sidebar skeleton */}
//                         <div className="w-80 p-6 bg-zinc-900/50 rounded-3xl border border-zinc-800">
//                             <div className="h-8 bg-zinc-800 rounded mb-6 w-3/4 animate-pulse"></div>
//                             {[1, 2, 3].map((i) => (
//                                 <div key={i} className="mb-6">
//                                     <div className="h-4 bg-zinc-800 rounded mb-2 w-1/2 animate-pulse"></div>
//                                     <div className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-lg h-12 animate-pulse"></div>
//                                 </div>
//                             ))}
//                             <div className="flex gap-3 mt-8">
//                                 <div className="flex-1 h-12 bg-zinc-800 rounded-xl animate-pulse"></div>
//                                 <div className="flex-1 h-12 bg-zinc-800 rounded-xl animate-pulse"></div>
//                             </div>
//                         </div>
//
//                         {/* Content skeleton - Grid layout */}
//                         <div className="flex-1">
//                             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//                                 {[1, 2, 3, 4, 5, 6].map((i) => (
//                                     <div key={i} className="bg-zinc-900/30 rounded-2xl overflow-hidden border border-zinc-800 animate-pulse">
//                                         <div className="h-48 bg-zinc-800"></div>
//                                         <div className="p-4">
//                                             <div className="h-6 bg-zinc-800 rounded mb-2"></div>
//                                             <div className="h-4 bg-zinc-800 rounded mb-4 w-3/4"></div>
//                                             <div className="flex justify-between">
//                                                 <div className="h-4 bg-zinc-800 rounded w-1/4"></div>
//                                                 <div className="h-8 bg-zinc-800 rounded w-1/3"></div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Mobile loading skeleton */}
//                     <div className="md:hidden w-full max-w-sm">
//                         {/* Loading header */}
//                         <div className="mb-8 text-center">
//                             <div className="flex items-center justify-center gap-3 mb-4">
//                                 <div className="relative">
//                                     <div className="w-16 h-16 rounded-full border-4 border-zinc-800 border-t-green-500 animate-spin"></div>
//                                     <Utensils className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-green-500" />
//                                 </div>
//                             </div>
//                             <h1 className="text-2xl font-bold text-white mb-2">Loading Restaurants</h1>
//                             <p className="text-zinc-400 text-sm">Discovering culinary experiences...</p>
//                         </div>
//
//                         <div className="w-full p-4 bg-zinc-900/50 rounded-3xl mb-6 border border-zinc-800">
//                             <div className="flex flex-row gap-2 mb-4">
//                                 {[1, 2, 3].map((i) => (
//                                     <div key={i} className="flex-1">
//                                         <div className="h-4 w-16 bg-zinc-800 rounded mb-2 animate-pulse"></div>
//                                         <div className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded-lg h-9 animate-pulse"></div>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className="flex gap-3">
//                                 <div className="flex-1 h-12 bg-zinc-800 rounded-xl animate-pulse"></div>
//                                 <div className="flex-1 h-12 bg-zinc-800 rounded-xl animate-pulse"></div>
//                             </div>
//                         </div>
//
//                         <div className="w-full max-w-sm space-y-4">
//                             {[1, 2, 3].map((i) => (
//                                 <div key={i} className="w-full bg-zinc-900/30 rounded-2xl overflow-hidden border border-zinc-800 animate-pulse">
//                                     <div className="h-48 bg-zinc-800"></div>
//                                     <div className="p-4">
//                                         <div className="h-6 bg-zinc-800 rounded mb-2"></div>
//                                         <div className="h-4 bg-zinc-800 rounded mb-4 w-3/4"></div>
//                                         <div className="flex justify-between">
//                                             <div className="h-4 bg-zinc-800 rounded w-1/4"></div>
//                                             <div className="h-8 bg-zinc-800 rounded w-1/3"></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
//
//     return (
//         <div className="min-h-screen text-white p-4 md:p-6 lg:p-8">
//             {/* Desktop Layout */}
//             <div className="hidden md:block max-w-7xl mx-auto">
//                 <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
//                     {/* Left Sidebar - Filters */}
//                     <div className="lg:w-80 xl:w-96 flex-shrink-0">
//                         <div className="sticky top-6">
//                             <div className="p-6 bg-zinc-900 rounded-3xl border border-zinc-800 mb-6">
//                                 <div className="flex items-center gap-3 mb-6">
//                                     <div className="p-2 bg-green-500/20 rounded-lg">
//                                         <Filter className="w-5 h-5 text-green-500" />
//                                     </div>
//                                     <h2 className="text-lg font-bold text-white">Filter Restaurants</h2>
//                                 </div>
//
//                                 <div className="space-y-6">
//                                     <div>
//                                         <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2 block">Area</label>
//                                         <select
//                                             value={filters.area}
//                                             onChange={e => setFilters(prev => ({ ...prev, area: e.target.value }))}
//                                             className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-xl text-sm h-12 outline-none hover:border-zinc-600 focus:border-green-500 transition-colors"
//                                         >
//                                             {subRegionOptions.map(opt => (
//                                                 <option key={opt.key} value={opt.key}>{opt.name}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//
//                                     <div>
//                                         <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2 block">Type</label>
//                                         <select
//                                             value={filters.type}
//                                             onChange={e => setFilters(prev => ({ ...prev, type: e.target.value }))}
//                                             className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-xl text-sm h-12 outline-none hover:border-zinc-600 focus:border-green-500 transition-colors"
//                                         >
//                                             {typeOptions.map(opt => (
//                                                 <option key={opt.key} value={opt.key}>{opt.name}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//
//                                     <div>
//                                         <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2 block">Cost</label>
//                                         <select
//                                             value={filters.cost}
//                                             onChange={e => setFilters(prev => ({ ...prev, cost: e.target.value }))}
//                                             className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-xl text-sm h-12 outline-none hover:border-zinc-600 focus:border-green-500 transition-colors"
//                                         >
//                                             {costOptions.map(opt => (
//                                                 <option key={opt.key} value={opt.key}>{opt.name}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//
//                                 <div className="flex gap-3 mt-8">
//                                     <Button
//                                         onClick={handleApplyFilters}
//                                         disabled={!hasActiveFilters}
//                                         className={`flex-1 font-bold h-14 rounded-xl text-base transition-all duration-300 shadow-lg ${
//                                             hasActiveFilters
//                                                 ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 hover:shadow-green-500/20'
//                                                 : 'bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed'
//                                         }`}
//                                     >
//                                         APPLY FILTERS
//                                     </Button>
//
//                                     <Link
//                                         href="/overview"
//                                         className={`flex-1 ${!selectedLunch ? 'pointer-events-none' : ''}`}
//                                     >
//                                         <Button
//                                             disabled={!selectedLunch}
//                                             className={`w-full font-bold h-14 rounded-xl text-base transition-all shadow-lg ${
//                                                 selectedLunch
//                                                     ? 'bg-gradient-to-r from-white to-zinc-100 hover:from-zinc-100 hover:to-zinc-200 text-black opacity-100 hover:shadow-white/20'
//                                                     : 'bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed'
//                                             }`}
//                                         >
//                                             CONTINUE
//                                             <ChevronRight className="ml-2 w-5 h-5" />
//                                         </Button>
//                                     </Link>
//                                 </div>
//
//                                 {/* Applied filters indicator */}
//                                 {appliedFilters && (
//                                     <div className="mt-6 pt-6 border-t border-zinc-800">
//                                         <p className="text-sm text-zinc-400 mb-3">Active Filters:</p>
//                                         <div className="flex flex-wrap gap-2">
//                                             {appliedFilters.area !== "ALL" && (
//                                                 <span className="px-3 py-2 bg-green-500/20 text-green-400 text-sm rounded-lg border border-green-500/30 flex items-center gap-2">
//                                                     Area: {appliedFilters.area}
//                                                     <button onClick={() => setFilters(prev => ({ ...prev, area: "ALL" }))} className="hover:text-green-300">
//                                                         <X className="w-3 h-3" />
//                                                     </button>
//                                                 </span>
//                                             )}
//                                             {appliedFilters.type !== "ALL" && (
//                                                 <span className="px-3 py-2 bg-blue-500/20 text-blue-400 text-sm rounded-lg border border-blue-500/30 flex items-center gap-2">
//                                                     Type: {appliedFilters.type}
//                                                     <button onClick={() => setFilters(prev => ({ ...prev, type: "ALL" }))} className="hover:text-blue-300">
//                                                         <X className="w-3 h-3" />
//                                                     </button>
//                                                 </span>
//                                             )}
//                                             {appliedFilters.cost !== "ALL" && (
//                                                 <span className="px-3 py-2 bg-amber-500/20 text-amber-400 text-sm rounded-lg border border-amber-500/30 flex items-center gap-2">
//                                                     {appliedFilters.cost === "C1" ? "≤ €15" : appliedFilters.cost === "C2" ? "≤ €35" : "€35+"}
//                                                     <button onClick={() => setFilters(prev => ({ ...prev, cost: "ALL" }))} className="hover:text-amber-300">
//                                                         <X className="w-3 h-3" />
//                                                     </button>
//                                                 </span>
//                                             )}
//                                         </div>
//                                         <button
//                                             onClick={handleClearFilters}
//                                             className="mt-3 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
//                                         >
//                                             Clear all filters
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//
//                             {/* Stats Card - Same as vineyard page */}
//                             {/*<div className="p-6 bg-zinc-900 rounded-3xl border border-zinc-800">*/}
//                             {/*    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Database Stats</h3>*/}
//                             {/*    <div className="space-y-3">*/}
//                             {/*        <div className="flex justify-between items-center">*/}
//                             {/*            <span className="text-zinc-500">Total Restaurants</span>*/}
//                             {/*            <span className="text-white font-bold">{items.length}</span>*/}
//                             {/*        </div>*/}
//                             {/*        <div className="flex justify-between items-center">*/}
//                             {/*            <span className="text-zinc-500">Areas</span>*/}
//                             {/*            <span className="text-white font-bold">{subRegionOptions.length - 1}</span>*/}
//                             {/*        </div>*/}
//                             {/*        <div className="flex justify-between items-center">*/}
//                             {/*            <span className="text-zinc-500">Cuisine Types</span>*/}
//                             {/*            <span className="text-white font-bold">{typeOptions.length - 1}</span>*/}
//                             {/*        </div>*/}
//                             {/*    </div>*/}
//                             {/*</div>*/}
//                         </div>
//                     </div>
//
//                     {/* Main Content */}
//                     <div className="flex-1">
//                         {/* Header */}
//                         <div className="mb-6">
//                             <h1 className="text-3xl font-bold text-white mb-2">Discover Restaurants</h1>
//                             <p className="text-zinc-400">Explore our curated selection of premium dining experiences</p>
//                         </div>
//
//                         {/* Results Info */}
//                         <div className="mb-6 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     {!appliedFilters ? (
//                                         <div className="flex items-center gap-3">
//                                             <Utensils className="w-5 h-5 text-green-500" />
//                                             <p className="text-zinc-400">
//                                                 Select filters to discover from <span className="text-white font-bold">{items.length}</span> restaurants
//                                             </p>
//                                         </div>
//                                     ) : (
//                                         <div className="flex items-center gap-3">
//                                             <Filter className="w-5 h-5 text-green-500" />
//                                             <p className="text-zinc-400">
//                                                 Showing <span className="text-white font-bold">{results.length}</span> of <span className="text-white font-bold">{items.length}</span> restaurants
//                                             </p>
//                                         </div>
//                                     )}
//                                 </div>
//                                 {appliedFilters && results.length > 0 && (
//                                     <button
//                                         onClick={handleClearFilters}
//                                         className="px-4 py-2 text-sm text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
//                                     >
//                                         Clear filters
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//
//                         {/* Results Grid */}
//                         {!appliedFilters ? (
//                             <div className="text-center py-12">
//                                 <div className="max-w-md mx-auto p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800">
//                                     <div className="p-4 bg-zinc-800/50 rounded-2xl inline-block mb-4">
//                                         <Filter className="w-12 h-12 text-zinc-600" />
//                                     </div>
//                                     <h3 className="text-xl font-bold text-white mb-2">Start Exploring</h3>
//                                     <p className="text-zinc-400 mb-4">Use the filters to discover restaurants matching your preferences</p>
//                                     <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm">
//                                         <Utensils className="w-4 h-4" />
//                                         <span>{items.length} restaurants available</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         ) : results.length === 0 ? (
//                             <div className="text-center py-12">
//                                 <div className="max-w-md mx-auto p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800">
//                                     <div className="p-4 bg-zinc-800/50 rounded-2xl inline-block mb-4">
//                                         <Utensils className="w-12 h-12 text-zinc-600" />
//                                     </div>
//                                     <h3 className="text-xl font-bold text-white mb-2">No Matches Found</h3>
//                                     <p className="text-zinc-400 mb-4">Try adjusting your filters for more results</p>
//                                     <Button
//                                         onClick={handleClearFilters}
//                                         className="bg-zinc-800 hover:bg-zinc-700"
//                                     >
//                                         Reset All Filters
//                                     </Button>
//                                 </div>
//                             </div>
//                         ) : error ? (
//                             <div className="text-center py-12">
//                                 <div className="max-w-md mx-auto p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800">
//                                     <div className="p-4 bg-red-500/20 rounded-2xl inline-block mb-4">
//                                         <Utensils className="w-12 h-12 text-red-500" />
//                                     </div>
//                                     <h3 className="text-xl font-bold text-white mb-2">Error Loading Data</h3>
//                                     <p className="text-red-400 mb-4">{error}</p>
//                                     <button
//                                         onClick={() => window.location.reload()}
//                                         className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium transition-colors"
//                                     >
//                                         Try Again
//                                     </button>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
//                                 {results.map(r => (
//                                     <div key={r.id} className="transform transition-transform duration-300 hover:scale-[1.02]">
//                                         <LunchCard
//                                             lunch={r}
//                                             isSelected={selectedLunch?.id === r.id}
//                                             onAdd={() => setLunch(r)}
//                                             onRemove={() => setLunch(null)}
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//
//             {/* Mobile Layout (Original with improvements) */}
//             <div className="md:hidden flex flex-col items-center">
//                 {/* Filters Section */}
//                 {!loading && (
//                     <div className="w-full max-w-sm p-4 bg-zinc-900 rounded-3xl mb-6 border border-zinc-800">
//                         <div className="flex items-center gap-2 mb-4">
//                             <Filter className="w-4 h-4 text-green-500" />
//                             <h2 className="text-sm font-bold text-white uppercase tracking-wider">Filter Restaurants</h2>
//                         </div>
//
//                         {/* Custom Filter Bar - matching style but inline */}
//                         <div className="flex flex-row gap-2 mb-4">
//                             <div className="flex-1">
//                                 <label className="text-[12px] font-bold text-zinc-500 uppercase ml-1 mb-1 block">SUB-REGION</label>
//                                 <select
//                                     value={filters.area}
//                                     onChange={e => setFilters(prev => ({ ...prev, area: e.target.value }))}
//                                     className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded-lg text-[11px] h-9 outline-none hover:border-zinc-600 transition-colors"
//                                 >
//                                     {subRegionOptions.map(opt => (
//                                         <option key={opt.key} value={opt.key}>{opt.name}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="flex-1">
//                                 <label className="text-[12px] font-bold text-zinc-500 uppercase ml-1 mb-1 block">TYPE</label>
//                                 <select
//                                     value={filters.type}
//                                     onChange={e => setFilters(prev => ({ ...prev, type: e.target.value }))}
//                                     className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded-lg text-[11px] h-9 outline-none hover:border-zinc-600 transition-colors"
//                                 >
//                                     {typeOptions.map(opt => (
//                                         <option key={opt.key} value={opt.key}>{opt.name}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="flex-1">
//                                 <label className="text-[12px] font-bold text-zinc-500 uppercase ml-1 mb-1 block">COST</label>
//                                 <select
//                                     value={filters.cost}
//                                     onChange={e => setFilters(prev => ({ ...prev, cost: e.target.value }))}
//                                     className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded-lg text-[11px] h-9 outline-none hover:border-zinc-600 transition-colors"
//                                 >
//                                     {costOptions.map(opt => (
//                                         <option key={opt.key} value={opt.key}>{opt.name}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>
//
//                         <div className="flex gap-3">
//                             <Button
//                                 onClick={handleApplyFilters}
//                                 disabled={!hasActiveFilters}
//                                 className={`flex-1 font-bold h-12 rounded-xl transition-all duration-300 shadow-lg text-sm ${
//                                     hasActiveFilters
//                                         ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 hover:shadow-green-500/20'
//                                         : 'bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed'
//                                 }`}
//                             >
//                                 APPLY FILTERS
//                             </Button>
//
//                             <Link
//                                 href="/overview"
//                                 className={`flex-1 ${!selectedLunch ? 'pointer-events-none' : ''}`}
//                             >
//                                 <Button
//                                     disabled={!selectedLunch}
//                                     className={`w-full font-bold h-12 rounded-xl transition-all shadow-lg text-sm ${
//                                         selectedLunch
//                                             ? 'bg-gradient-to-r from-white to-zinc-100 hover:from-zinc-100 hover:to-zinc-200 text-black opacity-100 hover:shadow-white/20'
//                                             : 'bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed'
//                                     }`}
//                                 >
//                                     CONTINUE
//                                     <ChevronRight className="ml-1 w-4 h-4" />
//                                 </Button>
//                             </Link>
//                         </div>
//
//                         {/* Applied filters indicator */}
//                         {appliedFilters && (
//                             <div className="mt-4 pt-4 border-t border-zinc-800">
//                                 <p className="text-xs text-zinc-400 mb-2">Applied filters:</p>
//                                 <div className="flex flex-wrap gap-2">
//                                     {appliedFilters.area !== "ALL" && (
//                                         <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-lg border border-green-500/30">
//                                             Area: {appliedFilters.area}
//                                         </span>
//                                     )}
//                                     {appliedFilters.type !== "ALL" && (
//                                         <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-lg border border-blue-500/30">
//                                             Type: {appliedFilters.type}
//                                         </span>
//                                     )}
//                                     {appliedFilters.cost !== "ALL" && (
//                                         <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-lg border border-amber-500/30">
//                                             {appliedFilters.cost === "C1" ? "≤ €15" : appliedFilters.cost === "C2" ? "≤ €35" : "€35+"}
//                                         </span>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 )}
//
//                 {/* Results Section */}
//                 <div className="w-full max-w-sm space-y-4 pb-20">
//                     {!loading && error && (
//                         <div className="text-center py-8">
//                             <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
//                                 <Utensils className="w-12 h-12 text-red-500 mx-auto mb-3" />
//                                 <p className="text-red-400 text-sm mb-2">{error}</p>
//                                 <p className="text-zinc-500 text-xs">Please try refreshing the page</p>
//                             </div>
//                         </div>
//                     )}
//
//                     {!loading && !error && !appliedFilters && (
//                         <div className="text-center py-8">
//                             <div className="p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800 mb-4">
//                                 <Filter className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
//                                 <p className="text-zinc-400 text-sm mb-2">Select filters and click Apply to discover restaurants</p>
//                                 <p className="text-zinc-500 text-xs">Found {items.length} restaurants in our database</p>
//                             </div>
//                         </div>
//                     )}
//
//                     {!loading && !error && appliedFilters && results.length === 0 && (
//                         <div className="text-center py-8">
//                             <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
//                                 <Utensils className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
//                                 <p className="text-zinc-400 text-sm mb-2">No restaurants match these criteria</p>
//                                 <p className="text-zinc-500 text-xs">Try adjusting your filters</p>
//                             </div>
//                         </div>
//                     )}
//
//                     {!loading && !error && appliedFilters && results.length > 0 && (
//                         <>
//                             <div className="mb-4">
//                                 <div className="flex items-center justify-between">
//                                     <p className="text-sm font-bold text-zinc-400">
//                                         Showing {results.length} of {items.length} restaurants
//                                     </p>
//                                     <button
//                                         onClick={handleClearFilters}
//                                         className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
//                                     >
//                                         Clear filters
//                                     </button>
//                                 </div>
//                             </div>
//
//                             {results.map(r => (
//                                 <LunchCard
//                                     key={r.id}
//                                     lunch={r}
//                                     className="mb-4"
//                                     isSelected={selectedLunch?.id === r.id}
//                                     onAdd={() => setLunch(r)}
//                                     onRemove={() => setLunch(null)}
//                                 />
//                             ))}
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }




// app/lunch/page.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LunchExperience } from "@/types/lunch";
import { useTripStore } from "@/store/tripStore";
import { normalize } from "@/utils/strings";
import {
    DesktopFiltersSidebar,
    MobileFiltersPanel,
    DesktopResultsGrid,
    MobileResultsList,
    LoadingSkeleton,
    MainLayoutWrapper,
} from "@/components/Lunch";

/** Static cost options for Lunch filter — matches Vineyard price filter (value + label). */
const LUNCH_COST_OPTIONS = [
    { value: "UNDER_25", label: "Under 25€" },
    { value: "RANGE_25_40", label: "25–40€" },
    { value: "RANGE_40_70", label: "40–70€" },
    { value: "OVER_70", label: "70€+" },
] as const;

/** Cost options in FilterOption shape (key + name) for dropdowns. */
const LUNCH_COST_OPTIONS_FOR_UI = LUNCH_COST_OPTIONS.map((o) => ({
    key: o.value,
    name: o.label,
}));

function mapLunch(doc: any): LunchExperience {
    return {
        id: doc.id ?? doc["Restaurant ID"] ?? doc._id?.toString?.() ?? "",
        name: doc.name ?? doc["Restaurants"],
        country: doc.country ?? doc["Country"],
        region: doc.region ?? doc["Region"],
        subRegion: doc.subRegion ?? doc["Sub Region"],
        commune: doc.commune ?? doc["Commune"],
        type: doc.type ?? doc["Type"],
        description: doc.description ?? doc["Short Description"],
        gkp: doc.gkp ?? doc["GKP"],
        open: doc.open ?? doc["Open"],
        rating:
            typeof doc.rating === "number"
                ? doc.rating
                : Number(doc["G"]) || undefined,
        latitude:
            typeof doc.latitude === "number"
                ? doc.latitude
                : Number(doc["Latitude"]) || undefined,
        longitude:
            typeof doc.longitude === "number"
                ? doc.longitude
                : Number(doc["Longitude"]) || undefined,
        lunchCost:
            typeof doc.lunchCost === "number"
                ? doc.lunchCost
                : Number(doc["Lunch Cost (€)"]) || undefined,
        bracket: doc.bracket ?? doc["Bracket"],
    };
}

function matchesLunchCostFilter(costValue: number | undefined | null, filterKey: string): boolean {
    if (costValue == null || typeof costValue !== "number" || Number.isNaN(costValue))
        return false;
    switch (filterKey) {
        case "UNDER_25":
            return costValue < 25;
        case "RANGE_25_40":
            return costValue >= 25 && costValue <= 40;
        case "RANGE_40_70":
            return costValue > 40 && costValue <= 70;
        case "OVER_70":
            return costValue > 70;
        default:
            return false;
    }
}

export default function LunchPage() {
    const router = useRouter();
    const { country, region, subRegion, lunches, addLunch, removeLunch } =
        useTripStore();
    const [showLunchWarning, setShowLunchWarning] = useState(false);
    const resultsSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (showLunchWarning && resultsSectionRef?.current) {
            resultsSectionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [showLunchWarning]);

    // Load filter states from localStorage or initialize
    const [filters, setFilters] = useState<{
        area: string;
        type: string;
        cost: string;
    }>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("lunchFilters");
            if (saved) {
                const parsed = JSON.parse(saved);
                return {
                    area: parsed.area || subRegion?.name || "ALL",
                    type: parsed.type || "ALL",
                    cost: parsed.cost && parsed.cost !== "ALL" ? parsed.cost : "",
                };
            }
        }
        return {
            area: subRegion?.name || "ALL",
            type: "ALL",
            cost: "",
        };
    });

    const [appliedFilters, setAppliedFilters] = useState<{
        area: string;
        type: string;
        cost: string;
    } | null>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("lunchFilters");
            if (saved) {
                const parsed = JSON.parse(saved);
                // Only restore applied state when both required filters (Area + Cost) are set; Cost must be a specific Bracket (no "ALL")
                if (parsed.area !== "ALL" && parsed.cost && parsed.cost !== "ALL") {
                    return parsed;
                }
            }
        }
        return null;
    });

    // GO/Apply enabled only when Area and Cost are selected (Cost has no "ALL"; Type does not affect)
    const hasActiveFilters = useMemo(() => {
        return filters.area !== "ALL" && filters.cost !== "";
    }, [filters]);

    const [items, setItems] = useState<LunchExperience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch lunch data
    useEffect(() => {
        let active = true;
        (async () => {
            try {
                setError(null);
                setLoading(true);
                const res = await fetch("/api/lunch", { cache: "no-store" });
                if (!res.ok) throw new Error(`Failed to fetch lunch (${res.status})`);
                const raw = await res.json();
                const mapped = Array.isArray(raw) ? raw.map(mapLunch) : [];
                if (active) setItems(mapped);
            } catch (e) {
                console.error(e);
                if (active) setError("Failed to load lunch options.");
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => {
            active = false;
        };
    }, []);

    // Save filters to localStorage whenever they change
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("lunchFilters", JSON.stringify(filters));
        }
    }, [filters]);

    // Save applied filters to localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (appliedFilters) {
                localStorage.setItem("lunchFilters", JSON.stringify(appliedFilters));
            } else {
                // Only clear if required filters are unset
                if (filters.area === "ALL" && filters.type === "ALL" && filters.cost === "") {
                    localStorage.removeItem("lunchFilters");
                }
            }
        }
    }, [appliedFilters, filters]);

    // Dynamic Sub-Region options (scoped by stored country + region)
    const subRegionOptions = useMemo(() => {
        const base = [{ key: "ALL", name: "All Areas" }];
        const scoped = items.filter((i) => {
            if (country && normalize(i.country) !== normalize(country.name))
                return false;
            if (region && normalize(i.region) !== normalize(region.name))
                return false;
            return true;
        });
        const unique = Array.from(
            new Set(scoped.map((i) => i.subRegion).filter(Boolean))
        );
        return base.concat(unique.map((sr) => ({ key: sr!, name: sr! })));
    }, [items, country, region]);

    // Dynamic Type options (scoped by stored country + region + subRegion)
    const typeOptions = useMemo(() => {
        const base = [{ key: "ALL", name: "All Types" }];
        const scoped = items.filter((i) => {
            if (country && normalize(i.country) !== normalize(country.name))
                return false;
            if (region && normalize(i.region) !== normalize(region.name))
                return false;
            if (filters.area !== "ALL" && normalize(i.subRegion) !== normalize(filters.area))
                return false;
            return true;
        });
        const unique = Array.from(
            new Set(scoped.map((i) => i.type).filter(Boolean))
        );
        return base.concat(unique.map((t) => ({ key: t!, name: t! })));
    }, [items, country, region, filters.area]);

    // Static cost options (matches Vineyard). Used for desktop and mobile dropdowns.
    const costOptions = LUNCH_COST_OPTIONS_FOR_UI;

    // Filter + sort (no slice). Order: filter → sort. Same as Vineyard pattern.
    const filteredResults = useMemo(() => {
        if (!appliedFilters) return [];
        const { area, type, cost } = appliedFilters;

        const filtered = items.filter((i) => {
            if (country && normalize(i.country) !== normalize(country.name))
                return false;
            if (region && normalize(i.region) !== normalize(region.name))
                return false;
            if (area !== "ALL" && normalize(i.subRegion ?? "") !== normalize(area))
                return false;
            if (type !== "ALL" && normalize(i.type ?? "") !== normalize(type))
                return false;
            if (cost !== "") {
                if (i.lunchCost == null || (typeof i.lunchCost !== "number") || Number.isNaN(i.lunchCost))
                    return false;
                if (!matchesLunchCostFilter(i.lunchCost, cost))
                    return false;
            }
            return true;
        });
        // Sort: rating desc, name asc. Treat blank/NaN as -1.
        return [...filtered].sort((a, b) => {
            const ra = typeof a.rating === "number" && !Number.isNaN(a.rating) ? a.rating : -1;
            const rb = typeof b.rating === "number" && !Number.isNaN(b.rating) ? b.rating : -1;
            if (rb !== ra) return rb - ra;
            const na = (a.name ?? "").trim().toLowerCase();
            const nb = (b.name ?? "").trim().toLowerCase();
            return na.localeCompare(nb);
        });
    }, [appliedFilters, items, country, region]);

    // Main grid: filter → sort (above) → exclude selected → slice to 6.
    const mainGridResults = useMemo(() => {
        const excluded = filteredResults.filter(
            (r) => !lunches.some((l) => l.id === r.id)
        );
        return excluded.slice(0, 6);
    }, [filteredResults, lunches]);

    // Area-scoped count for meta (subRegion only when area !== "ALL").
    const areaTotalCount = useMemo(() => {
        if (!appliedFilters || appliedFilters.area === "ALL") return undefined;
        const area = appliedFilters.area;
        return items.filter((i) => {
            if (country && normalize(i.country) !== normalize(country.name)) return false;
            if (region && normalize(i.region) !== normalize(region.name)) return false;
            return normalize(i.subRegion ?? "") === normalize(area);
        }).length;
    }, [appliedFilters, items, country, region]);

    // Top 6 in area only (no type, no cost). Sort rating desc, name asc; exclude selected.
    const topRatedInArea = useMemo(() => {
        if (!appliedFilters || appliedFilters.area === "ALL") return [];
        const area = appliedFilters.area;
        const byArea = items.filter((i) => {
            if (country && normalize(i.country) !== normalize(country.name)) return false;
            if (region && normalize(i.region) !== normalize(region.name)) return false;
            return normalize(i.subRegion ?? "") === normalize(area);
        });
        const sorted = [...byArea].sort((a, b) => {
            const ra = typeof a.rating === "number" && !Number.isNaN(a.rating) ? a.rating : -1;
            const rb = typeof b.rating === "number" && !Number.isNaN(b.rating) ? b.rating : -1;
            if (rb !== ra) return rb - ra;
            const na = (a.name ?? "").trim().toLowerCase();
            const nb = (b.name ?? "").trim().toLowerCase();
            return na.localeCompare(nb);
        });
        const excluded = sorted.filter((r) => !lunches.some((l) => l.id === r.id));
        return excluded.slice(0, 6);
    }, [appliedFilters, items, country, region, lunches]);

    const handleApplyFilters = () => {
        if (hasActiveFilters) {
            const newApplied = { ...filters };
            setAppliedFilters(newApplied);
        }
    };

    const handleApplyFiltersMobile = () => {
        handleApplyFilters();
        if (typeof window !== "undefined" && window.innerWidth < 768) {
            resultsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleClearFilters = () => {
        const defaultFilters = {
            area: subRegion?.name || "ALL",
            type: "ALL",
            cost: "",
        };
        setFilters(defaultFilters);
        setAppliedFilters(null);
        if (typeof window !== "undefined") {
            localStorage.removeItem("lunchFilters");
        }
    };

    const handleFilterChange = (filterType: "area" | "type" | "cost", value: string) => {
        setFilters((prev) => ({ ...prev, [filterType]: value }));
    };

    const handleRemoveFilter = (filterType: "area" | "type" | "cost") => {
        const clearedValue = filterType === "cost" ? "" : "ALL";
        setFilters((prev) => ({ ...prev, [filterType]: clearedValue }));
        if (appliedFilters) {
            const newApplied = { ...appliedFilters, [filterType]: clearedValue };
            const allCleared = newApplied.area === "ALL" && newApplied.type === "ALL" && newApplied.cost === "";
            setAppliedFilters(allCleared ? null : newApplied);
        }
    };

    const handleRetry = () => {
        window.location.reload();
    };

    const handleAddLunch = (lunch: LunchExperience) => {
        if (lunches.length >= 3) {
            setShowLunchWarning(true);
            return;
        }
        setShowLunchWarning(false);
        addLunch(lunch);
    };

    const handleRemoveLunch = (id: string) => {
        setShowLunchWarning(false);
        removeLunch(id);
    };

    if (loading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="min-h-screen text-black bg-white p-4 md:p-6 lg:p-8">
            {/* Desktop Layout */}
            <MainLayoutWrapper variant="desktop">
                <DesktopFiltersSidebar
                    filters={filters}
                    appliedFilters={appliedFilters}
                    subRegionOptions={subRegionOptions}
                    typeOptions={typeOptions}
                    costOptions={costOptions}
                    hasActiveFilters={hasActiveFilters}
                    hasSelectedLunch={lunches.length >= 1}
                    onFilterChange={handleFilterChange}
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearFilters}
                    onRemoveFilter={handleRemoveFilter}
                    totalRestaurantsCount={items.length}
                    areasCount={subRegionOptions.length - 1}
                    cuisineTypesCount={typeOptions.length - 1}
                />

                <DesktopResultsGrid
                    appliedFilters={appliedFilters}
                    filteredResults={filteredResults}
                    filteredResultsCount={filteredResults.length}
                    mainGridResults={mainGridResults}
                    areaTotalCount={areaTotalCount}
                    topRatedInArea={topRatedInArea}
                    items={items}
                    selectedLunches={lunches}
                    error={error}
                    showLunchWarning={showLunchWarning}
                    onDismissLunchWarning={() => setShowLunchWarning(false)}
                    onClearFilters={handleClearFilters}
                    onAddLunch={handleAddLunch}
                    onRemoveLunch={handleRemoveLunch}
                    onRetry={handleRetry}
                />
            </MainLayoutWrapper>

            {/* Mobile Layout */}
            <MainLayoutWrapper variant="mobile">
                <MobileFiltersPanel
                    filters={filters}
                    appliedFilters={appliedFilters}
                    subRegionOptions={subRegionOptions}
                    typeOptions={typeOptions}
                    costOptions={costOptions}
                    hasActiveFilters={hasActiveFilters}
                    hasSelectedLunch={lunches.length >= 1}
                    onFilterChange={handleFilterChange}
                    onApplyFilters={handleApplyFiltersMobile}
                    onClearFilters={handleClearFilters}
                />

                <div ref={resultsSectionRef} className="w-full min-w-0 max-w-full">
                <MobileResultsList
                    appliedFilters={appliedFilters}
                    filteredResults={filteredResults}
                    filteredResultsCount={filteredResults.length}
                    mainGridResults={mainGridResults}
                    areaTotalCount={areaTotalCount}
                    topRatedInArea={topRatedInArea}
                    items={items}
                    selectedLunches={lunches}
                    error={error}
                    loading={loading}
                    showLunchWarning={showLunchWarning}
                    onDismissLunchWarning={() => setShowLunchWarning(false)}
                    onClearFilters={handleClearFilters}
                    onAddLunch={handleAddLunch}
                    onRemoveLunch={handleRemoveLunch}
                    onRetry={handleRetry}
                />
                </div>
            </MainLayoutWrapper>
        </div>
    );
}