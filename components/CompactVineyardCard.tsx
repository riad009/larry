"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MapPin, ChevronDown, ChevronUp, Loader2, X, ExternalLink, Clock, InstagramIcon } from "lucide-react";
import { VineyardExperience, VineyardOffer } from "@/types/vineyard";

interface CompactVineyardCardProps {
    vineyard: VineyardExperience;
    loadOffers: (id: string) => Promise<VineyardOffer[]>;
    onAdd: (v: VineyardExperience) => void;
    onRemove: (id: string) => void;
    isSelected: boolean;
    adminMode?: boolean;
    onSave?: (updated: VineyardExperience) => void;
    onDelete?: (id: string) => void;
}

const VINEYARD_PLACEHOLDER = "/images/vineyard-placeholder2.jpg";

export default function CompactVineyardCard({
                                                vineyard,
                                                loadOffers,
                                                onAdd,
                                                onRemove,
                                                isSelected,
                                                adminMode = false
                                            }: CompactVineyardCardProps) {
    const [expanded, setExpanded] = useState<number>(0);
    const [offers, setOffers] = useState<VineyardOffer[]>([]);
    const [loading, setLoading] = useState(false);
    const name = (vineyard as any).Vineyard ?? vineyard.name ?? "";
    const lat = typeof vineyard.latitude === "number" && Number.isFinite(vineyard.latitude) ? vineyard.latitude : null;
    const lng = typeof vineyard.longitude === "number" && Number.isFinite(vineyard.longitude) ? vineyard.longitude : null;
    const [imgSrc, setImgSrc] = useState<string>(() =>
        name && String(name).trim() && lat != null && lng != null
            ? `/api/place-photo?name=${encodeURIComponent(String(name).trim())}&lat=${lat}&lng=${lng}`
            : VINEYARD_PLACEHOLDER
    );

    const toggleExpand = async (targetLevel?: number) => {
        const nextLevel = targetLevel !== undefined ? targetLevel : (expanded === 2 ? 0 : expanded + 1);
        setExpanded(nextLevel);
        if (nextLevel === 2 && offers.length === 0) {
            setLoading(true);
            const data = await loadOffers(vineyard.id);
            setOffers(data);
            setLoading(false);
        }
    };

    const priceDisplay = vineyard.lowestCost === 0 && vineyard.highestCost === 0
        ? "N/A"
        : `€${vineyard.lowestCost}-${vineyard.highestCost}`;

    const location = [vineyard.subRegion, vineyard.commune].filter(Boolean).join(", ");

    const cardClasses = `
    rounded-2xl border transition-all duration-300 bg-white/70 backdrop-blur-sm w-full min-w-0 max-w-full overflow-hidden hover-lift
    ${isSelected
        ? "border-wine-500 shadow-md ring-2 ring-wine-500/20"
        : "border-warm-border hover:border-wine-200"
    }
  `;

    return (
        <div className={cardClasses}>
            <div className="p-3">
                <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 min-w-0">
                            <h3 className="text-charcoal font-medium text-sm truncate min-w-0">
                                {vineyard.name}
                            </h3>
                            {isSelected && (
                                <span className="text-[10px] font-bold bg-wine-500 text-white px-1.5 py-0.5 rounded">
                  ✓
                </span>
                            )}
                        </div>

                        {location && (
                            <div className="flex items-center gap-1 text-warm-gray text-xs">
                                <MapPin size={10} className="text-wine-400" />
                                <span className="truncate">{location}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="text-right min-w-[60px]">
                            <p className="text-charcoal text-sm font-semibold">
                                {priceDisplay}
                            </p>
                            <p className="text-warm-gray text-[10px]">PRICE</p>
                        </div>

                        <div className="flex items-center gap-1">
                            {!isSelected ? (
                                <button
                                    onClick={() => onAdd(vineyard)}
                                    className="px-2.5 py-1 text-xs font-semibold rounded-lg gradient-cta text-white active:scale-95 transition-all duration-150 whitespace-nowrap border-0 shadow-sm"
                                >
                                    Add
                                </button>
                            ) : (
                                <button
                                    onClick={() => onRemove(vineyard.id)}
                                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white text-wine-600 border-2 border-wine-500 hover:bg-wine-50 flex items-center gap-1 whitespace-nowrap transition-all duration-150"
                                >
                                    <span>Remove</span>
                                    <X size={11} />
                                </button>
                            )}

                            <button
                                onClick={() => toggleExpand()}
                                className="p-1.5 rounded-lg bg-cream border border-warm-border hover:bg-wine-50 text-wine-500 transition-colors duration-150"
                                aria-label={expanded > 0 ? "Collapse" : "Expand"}
                            >
                                {expanded > 0 ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {expanded >= 1 && (
                <div className="px-3 pb-3 border-t border-warm-border">
                    <div className="relative w-full h-32 bg-cream rounded-xl overflow-hidden mb-3 mt-3">
                        <Image
                            src={imgSrc}
                            alt={vineyard.name}
                            fill
                            sizes="(max-width: 640px) 100vw, 300px"
                            className="object-cover"
                            priority={false}
                            onError={() => setImgSrc(VINEYARD_PLACEHOLDER)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-wine-900/20 to-transparent" />

                        {isSelected && (
                            <div className="absolute top-2 left-2 gradient-wine px-2 py-1 rounded-lg text-[10px] font-bold text-white shadow-sm">
                                Selected
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {(vineyard.instagram ?? "").trim().length > 0 && (
                            <a
                                href={(vineyard.instagram ?? "").trim()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-charcoal bg-white/80 border border-warm-border hover:bg-wine-50 hover:border-wine-200 px-3 py-2 rounded-lg transition-all duration-150"
                            >
                                <InstagramIcon size={12} />
                                Instagram
                            </a>
                        )}

                        {(vineyard.gkp ?? vineyard.gkp2 ?? "").trim().length > 0 && (
                            <button
                                onClick={() => window.open((vineyard.gkp ?? vineyard.gkp2 ?? "").trim(), "_blank")}
                                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-charcoal bg-white/80 border border-warm-border hover:bg-wine-50 hover:border-wine-200 px-3 py-2 rounded-lg transition-colors duration-150"
                            >
                                <MapPin size={12} />
                                Contact
                            </button>
                        )}
                    </div>

                    {expanded === 1 && (
                        <div className="mt-3 flex justify-center">
                            <button
                                onClick={() => toggleExpand(2)}
                                className="text-xs font-semibold text-wine-600 hover:text-wine-700 flex items-center gap-1 transition-colors duration-150"
                            >
                                Show Highlights & Experiences
                                <ChevronDown size={12} />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {expanded === 2 && (
                <div className="px-3 pb-3 border-t border-warm-border pt-3">
                    <div className="flex justify-end mb-3">
                        <button
                            onClick={() => toggleExpand(1)}
                            className="text-xs font-semibold text-warm-gray hover:text-wine-600 flex items-center gap-1 transition-colors duration-150"
                        >
                            Show Less
                            <ChevronUp size={12} />
                        </button>
                    </div>

                    {(vineyard.highlights?.length ?? 0) > 0 && (
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-0.5 bg-wine-500"></div>
                                <p className="text-xs font-bold text-wine-600 uppercase tracking-wider">
                                    Highlights
                                </p>
                            </div>

                            <div className="space-y-1.5">
                                {vineyard.highlights?.slice(0, 3).map((h, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-2 px-2 py-1.5 bg-wine-50 rounded-lg border border-wine-100"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-wine-500 mt-1 flex-shrink-0"></div>
                                        <span className="text-[13px] text-charcoal leading-relaxed">{h}</span>
                                    </div>
                                ))}
                            </div>

                            {vineyard.highlights && vineyard.highlights.length > 3 && (
                                <p className="text-xs text-warm-gray text-center mt-2">
                                    + {vineyard.highlights.length - 3} more highlights
                                </p>
                            )}
                        </div>
                    )}

                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-0.5 bg-gold-500"></div>
                            <p className="text-xs font-bold text-wine-600 uppercase tracking-wider">
                                Experiences
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center gap-2 text-warm-gray py-4">
                                <Loader2 className="animate-spin text-wine-500" size={14} />
                                <span className="text-sm">Loading experiences...</span>
                            </div>
                        ) : offers.length > 0 ? (
                            <div className="space-y-2">
                                {offers.slice(0, 3).map(o => (
                                    <div key={o.id} className="bg-white/80 rounded-xl p-2.5 border border-warm-border">
                                        <div className="flex justify-between items-start mb-1.5">
                                            <div className="flex-1 pr-2">
                                                <p className="font-semibold text-[13px] text-charcoal mb-1">{o.title}</p>
                                                <div className="flex items-center gap-2">
                                                    {o.duration && (
                                                        <div className="flex items-center gap-1 text-warm-gray text-xs">
                                                            <Clock size={10} />
                                                            <span>{o.duration} min</span>
                                                        </div>
                                                    )}
                                                    {o.type && (
                                                        <span className="text-[10px] font-medium bg-wine-50 border border-wine-100 text-wine-600 px-1.5 py-0.5 rounded">
                              {o.type}
                            </span>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="font-bold text-wine-600 text-[13px]">
                        {o.price > 0 ? `€${o.price}` : "N/A"}
                      </span>
                                        </div>
                                    </div>
                                ))}

                                {offers.length > 3 && (
                                    <div className="text-center pt-1">
                                        <button
                                            onClick={() => toggleExpand(2)}
                                            className="text-xs text-wine-500 hover:text-wine-700 transition-colors"
                                        >
                                            View all {offers.length} experiences
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-cream rounded-xl p-3 border border-warm-border text-center">
                                <p className="text-[13px] italic text-warm-gray">
                                    Contact winery for experience details
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}