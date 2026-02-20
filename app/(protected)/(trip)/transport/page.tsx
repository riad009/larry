// "use client";
// import React, { useState, useMemo, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useTripStore } from "@/store/tripStore";
// import { TRANSPORT_OPTIONS } from "@/data/transportData";
// import { TransportOption } from "@/types/transport";
// import { TransportCard } from "@/components/TransportCard";
// import { Car, Train, Bus, Bike, Loader2, Filter, Navigation, ChevronRight, X } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
//
// export default function TransportPage() {
//     const { transport, setTransport, vineyard, lunch } = useTripStore();
//     const router = useRouter();
//     const [loading, setLoading] = useState(true);
//
//     // Load filter states from localStorage or initialize
//     const [filters, setFilters] = useState(() => {
//         if (typeof window !== 'undefined') {
//             const saved = localStorage.getItem('transportFilters');
//             if (saved) {
//                 const parsed = JSON.parse(saved);
//                 return {
//                     type: parsed.type || "ALL",
//                     provider: parsed.provider || "ALL",
//                     cost: parsed.cost || "ALL",
//                 };
//             }
//         }
//         return {
//             type: "ALL",
//             provider: "ALL",
//             cost: "ALL",
//         };
//     });
//
//     const [appliedFilters, setAppliedFilters] = useState<typeof filters | null>(() => {
//         if (typeof window !== 'undefined') {
//             const saved = localStorage.getItem('transportFilters');
//             if (saved) {
//                 const parsed = JSON.parse(saved);
//                 // Only restore applied state if we have active filters
//                 if (parsed.type !== "ALL" || parsed.provider !== "ALL" || parsed.cost !== "ALL") {
//                     return parsed;
//                 }
//             }
//         }
//         return null;
//     });
//
//     // Check if at least one filter is active (not "ALL")
//     const hasActiveFilters = useMemo(() => {
//         return filters.type !== "ALL" || filters.provider !== "ALL" || filters.cost !== "ALL";
//     }, [filters]);
//
//     // Simulate loading
//     useEffect(() => {
//         const timer = setTimeout(() => setLoading(false), 800);
//         return () => clearTimeout(timer);
//     }, []);
//
//     // Save filters to localStorage whenever they change
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             localStorage.setItem('transportFilters', JSON.stringify(filters));
//         }
//     }, [filters]);
//
//     // Save applied filters to localStorage
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             if (appliedFilters) {
//                 localStorage.setItem('transportFilters', JSON.stringify(appliedFilters));
//             } else {
//                 // Only clear if we don't have any active filters
//                 if (filters.type === "ALL" && filters.provider === "ALL" && filters.cost === "ALL") {
//                     localStorage.removeItem('transportFilters');
//                 }
//             }
//         }
//     }, [appliedFilters, filters]);
//
//     // Get unique filter options
//     const typeOptions = useMemo(() => {
//         const uniqueTypes = Array.from(new Set(TRANSPORT_OPTIONS.map(t => t.type)));
//         return [{ key: "ALL", name: "All Types" }, ...uniqueTypes.map(t => ({ key: t, name: t }))];
//     }, []);
//
//     const providerOptions = useMemo(() => {
//         const uniqueProviders = Array.from(new Set(TRANSPORT_OPTIONS.map(t => t.provider)));
//         return [{ key: "ALL", name: "All Providers" }, ...uniqueProviders.map(p => ({ key: p, name: p }))];
//     }, []);
//
//     const costOptions = useMemo(() => {
//         const uniqueCosts = Array.from(new Set(TRANSPORT_OPTIONS.map(t => t.priceRange)));
//         return [{ key: "ALL", name: "All Prices" }, ...uniqueCosts.map(c => ({ key: c, name: c }))];
//     }, []);
//
//     // Filtering Logic
//     const filteredTransport = useMemo(() => {
//         if (!appliedFilters) return [];
//         return TRANSPORT_OPTIONS.filter((t) => {
//             if (appliedFilters.type !== "ALL" && t.type !== appliedFilters.type) return false;
//             if (appliedFilters.provider !== "ALL" && t.provider !== appliedFilters.provider) return false;
//             if (appliedFilters.cost !== "ALL" && t.priceRange !== appliedFilters.cost) return false;
//             return true;
//         }).slice(0, 6); // Limit to 6 results
//     }, [appliedFilters]);
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
//             type: "ALL",
//             provider: "ALL",
//             cost: "ALL",
//         };
//         setFilters(defaultFilters);
//         setAppliedFilters(null);
//         if (typeof window !== 'undefined') {
//             localStorage.removeItem('transportFilters');
//         }
//     };
//
//     // Loading state
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
//                                         <div className="p-4">
//                                             <div className="h-6 bg-zinc-800 rounded mb-2 w-3/4"></div>
//                                             <div className="h-4 bg-zinc-800 rounded mb-3 w-1/2"></div>
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
//                                     <Car className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-green-500" />
//                                 </div>
//                             </div>
//                             <h1 className="text-2xl font-bold text-white mb-2">Loading Transport</h1>
//                             <p className="text-zinc-400 text-sm">Finding the best routes for your trip...</p>
//                         </div>
//
//                         {/* Loading filters skeleton */}
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
//                         {/* Loading cards skeleton */}
//                         <div className="w-full max-w-sm space-y-4">
//                             {[1, 2, 3].map((i) => (
//                                 <div key={i} className="w-full bg-zinc-900/30 rounded-2xl overflow-hidden border border-zinc-800 animate-pulse">
//                                     <div className="p-4">
//                                         <div className="h-6 bg-zinc-800 rounded mb-2 w-3/4"></div>
//                                         <div className="h-4 bg-zinc-800 rounded mb-3 w-1/2"></div>
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
//                                     <h2 className="text-lg font-bold text-white">Filter Transport</h2>
//                                 </div>
//
//                                 <div className="space-y-6">
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
//                                         <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2 block">Provider</label>
//                                         <select
//                                             value={filters.provider}
//                                             onChange={e => setFilters(prev => ({ ...prev, provider: e.target.value }))}
//                                             className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-xl text-sm h-12 outline-none hover:border-zinc-600 focus:border-green-500 transition-colors"
//                                         >
//                                             {providerOptions.map(opt => (
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
//                                         href="/plan"
//                                         className={`flex-1 ${!transport ? 'pointer-events-none' : ''}`}
//                                     >
//                                         <Button
//                                             disabled={!transport}
//                                             className={`w-full font-bold h-14 rounded-xl text-base transition-all shadow-lg ${
//                                                 transport
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
//                                             {appliedFilters.type !== "ALL" && (
//                                                 <span className="px-3 py-2 bg-green-500/20 text-green-400 text-sm rounded-lg border border-green-500/30 flex items-center gap-2">
//                                                     Type: {appliedFilters.type}
//                                                     <button
//                                                         onClick={() => setFilters(prev => ({ ...prev, type: "ALL" }))}
//                                                         className="hover:text-green-300"
//                                                     >
//                                                         <X className="w-3 h-3" />
//                                                     </button>
//                                                 </span>
//                                             )}
//                                             {appliedFilters.provider !== "ALL" && (
//                                                 <span className="px-3 py-2 bg-blue-500/20 text-blue-400 text-sm rounded-lg border border-blue-500/30 flex items-center gap-2">
//                                                     Provider: {appliedFilters.provider}
//                                                     <button
//                                                         onClick={() => setFilters(prev => ({ ...prev, provider: "ALL" }))}
//                                                         className="hover:text-blue-300"
//                                                     >
//                                                         <X className="w-3 h-3" />
//                                                     </button>
//                                                 </span>
//                                             )}
//                                             {appliedFilters.cost !== "ALL" && (
//                                                 <span className="px-3 py-2 bg-amber-500/20 text-amber-400 text-sm rounded-lg border border-amber-500/30 flex items-center gap-2">
//                                                     Price: {appliedFilters.cost}
//                                                     <button
//                                                         onClick={() => setFilters(prev => ({ ...prev, cost: "ALL" }))}
//                                                         className="hover:text-amber-300"
//                                                     >
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
//                         </div>
//                     </div>
//
//                     {/* Main Content */}
//                     <div className="flex-1">
//                         {/* Header */}
//                         <div className="mb-6">
//                             <h1 className="text-3xl font-bold text-white mb-2">Transport Options</h1>
//                             <p className="text-zinc-400">Choose how to travel between your selected destinations</p>
//                         </div>
//
//                         {/* Results Info */}
//                         <div className="mb-6 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     {!appliedFilters ? (
//                                         <div className="flex items-center gap-3">
//                                             <Car className="w-5 h-5 text-green-500" />
//                                             <p className="text-zinc-400">
//                                                 Select filters to discover from <span className="text-white font-bold">{TRANSPORT_OPTIONS.length}</span> transport options
//                                             </p>
//                                         </div>
//                                     ) : (
//                                         <div className="flex items-center gap-3">
//                                             <Filter className="w-5 h-5 text-green-500" />
//                                             <p className="text-zinc-400">
//                                                 Showing <span className="text-white font-bold">{filteredTransport.length}</span> of <span className="text-white font-bold">{TRANSPORT_OPTIONS.length}</span> options
//                                             </p>
//                                         </div>
//                                     )}
//                                 </div>
//                                 {appliedFilters && filteredTransport.length > 0 && (
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
//                                         <Car className="w-12 h-12 text-zinc-600" />
//                                     </div>
//                                     <h3 className="text-xl font-bold text-white mb-2">Start Exploring</h3>
//                                     <p className="text-zinc-400 mb-4">Use the filters to discover transport matching your preferences</p>
//                                     <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm">
//                                         <Navigation className="w-4 h-4" />
//                                         <span>{TRANSPORT_OPTIONS.length} options available</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         ) : filteredTransport.length === 0 ? (
//                             <div className="text-center py-12">
//                                 <div className="max-w-md mx-auto p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800">
//                                     <div className="p-4 bg-zinc-800/50 rounded-2xl inline-block mb-4">
//                                         <Navigation className="w-12 h-12 text-zinc-600" />
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
//                         ) : (
//                             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//                                 {filteredTransport.map((option) => (
//                                     <div key={option.id} className="transform transition-transform duration-300 hover:scale-[1.02]">
//                                         <TransportCard
//                                             key={option.id}
//                                             option={option}
//                                             onAdd={() => setTransport(option)}
//                                             isSelected={transport?.id === option.id}
//                                             onRemove={() => setTransport(null)}
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
//                 <div className="w-full max-w-sm p-4 bg-zinc-900 rounded-3xl mb-6 border border-zinc-800">
//                     <div className="flex items-center gap-2 mb-4">
//                         <Filter className="w-4 h-4 text-green-500" />
//                         <h2 className="text-sm font-bold text-white uppercase tracking-wider">Filter Transport</h2>
//                     </div>
//
//                     <div className="flex flex-row gap-2 mb-4">
//                         <div className="flex-1">
//                             <label className="text-[12px] font-bold text-zinc-500 uppercase ml-1 mb-1 block">TYPE</label>
//                             <select
//                                 value={filters.type}
//                                 onChange={e => setFilters(prev => ({ ...prev, type: e.target.value }))}
//                                 className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded-lg text-[11px] h-9 outline-none hover:border-zinc-600 transition-colors"
//                             >
//                                 {typeOptions.map(opt => (
//                                     <option key={opt.key} value={opt.key}>{opt.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="flex-1">
//                             <label className="text-[12px] font-bold text-zinc-500 uppercase ml-1 mb-1 block">PROVIDER</label>
//                             <select
//                                 value={filters.provider}
//                                 onChange={e => setFilters(prev => ({ ...prev, provider: e.target.value }))}
//                                 className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded-lg text-[11px] h-9 outline-none hover:border-zinc-600 transition-colors"
//                             >
//                                 {providerOptions.map(opt => (
//                                     <option key={opt.key} value={opt.key}>{opt.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="flex-1">
//                             <label className="text-[12px] font-bold text-zinc-500 uppercase ml-1 mb-1 block">COST</label>
//                             <select
//                                 value={filters.cost}
//                                 onChange={e => setFilters(prev => ({ ...prev, cost: e.target.value }))}
//                                 className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded-lg text-[11px] h-9 outline-none hover:border-zinc-600 transition-colors"
//                             >
//                                 {costOptions.map(opt => (
//                                     <option key={opt.key} value={opt.key}>{opt.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>
//
//                     <div className="flex gap-3">
//                         <Button
//                             onClick={handleApplyFilters}
//                             disabled={!hasActiveFilters}
//                             className={`flex-1 font-bold h-12 rounded-xl transition-all duration-300 shadow-lg text-sm ${
//                                 hasActiveFilters
//                                     ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 hover:shadow-green-500/20'
//                                     : 'bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed'
//                             }`}
//                         >
//                             APPLY FILTERS
//                         </Button>
//
//                         <Link
//                             href="/plan"
//                             className={`flex-1 ${!transport ? 'pointer-events-none' : ''}`}
//                         >
//                             <Button
//                                 disabled={!transport}
//                                 className={`w-full font-bold h-12 rounded-xl transition-all shadow-lg text-sm ${
//                                     transport
//                                         ? 'bg-gradient-to-r from-white to-zinc-100 hover:from-zinc-100 hover:to-zinc-200 text-black opacity-100 hover:shadow-white/20'
//                                         : 'bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed'
//                                 }`}
//                             >
//                                 CONTINUE
//                                 <ChevronRight className="ml-1 w-4 h-4" />
//                             </Button>
//                         </Link>
//                     </div>
//
//                     {/* Applied filters indicator */}
//                     {appliedFilters && (
//                         <div className="mt-4 pt-4 border-t border-zinc-800">
//                             <p className="text-xs text-zinc-400 mb-2">Applied filters:</p>
//                             <div className="flex flex-wrap gap-2">
//                                 {appliedFilters.type !== "ALL" && (
//                                     <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-lg border border-green-500/30">
//                                         Type: {appliedFilters.type}
//                                     </span>
//                                 )}
//                                 {appliedFilters.provider !== "ALL" && (
//                                     <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-lg border border-blue-500/30">
//                                         Provider: {appliedFilters.provider}
//                                     </span>
//                                 )}
//                                 {appliedFilters.cost !== "ALL" && (
//                                     <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-lg border border-amber-500/30">
//                                         Price: {appliedFilters.cost}
//                                     </span>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//
//                 {/* Results Section */}
//                 <div className="w-full max-w-sm space-y-4 pb-20">
//                     {!appliedFilters && (
//                         <div className="text-center py-8">
//                             <div className="p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800 mb-4">
//                                 <Car className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
//                                 <p className="text-zinc-400 text-sm mb-2">Select filters and click Apply to find transport</p>
//                                 <p className="text-zinc-500 text-xs">Found {TRANSPORT_OPTIONS.length} transport options</p>
//                             </div>
//                         </div>
//                     )}
//
//                     {appliedFilters && filteredTransport.length === 0 && (
//                         <div className="text-center py-8">
//                             <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
//                                 <Navigation className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
//                                 <p className="text-zinc-400 text-sm mb-2">No transport options match these criteria</p>
//                                 <p className="text-zinc-500 text-xs">Try adjusting your filters</p>
//                             </div>
//                         </div>
//                     )}
//
//                     {appliedFilters && filteredTransport.length > 0 && (
//                         <>
//                             <div className="mb-4">
//                                 <div className="flex items-center justify-between">
//                                     <p className="text-sm font-bold text-zinc-400">
//                                         Showing {filteredTransport.length} of {TRANSPORT_OPTIONS.length} options
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
//                             {filteredTransport.map((option) => (
//                                 <TransportCard
//                                     key={option.id}
//                                     option={option}
//                                     onAdd={() => setTransport(option)}
//                                     isSelected={transport?.id === option.id}
//                                     onRemove={() => setTransport(null)}
//                                 />
//                             ))}
//                         </>
//                     )}
//
//                     {/* Selected transport indicator */}
//                     {transport && (
//                         <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-zinc-900 to-black border border-green-500/30">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <p className="text-xs font-bold text-green-400 uppercase tracking-wider mb-1">SELECTED TRANSPORT</p>
//                                     <p className="text-base font-bold text-white">
//                                         {transport?.type} – {transport?.provider}
//                                     </p>
//                                 </div>
//                                 <ChevronRight className="w-5 h-5 text-green-400" />
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }



