// "use client";
// import React from 'react';
// import Link from "next/link";
// import {
//     MapPin,
//     Clock,
//     Play,
//     Map,
//     Wine,
//     Star,
//     ArrowRight,
//     ChevronRight,
//     Train,
//     Building,
//     Landmark,
//     Mountain,
//     Coffee
// } from "lucide-react";
// import {useTripStore} from "@/store/tripStore";
//
// // --- TYPE DEFINITIONS ---
// interface RegionalData {
//     regionName: string;
//     vineyardCount: string;
//     pointsOfInterest: string;
//     subRegionVarietals: {
//         col1: string[];
//         col2: string[];
//     };
//     closestMajorCity: string;
//     closestTravelTime: string;
//     closestLandmark: string;
// }
//
// // --- MOCK DATA ---
// const MOCK_REGION_DATA: RegionalData = {
//     regionName: "CHAMPAGNE",
//     vineyardCount: "200+",
//     pointsOfInterest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
//     subRegionVarietals: {
//         col1: ["MONTAGNE DE REIMS", "CÔTE DES BLANCS", "CÔTE DES BAR"],
//         col2: ["VALLÉE DE LA MARNE", "CÔTE DE SEZANNE"],
//     },
//     closestMajorCity: "Paris, Gare de l'Est, CDG",
//     closestTravelTime: "Paris -> Reims: 45 minutes | Paris -> Épernay: ~ 1h20",
//     closestLandmark: "Reims: Veuve Clicquot, Taittinger, UNESCO Cathedral",
// };
//
// // --- MAIN COMPONENT ---
// const RegionalHighlights: React.FC = () => {
//     const data = MOCK_REGION_DATA;
//     const {region} = useTripStore();
//     if (!region) {
//         return <p className="text-zinc-400">No region selected yet.</p>;
//     }
//
//     return (
//         <div className="w-full p-4 md:p-6 lg:p-8">
//             {/* Header and Region Map Button */}
//             <div className="w-full max-w-4xl mx-auto mb-8 md:mb-12">
//                 <div className="flex flex-row md:flex-row justify-between items-center md:items-center gap-4 md:gap-0">
//                     <div>
//                         <div className="flex items-center gap-2 mb-2">
//                             <div className="h-px w-8 bg-green-500"></div>
//                             <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Wine Region</span>
//                         </div>
//                         <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none">
//                             {region.name}
//                         </h1>
//                     </div>
//
//                     <Link href={"/region-map"}>
//                         <button className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-green-500/50 text-white text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(22,163,74,0.2)]">
//                             <Map className="w-4 h-4" />
//                             REGION MAP
//                             <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                         </button>
//                     </Link>
//                 </div>
//             </div>
//
//             {/* Main Content Grid */}
//             <div className="w-full max-w-4xl mx-auto">
//                 {/* Video Section */}
//                 <div className="mb-8 md:mb-12 rounded-2xl overflow-hidden border border-zinc-800 group">
//                     <div className="relative h-64 md:h-80 bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                         <div className="relative z-20 group-hover:scale-110 transition-transform duration-300">
//                             <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-2xl">
//                                 <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="white" />
//                             </div>
//                         </div>
//                         <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
//                             <p className="text-white font-bold text-lg md:text-xl">Discover {data.regionName}</p>
//                             <p className="text-zinc-400 text-sm md:text-base">Region Introduction Film</p>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Information Grid */}
//                 <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-8 md:mb-12">
//                     {/* Vineyard Count */}
//                     <div className=" bg-zinc-900 p-5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
//                         <div className="flex items-center gap-3 mb-4">
//                             <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
//                                 <Wine className="w-5 h-5 text-green-400" />
//                             </div>
//                             <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">VINEYARD LISTED</h3>
//                         </div>
//                         <p className="text-3xl md:text-4xl font-black text-white mb-2">{data.vineyardCount}</p>
//                         <p className="text-zinc-500 text-sm">Active wineries & estates</p>
//                     </div>
//
//                     {/* Points of Interest */}
//                     <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors md:col-span-2 lg:col-span-1">
//                         <div className="flex items-center gap-3 mb-4">
//                             <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
//                                 <Star className="w-5 h-5 text-blue-400" />
//                             </div>
//                             <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">POINTS OF INTEREST</h3>
//                         </div>
//                         <p className="text-zinc-300 text-base leading-relaxed italic">{data.pointsOfInterest}</p>
//                     </div>
//
//                     {/* Sub Region Varietals */}
//                     <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors md:col-span-2 lg:col-span-3">
//                         <div className="flex items-center gap-3 mb-6">
//                             <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
//                                 <Mountain className="w-5 h-5 text-purple-400" />
//                             </div>
//                             <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">SUB REGION VARIETALS</h3>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
//                             <ul className="space-y-3">
//                                 {data.subRegionVarietals.col1.map((item, index) => (
//                                     <li key={`col1-${index}`} className="flex items-center gap-3 group">
//                                         <div className="w-2 h-2 rounded-full bg-purple-500 group-hover:scale-125 transition-transform"></div>
//                                         <span className="text-white font-medium text-base group-hover:text-purple-300 transition-colors">
//                                             {item}
//                                         </span>
//                                     </li>
//                                 ))}
//                             </ul>
//                             <ul className="space-y-3">
//                                 {data.subRegionVarietals.col2.map((item, index) => (
//                                     <li key={`col2-${index}`} className="flex items-center gap-3 group">
//                                         <div className="w-2 h-2 rounded-full bg-purple-500 group-hover:scale-125 transition-transform"></div>
//                                         <span className="text-white font-medium text-base group-hover:text-purple-300 transition-colors">
//                                             {item}
//                                         </span>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Transportation & Access Cards */}
//                 <div className="mb-12">
//                     <div className="flex items-center gap-3 mb-6">
//                         <div className="h-px w-12 bg-gradient-to-r from-amber-500 to-orange-500"></div>
//                         <h2 className="text-lg font-bold text-white uppercase tracking-wider">Access & Transport</h2>
//                     </div>
//
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
//                         {/* City/Station/Airport */}
//                         <div className=" bg-zinc-900 p-5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
//                             <div className="flex items-center gap-3 mb-4">
//                                 <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
//                                     <MapPin className="w-5 h-5 text-red-400" />
//                                 </div>
//                                 <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">NEAREST HUB</h3>
//                             </div>
//                             <div className="flex items-center gap-3 mb-2">
//                                 <Building className="w-5 h-5 text-zinc-500" />
//                                 <p className="text-white font-medium text-base">{data.closestMajorCity}</p>
//                             </div>
//                             <p className="text-zinc-500 text-sm">Major city, station & airport</p>
//                         </div>
//
//                         {/* Travel Time */}
//                         <div className=" bg-zinc-900 p-5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
//                             <div className="flex items-center gap-3 mb-4">
//                                 <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
//                                     <Clock className="w-5 h-5 text-amber-400" />
//                                 </div>
//                                 <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">TRAVEL DURATION</h3>
//                             </div>
//                             <div className="flex items-center gap-3 mb-2">
//                                 <Train className="w-5 h-5 text-zinc-500" />
//                                 <p className="text-white font-medium text-base">{data.closestTravelTime}</p>
//                             </div>
//                             <p className="text-zinc-500 text-sm">From major transport hubs</p>
//                         </div>
//
//                         {/* Landmarks */}
//                         <div className="p-5 rounded-2xl border bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
//                             <div className="flex items-center gap-3 mb-4">
//                                 <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
//                                     <Landmark className="w-5 h-5 text-emerald-400" />
//                                 </div>
//                                 <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">KEY LANDMARKS</h3>
//                             </div>
//                             <div className="flex items-center gap-3 mb-2">
//                                 <Coffee className="w-5 h-5 text-zinc-500" />
//                                 <p className="text-white font-medium text-base">{data.closestLandmark}</p>
//                             </div>
//                             <p className="text-zinc-500 text-sm">Notable houses & sites</p>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Continue Button */}
//                 <div className="w-full max-w-md mx-auto">
//                     <Link href={"/vineyard"}>
//                         <button className="group w-full py-4 md:py-5 px-6 rounded-2xl bg-gradient-to-r from-white to-zinc-100 hover:from-zinc-100 hover:to-zinc-200 text-black text-base md:text-lg font-black uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-[0.98] flex items-center justify-center gap-3">
//                             <span>CONTINUE TO VINEYARDS</span>
//                             <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
//                         </button>
//                     </Link>
//                     <p className="text-center text-zinc-800 text-sm md:text-base mt-4">
//                         Explore curated vineyards in {data.regionName}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default RegionalHighlights;



