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
    const [expanded, setExpanded] = useState<number>(0); // 0 = collapsed, 1 = basic info, 2 = full details
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

        // Load offers when expanding to level 2
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
    rounded-lg border transition-all duration-300 bg-white w-full min-w-0 max-w-full overflow-hidden
    ${isSelected
        ? "border-black shadow-md ring-2 ring-black/20"
        : "border-[#E0E0E0] hover:border-[#9E9E9E]"
    }
  `;

    return (
        <div className={cardClasses}>
            <div className="p-3">
                <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 min-w-0">
                            <h3 className="text-black font-medium text-sm truncate min-w-0">
                                {vineyard.name}
                            </h3>
                            {isSelected && (
                                <span className="text-[10px] font-bold bg-black text-white px-1.5 py-0.5 rounded">
                  ✓
                </span>
                            )}
                        </div>

                        {location && (
                            <div className="flex items-center gap-1 text-[#424242] text-xs">
                                <MapPin size={10} />
                                <span className="truncate">{location}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="text-right min-w-[60px]">
                            <p className="text-black text-sm font-semibold">
                                {priceDisplay}
                            </p>
                            <p className="text-[#424242] text-[10px]">PRICE</p>
                        </div>

                        <div className="flex items-center gap-1">
                            {!isSelected ? (
                                <button
                                    onClick={() => onAdd(vineyard)}
                                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-black text-white hover:bg-[#424242] active:scale-95 transition-all duration-150 whitespace-nowrap border border-black"
                                >
                                    Add
                                </button>
                            ) : (
                                <button
                                    onClick={() => onRemove(vineyard.id)}
                                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white text-black border-2 border-black hover:bg-[#F5F5F5] flex items-center gap-1 whitespace-nowrap transition-all duration-150"
                                >
                                    <span>Remove</span>
                                    <X size={11} />
                                </button>
                            )}

                            <button
                                onClick={() => toggleExpand()}
                                className="p-1.5 rounded-md bg-[#F5F5F5] border border-[#E0E0E0] hover:bg-[#E0E0E0] text-black transition-colors duration-150"
                                aria-label={expanded > 0 ? "Collapse" : "Expand"}
                            >
                                {expanded > 0 ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {expanded >= 1 && (
                <div className="px-3 pb-3 border-t border-[#E0E0E0]">
                    <div className="relative w-full h-32 bg-[#F5F5F5] rounded-md overflow-hidden mb-3">
                        <Image
                            src={imgSrc}
                            alt={vineyard.name}
                            fill
                            sizes="(max-width: 640px) 100vw, 300px"
                            className="object-cover"
                            priority={false}
                            onError={() => setImgSrc(VINEYARD_PLACEHOLDER)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                        {isSelected && (
                            <div className="absolute top-2 left-2 bg-black px-2 py-1 rounded text-[10px] font-bold text-white border border-[#E0E0E0]">
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
                                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-black bg-white border border-[#E0E0E0] hover:bg-[#F5F5F5] px-3 py-2 rounded-md transition-all duration-150"
                            >
                                <InstagramIcon size={12} />
                                Instagram
                            </a>
                        )}

                        {(vineyard.gkp ?? vineyard.gkp2 ?? "").trim().length > 0 && (
                            <button
                                onClick={() => window.open((vineyard.gkp ?? vineyard.gkp2 ?? "").trim(), "_blank")}
                                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-black bg-white border border-[#E0E0E0] hover:bg-[#F5F5F5] px-3 py-2 rounded-md transition-colors duration-150"
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
                                className="text-xs font-semibold text-black hover:underline flex items-center gap-1 transition-colors duration-150"
                            >
                                Show Highlights & Experiences
                                <ChevronDown size={12} />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {expanded === 2 && (
                <div className="px-3 pb-3 border-t border-[#E0E0E0] pt-3">
                    <div className="flex justify-end mb-3">
                        <button
                            onClick={() => toggleExpand(1)}
                            className="text-xs font-semibold text-[#424242] hover:text-black flex items-center gap-1 transition-colors duration-150"
                        >
                            Show Less
                            <ChevronUp size={12} />
                        </button>
                    </div>

                    {(vineyard.highlights?.length ?? 0) > 0 && (
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-0.5 bg-black"></div>
                                <p className="text-xs font-bold text-black uppercase tracking-wider">
                                    Highlights
                                </p>
                            </div>

                            <div className="space-y-1.5">
                                {vineyard.highlights?.slice(0, 3).map((h, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-2 px-2 py-1.5 bg-[#F5F5F5] rounded-md border border-[#E0E0E0]"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-black mt-1 flex-shrink-0"></div>
                                        <span className="text-[13px] text-black leading-relaxed">{h}</span>
                                    </div>
                                ))}
                            </div>

                            {vineyard.highlights && vineyard.highlights.length > 3 && (
                                <p className="text-xs text-[#424242] text-center mt-2">
                                    + {vineyard.highlights.length - 3} more highlights
                                </p>
                            )}
                        </div>
                    )}

                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-0.5 bg-black"></div>
                            <p className="text-xs font-bold text-black uppercase tracking-wider">
                                Experiences
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center gap-2 text-[#424242] py-4">
                                <Loader2 className="animate-spin" size={14} />
                                <span className="text-sm">Loading experiences...</span>
                            </div>
                        ) : offers.length > 0 ? (
                            <div className="space-y-2">
                                {offers.slice(0, 3).map(o => (
                                    <div key={o.id} className="bg-white rounded-md p-2.5 border border-[#E0E0E0]">
                                        <div className="flex justify-between items-start mb-1.5">
                                            <div className="flex-1 pr-2">
                                                <p className="font-semibold text-[13px] text-black mb-1">{o.title}</p>
                                                <div className="flex items-center gap-2">
                                                    {o.duration && (
                                                        <div className="flex items-center gap-1 text-[#424242] text-xs">
                                                            <Clock size={10} />
                                                            <span>{o.duration} min</span>
                                                        </div>
                                                    )}
                                                    {o.type && (
                                                        <span className="text-[10px] font-medium bg-[#F5F5F5] border border-[#E0E0E0] px-1.5 py-0.5 rounded">
                              {o.type}
                            </span>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="font-bold text-black text-[13px]">
                        {o.price > 0 ? `€${o.price}` : "N/A"}
                      </span>
                                        </div>
                                    </div>
                                ))}

                                {offers.length > 3 && (
                                    <div className="text-center pt-1">
                                        <button
                                            onClick={() => toggleExpand(2)}
                                            className="text-xs text-[#424242] hover:text-black transition-colors"
                                        >
                                            View all {offers.length} experiences
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-[#F5F5F5] rounded-md p-3 border border-[#E0E0E0] text-center">
                                <p className="text-[13px] italic text-[#424242]">
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