"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTripStore } from "@/store/tripStore";
import { TRANSPORT_OPTIONS } from "@/data/transportData";
import { TransportOption } from "@/types/transport";
import { TransportCard } from "@/components/TransportCard";
import { Button } from "@/components/ui/button";
import {
    TransportFiltersSidebar,
    TransportFiltersMobile,
    TransportLayout,
    TransportLoadingSkeleton,
    TransportResultsHeader,
    TransportEmptyState,
    TransportGrid,
    TransportSelectedIndicator,
} from "@/components/transport";

export default function TransportPage() {
    const { transport, setTransport } = useTripStore();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    // Load filter states from localStorage or initialize
    const [filters, setFilters] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("transportFilters");
            if (saved) {
                const parsed = JSON.parse(saved);
                return {
                    type: parsed.type || "ALL",
                    provider: parsed.provider || "ALL",
                    cost: parsed.cost || "ALL",
                };
            }
        }
        return {
            type: "ALL",
            provider: "ALL",
            cost: "ALL",
        };
    });

    const [appliedFilters, setAppliedFilters] = useState<typeof filters | null>(
        () => {
            if (typeof window !== "undefined") {
                const saved = localStorage.getItem("transportFilters");
                if (saved) {
                    const parsed = JSON.parse(saved);
                    // Only restore applied state if we have active filters
                    if (
                        parsed.type !== "ALL" ||
                        parsed.provider !== "ALL" ||
                        parsed.cost !== "ALL"
                    ) {
                        return parsed;
                    }
                }
            }
            return null;
        }
    );

    // Check if at least one filter is active (not "ALL")
    const hasActiveFilters = useMemo(() => {
        return (
            filters.type !== "ALL" ||
            filters.provider !== "ALL" ||
            filters.cost !== "ALL"
        );
    }, [filters]);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // Save filters to localStorage whenever they change
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("transportFilters", JSON.stringify(filters));
        }
    }, [filters]);

    // Save applied filters to localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (appliedFilters) {
                localStorage.setItem("transportFilters", JSON.stringify(appliedFilters));
            } else {
                // Only clear if we don't have any active filters
                if (
                    filters.type === "ALL" &&
                    filters.provider === "ALL" &&
                    filters.cost === "ALL"
                ) {
                    localStorage.removeItem("transportFilters");
                }
            }
        }
    }, [appliedFilters, filters]);

    // Get unique filter options
    const typeOptions = useMemo(() => {
        const uniqueTypes = Array.from(
            new Set(TRANSPORT_OPTIONS.map((t) => t.type))
        );
        return [
            { key: "ALL", name: "All Types" },
            ...uniqueTypes.map((t) => ({ key: t, name: t })),
        ];
    }, []);

    const providerOptions = useMemo(() => {
        const uniqueProviders = Array.from(
            new Set(TRANSPORT_OPTIONS.map((t) => t.provider))
        );
        return [
            { key: "ALL", name: "All Providers" },
            ...uniqueProviders.map((p) => ({ key: p, name: p })),
        ];
    }, []);

    const costOptions = useMemo(() => {
        const uniqueCosts = Array.from(
            new Set(TRANSPORT_OPTIONS.map((t) => t.priceRange))
        );
        return [
            { key: "ALL", name: "All Prices" },
            ...uniqueCosts.map((c) => ({ key: c, name: c })),
        ];
    }, []);

    // Filtering Logic
    const filteredTransport = useMemo(() => {
        if (!appliedFilters) return [];
        return TRANSPORT_OPTIONS.filter((t) => {
            if (appliedFilters.type !== "ALL" && t.type !== appliedFilters.type)
                return false;
            if (
                appliedFilters.provider !== "ALL" &&
                t.provider !== appliedFilters.provider
            )
                return false;
            if (
                appliedFilters.cost !== "ALL" &&
                t.priceRange !== appliedFilters.cost
            )
                return false;
            return true;
        }).slice(0, 6); // Limit to 6 results
    }, [appliedFilters]);

    const handleApplyFilters = () => {
        if (hasActiveFilters) {
            const newApplied = { ...filters };
            setAppliedFilters(newApplied);
        }
    };

    const handleClearFilters = () => {
        const defaultFilters = {
            type: "ALL",
            provider: "ALL",
            cost: "ALL",
        };
        setFilters(defaultFilters);
        setAppliedFilters(null);
        if (typeof window !== "undefined") {
            localStorage.removeItem("transportFilters");
        }
    };

    const handleFilterChange = (key: "type" | "provider" | "cost", value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleRemoveFilter = (key: "type" | "provider" | "cost") => {
        setFilters((prev) => ({ ...prev, [key]: "ALL" }));
    };

    const handleSelectTransport = (option: TransportOption) => {
        setTransport(option);
    };

    const handleDeselectTransport = () => {
        setTransport(null);
    };

    // Loading state
    if (loading) {
        return <TransportLoadingSkeleton />;
    }

    return (
        <div className="min-h-screen text-white p-4 md:p-6 lg:p-8">
            {/* Desktop Layout */}
            <TransportLayout isDesktop={true}>
                <TransportFiltersSidebar
                    filters={filters}
                    appliedFilters={appliedFilters}
                    hasActiveFilters={hasActiveFilters}
                    onFilterChange={handleFilterChange}
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearFilters}
                    onRemoveFilter={handleRemoveFilter}
                    typeOptions={typeOptions}
                    providerOptions={providerOptions}
                    costOptions={costOptions}
                    selectedTransport={transport}
                />

                {/* Main Content */}
                <div className="flex-1">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Transport Options
                        </h1>
                        <p className="text-zinc-400">
                            Choose how to travel between your selected destinations
                        </p>
                    </div>

                    {/* Results Info */}
                    <TransportResultsHeader
                        appliedFilters={appliedFilters}
                        filteredCount={filteredTransport.length}
                        totalCount={TRANSPORT_OPTIONS.length}
                        onClearFilters={handleClearFilters}
                        isMobile={false}
                    />

                    {/* Results Content */}
                    {!appliedFilters ? (
                        <TransportEmptyState
                            state="initial"
                            totalCount={TRANSPORT_OPTIONS.length}
                            isMobile={false}
                        />
                    ) : filteredTransport.length === 0 ? (
                        <TransportEmptyState
                            state="noResults"
                            totalCount={TRANSPORT_OPTIONS.length}
                            onClearFilters={handleClearFilters}
                            isMobile={false}
                        />
                    ) : (
                        <TransportGrid
                            transportOptions={filteredTransport}
                            selectedTransport={transport}
                            onSelectTransport={handleSelectTransport}
                            onDeselectTransport={handleDeselectTransport}
                            isMobile={false}
                        />
                    )}
                </div>
            </TransportLayout>

            {/* Mobile Layout */}
            <TransportLayout isDesktop={false}>
                <TransportFiltersMobile
                    filters={filters}
                    appliedFilters={appliedFilters}
                    hasActiveFilters={hasActiveFilters}
                    onFilterChange={handleFilterChange}
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearFilters}
                    typeOptions={typeOptions}
                    providerOptions={providerOptions}
                    costOptions={costOptions}
                    selectedTransport={transport}
                />

                {/* Results Section */}
                <div className="w-full max-w-sm space-y-4 pb-20">
                    {!appliedFilters ? (
                        <TransportEmptyState
                            state="initial"
                            totalCount={TRANSPORT_OPTIONS.length}
                            isMobile={true}
                        />
                    ) : filteredTransport.length === 0 ? (
                        <TransportEmptyState
                            state="noResults"
                            totalCount={TRANSPORT_OPTIONS.length}
                            isMobile={true}
                        />
                    ) : (
                        <>
                            <TransportResultsHeader
                                appliedFilters={appliedFilters}
                                filteredCount={filteredTransport.length}
                                totalCount={TRANSPORT_OPTIONS.length}
                                onClearFilters={handleClearFilters}
                                isMobile={true}
                            />

                            <TransportGrid
                                transportOptions={filteredTransport}
                                selectedTransport={transport}
                                onSelectTransport={handleSelectTransport}
                                onDeselectTransport={handleDeselectTransport}
                                isMobile={true}
                            />
                        </>
                    )}

                    {/* Selected transport indicator */}
                    <TransportSelectedIndicator
                        selectedTransport={transport}
                        isMobile={true}
                    />
                </div>
            </TransportLayout>
        </div>
    );
}