/* app/region-highlights/page.tsx */

"use client";
import React from 'react';
import Link from "next/link";
import {
    MapPin,
    Clock,
    Map,
    Wine,
    Star,
    ArrowRight,
    ChevronRight,
    Mountain,
    Timer
} from "lucide-react";
import { useTripStore } from "@/store/tripStore";
import { REGIONAL_HIGHLIGHTS_DATA } from "@/data/regionalHighlights";

const RegionalHighlights = () => {
    const { region } = useTripStore();

    const regionKey = region?.name?.toUpperCase() || "";
    const highlights = REGIONAL_HIGHLIGHTS_DATA[regionKey];

    if (!region) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-black text-base font-bold">No region selected. Please go back.</p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen px-4 py-8 md:px-8 lg:py-12 bg-white">
            <div className="w-full max-w-4xl mx-auto">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 md:mb-14 gap-6">
                <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="h-px w-8 bg-black"></div>
                        <span className="text-black text-sm font-black tracking-widest uppercase">
                            Region Highlight
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight tracking-tight">
                        {highlights ? highlights.regionName : region.name}
                    </h1>
                </div>

                <Link href="/region-map" className="shrink-0 w-full sm:w-auto">
                    <button className="group flex items-center justify-center gap-3 px-6 py-4 bg-white text-black hover:bg-[#F5F5F5] border border-[#E0E0E0] rounded-xl text-base font-bold transition-all tracking-widest w-full sm:w-auto">
                        <Map size={18} />
                        <span>REGION MAP</span>
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </div>

            {/* Content Area */}
            {highlights ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-14 md:mb-16">
                    <div className="md:col-span-3 bg-white p-8 rounded-2xl border border-[#E0E0E0] flex flex-col justify-between shadow-sm">
                        <div className="mb-6">
                            <Wine className="text-black mb-4" size={28} />
                            <h3 className="text-black text-sm font-black uppercase tracking-widest mb-3">Vineyards</h3>
                            <p className="text-6xl font-bold text-black">{highlights.vineyardCount}</p>
                        </div>
                        <p className="text-[#424242] text-sm font-bold uppercase tracking-tight">Verified Listings</p>
                    </div>

                    <div className="md:col-span-9 bg-white p-8 rounded-2xl border border-[#E0E0E0] shadow-sm">
                        <div className="flex items-start gap-5 mb-4">
                            <Star className="text-black mt-1 shrink-0" size={24} />
                            <div className="min-w-0">
                                <h3 className="text-black text-sm font-black uppercase tracking-widest mb-4">Top Attractions</h3>
                                <p className="text-black text-xl md:text-2xl leading-relaxed font-medium not-italic">
                                    {highlights.pointsOfInterest}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-12 bg-white p-8 md:p-10 rounded-3xl border border-[#E0E0E0] shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <Mountain className="text-black" size={24} />
                            <h3 className="text-black text-base font-black uppercase tracking-widest">Varietals & Terroir</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {highlights.subRegionVarietals.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-[#F5F5F5] rounded-xl border border-[#E0E0E0]">
                                    <div className="w-2.5 h-2.5 bg-black rounded-full shrink-0" />
                                    <span className="text-black text-sm font-bold uppercase tracking-wide">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-4 bg-white p-8 rounded-2xl border border-[#E0E0E0] shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <MapPin className="text-black" size={20} />
                            <h4 className="text-black text-sm font-black uppercase tracking-widest">Nearest Hub</h4>
                        </div>
                        <p className="text-black text-xl font-bold tracking-tight leading-snug">{highlights.closestMajorCity}</p>
                    </div>

                    <div className="md:col-span-8 bg-white p-8 rounded-2xl border border-[#E0E0E0] shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="text-black" size={20} />
                            <h4 className="text-black text-sm font-black uppercase tracking-widest">Travel Duration</h4>
                        </div>
                        <p className="text-black text-xl font-bold tracking-tight leading-snug">{highlights.closestTravelTime}</p>
                    </div>
                </div>
            ) : (
                <div className="w-full min-h-[50vh] bg-white border border-[#E0E0E0] rounded-3xl flex flex-col items-center justify-center p-8 text-center mb-14 md:mb-16 shadow-sm">
                    <Timer className="text-black mb-6 animate-pulse" size={48} />
                    <h2 className="text-black text-xl font-black uppercase tracking-widest mb-2">Content Coming Soon</h2>
                    <p className="text-[#424242] text-base font-bold">Terroir data for {region.name} is being curated</p>
                </div>
            )}

            <div className="mt-14 md:mt-16 flex flex-col items-center">
                <Link href="/vineyard" className="w-full max-w-md">
                    <button className="group w-full py-6 bg-black text-white font-black uppercase text-base tracking-widest rounded-xl flex items-center justify-center gap-3 hover:bg-[#424242] transition-all border border-black shadow-sm active:scale-[0.98]">
                        Explore Vineyards
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </Link>
                <p className="mt-6 text-black text-sm font-black uppercase tracking-widest">
                    Discover {highlights ? highlights.regionName : region.name} Estates
                </p>
            </div>

            </div>
        </div>
    );
};

export default RegionalHighlights;