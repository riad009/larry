/* app/region-map/page.tsx */

"use client";
import React from "react";
import Link from "next/link";
import { useTripStore } from "@/store/tripStore";
import { ChevronLeft, Compass, Navigation, ArrowRight } from "lucide-react";

const MAP_ZOOM = 8;

const RegionalMap: React.FC = () => {
    const { region, country } = useTripStore();
    const regionName = region?.name || "Champagne";
    const countryName = country?.name || "France";

    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(regionName)},${encodeURIComponent(countryName)}&z=${MAP_ZOOM}&output=embed`;

    return (
        <div className="flex flex-col min-h-[90vh] md:min-h-[85vh] w-full max-w-2xl mx-auto p-4 md:p-6">

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
                    </h1>
                </div>
                <div className="w-[72px]" />
            </div>

            {/* 2. INFO BLOCK ABOVE MAP (no overlay) */}
            <div className="w-full mb-4 p-4 rounded-xl bg-white border border-black flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-black flex items-center justify-center">
                        <Navigation size={20} className="text-white" />
                    </div>
                    <div>
                        <p className="text-black font-black text-xs uppercase tracking-tight">Active Region</p>
                        <p className="text-[10px] text-[#424242] font-medium uppercase tracking-[0.1em]">{regionName}, {countryName}</p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[#424242]">
                    <Compass className="w-5 h-5" />
                    <span className="text-[10px] font-bold">Zoom & pan map below</span>
                </div>
            </div>

            {/* 3. MAP CONTAINER – full visibility, no overlays, interactive */}
            <div className="w-full h-[55vh] md:h-[60vh] rounded-xl border border-black overflow-hidden bg-white flex-shrink-0">
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={mapUrl}
                    title="Regional Map"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full block"
                />
            </div>

            {/* 4. Scale / hint below map */}
            <div className="mt-3 text-center">
                <p className="text-[9px] text-[#424242] font-bold uppercase tracking-widest">Map centered on {regionName} · Zoom level {MAP_ZOOM}</p>
            </div>

            {/* 5. ACTION BAR */}
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