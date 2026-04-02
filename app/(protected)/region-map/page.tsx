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
        <div className="flex flex-col min-h-[90vh] md:min-h-[85vh] w-full max-w-2xl mx-auto p-4 md:p-6 animate-fade-in-up">

            {/* 1. COMPACT HEADER */}
            <div className="flex items-center justify-between w-full mb-6 px-1">
                <Link href="/region-highlights">
                    <button className="group flex items-center gap-2 text-warm-gray hover:text-wine-600 transition-colors">
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform text-wine-500" />
                        <span className="text-wine-600 text-sm font-black uppercase tracking-widest hidden sm:inline">Back</span>
                    </button>
                </Link>

                <div className="text-center flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-px w-4 bg-wine-500" />
                        <p className="text-xs font-black text-wine-600 uppercase tracking-[0.4em]">Cartography</p>
                        <div className="h-px w-4 bg-wine-500" />
                    </div>
                    <h1 className="text-lg md:text-xl font-black text-charcoal uppercase tracking-tighter" style={{ fontFamily: 'var(--font-playfair)' }}>
                        {regionName}
                    </h1>
                </div>
                <div className="w-[72px]" />
            </div>

            {/* 2. INFO BLOCK ABOVE MAP */}
            <div className="w-full mb-4 p-4 rounded-xl glass-card flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl gradient-wine flex items-center justify-center shadow-md">
                        <Navigation size={20} className="text-white" />
                    </div>
                    <div>
                        <p className="text-wine-600 font-black text-xs uppercase tracking-tight">Active Region</p>
                        <p className="text-[10px] text-warm-gray font-medium uppercase tracking-[0.1em]">{regionName}, {countryName}</p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-warm-gray">
                    <Compass className="w-5 h-5 text-gold-500" />
                    <span className="text-[10px] font-bold">Zoom & pan map below</span>
                </div>
            </div>

            {/* 3. MAP CONTAINER */}
            <div className="w-full h-[55vh] md:h-[60vh] rounded-xl border border-wine-200 overflow-hidden bg-white flex-shrink-0 shadow-lg">
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
                <p className="text-[9px] text-warm-gray font-bold uppercase tracking-widest">Map centered on {regionName} · Zoom level {MAP_ZOOM}</p>
            </div>

            {/* 5. ACTION BAR */}
            <div className="mt-8 flex flex-col items-center gap-4">
                <Link href="/vineyard" className="w-full">
                    <button className="group w-full py-5 rounded-2xl gradient-cta text-white text-sm font-black uppercase tracking-[0.3em] shadow-lg border-0 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                        Enter Region
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
                <p className="text-xs text-warm-gray font-bold uppercase tracking-widest">Swipe map to explore vineyards</p>
            </div>
        </div>
    );
};

export default RegionalMap;