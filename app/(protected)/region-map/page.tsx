/* app/region-map/page.tsx */

"use client";
import React from 'react';
import Link from "next/link";
import { useTripStore } from "@/store/tripStore";
import {ChevronLeft, Map as MapIcon, Compass, Maximize2, Navigation, ArrowRight} from "lucide-react";

const RegionalMap: React.FC = () => {
    const { region } = useTripStore();
    const regionName = region?.name || "CHAMPAGNE";

    // Clean URL for the embed map
    const mapQuery = encodeURIComponent(`${regionName} wine region France`);
    const mapUrl = `https://maps.google.com/maps?q=${mapQuery}&t=k&z=10&ie=UTF8&iwloc=&output=embed`;

    return (
        <div className="flex flex-col h-[90vh] md:h-[85vh] w-full max-w-2xl mx-auto p-4 md:p-6">

            {/* 1. COMPACT HEADER */}
            <div className="flex items-center justify-between w-full mb-6 px-1">
                <Link href="/region-highlights">
                    <button className="group flex items-center gap-2 text-[#424242] hover:text-black transition-colors">
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform text-black" />
                        <span className="text-black text-sm font-black uppercase tracking-widest hidden sm:inline">Back</span>
                    </button>
                </Link>

                <div className="text-center flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-px w-4 bg-black" />
                        <p className="text-xs font-black text-black uppercase tracking-[0.4em]">Cartography</p>
                        <div className="h-px w-4 bg-black" />
                    </div>
                    <h1 className="text-lg md:text-xl font-black text-black uppercase tracking-tighter">
                        {regionName}
                        {/*<span className="text-zinc-500 italic">TERROIR</span>*/}
                    </h1>
                </div>

                {/*<button className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all">*/}
                {/*    <Maximize2 size={18} />*/}
                {/*</button>*/}
            </div>

            {/* 2. ENHANCED MAP CONTAINER */}
            <div className="relative flex-grow w-full rounded-[40px] overflow-hidden border border-[#E0E0E0] bg-[#F5F5F5] shadow-sm group">

                {/* Map Iframe */}
                <div className="absolute inset-0 opacity-70 grayscale-[0.2] contrast-[1.1] transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105">
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        src={mapUrl}
                        title="Regional Map"
                        className="pointer-events-none"
                    ></iframe>
                </div>

                {/* Top UI Overlay: HUD Style */}
                <div className="absolute top-5 left-5 right-5 flex justify-between items-start pointer-events-none">
                    {/*<div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center gap-2">*/}
                    {/*    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />*/}
                    {/*    <span className="text-[9px] font-black text-white tracking-widest uppercase">Live Satellite</span>*/}
                    {/*</div>*/}

                    <div className="p-3 rounded-2xl bg-white/90 border border-[#E0E0E0]">
                        <Compass className="w-5 h-5 text-black animate-[spin_4s_linear_infinite]" />
                    </div>
                </div>

                {/* Bottom Info Card */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] p-5 rounded-3xl bg-white border border-[#E0E0E0] shadow-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-2xl bg-black flex items-center justify-center">
                                <Navigation size={20} className="text-white" />
                            </div>
                            <div>
                                <p className="text-black font-black text-xs uppercase tracking-tight">Active Region</p>
                                <p className="text-[10px] text-[#424242] font-medium uppercase tracking-[0.1em]">{regionName}, France</p>
                            </div>
                        </div>
                        <div className="hidden sm:block text-right">
                            <p className="text-[9px] font-black text-[#424242] uppercase tracking-widest">Scale</p>
                            <p className="text-[10px] text-black font-bold tracking-tighter">1 : 250,000</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. TIGHTER ACTION BAR */}
            <div className="mt-8 flex flex-col items-center gap-4">
                <Link href="/vineyard" className="w-full">
                    <button className="group w-full py-5 rounded-2xl bg-black text-white text-sm font-black uppercase tracking-[0.3em] shadow-sm border border-black hover:bg-[#424242] transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                        Enter Region
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
                <p className="text-xs text-[#424242] font-bold uppercase tracking-widest">Swipe map to explore vineyards</p>
            </div>
        </div>
    );
};

export default RegionalMap;