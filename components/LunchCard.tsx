"use client";

import Image from "next/image";
import React, { useState } from "react";
import { LunchExperience } from "@/types/lunch";
import clsx from "clsx";
import { ImagePaths } from "@/public/images";
import { Star, MapPin, Clock } from "lucide-react";
import MapPopup from "./MapPopup";
import GoogleIcon from "../public/google-icon.webp";

type Props = {
    lunch: LunchExperience;
    className?: string;
    isSelected?: boolean;
    onAdd?: () => void;
    onRemove?: () => void;
};

const formatCost = (c?: number) => (typeof c === "number" ? `€${c}` : "—");
const formatRating = (r?: number) => (typeof r === "number" ? `${r.toFixed(1)}` : "—");
const safeText = (s?: string) => s?.trim() || "—";

export default function LunchCard({ lunch, className, isSelected, onAdd, onRemove }: Props) {
    const [showMapPopup, setShowMapPopup] = useState(false);
    const nameStr = (lunch.name ?? "").trim();
    const hasValidCoords =
        typeof lunch.latitude === "number" &&
        typeof lunch.longitude === "number" &&
        Number.isFinite(lunch.latitude) &&
        Number.isFinite(lunch.longitude);
    const initialImgSrc =
        nameStr && hasValidCoords
            ? `/api/place-photo?name=${encodeURIComponent(nameStr)}&lat=${lunch.latitude}&lng=${lunch.longitude}`
            : ImagePaths.lunchPlaceHolder;
    const [imgSrc, setImgSrc] = useState(initialImgSrc);

    const title = safeText(lunch.name);
    const type = safeText(lunch.type);
    const location = [safeText(lunch.commune), safeText(lunch.subRegion)].filter((x) => x !== "—").join(", ");
    const open = safeText(lunch.open);
    const description = safeText(lunch.description);
    const rating = formatRating(lunch.rating);
    const cost = formatCost(lunch.lunchCost);
    const contactLink = (lunch.gkp ?? "").trim();
    const hasCoords = typeof lunch.latitude === "number" && typeof lunch.longitude === "number";

    return (
        <div
            className={clsx(
                "rounded-2xl overflow-hidden border transition-all duration-300 bg-white hover:shadow-md max-w-full",
                isSelected
                    ? "border-black shadow-md ring-2 ring-black/20"
                    : "border-[#E0E0E0] hover:border-[#9E9E9E]",
                className
            )}
        >
            {/* Image block: h-48, overlay, badges (type bottom-left, rating bottom-right) */}
            <div className="relative w-full max-w-full h-48 bg-[#F5F5F5] overflow-hidden">
                <Image
                    src={imgSrc}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover opacity-90 w-full h-full"
                    priority={false}
                    onError={() => setImgSrc(ImagePaths.lunchPlaceHolder)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {isSelected && (
                    <div className="absolute top-3 right-3 bg-black text-white rounded-full px-3 py-1 text-xs font-medium">
                        ✓ Selected
                    </div>
                )}

                {type !== "—" && (
                    <div className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-0.5 rounded-lg border border-[#E0E0E0]">
                        <span className="text-white text-xs font-bold uppercase tracking-wider">{type}</span>
                    </div>
                )}

                <div className="absolute bottom-3 right-3 bg-black/80 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 border border-[#E0E0E0]">
                    <Image src={GoogleIcon} alt="Google rating" width={12} height={12} />
                    <span className="text-white text-xs font-bold">{rating}</span>
                </div>
            </div>

            {/* Content - match VineyardCard: p-5, flex justify-between gap-4 mb-3, right col cost + button */}
            <div className="p-5">
                <div className="flex justify-between items-start gap-4 mb-3">
                    <div className="min-w-0 flex-1">
                        <h3 className="text-black font-bold text-lg leading-tight mb-2">
                            {title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-[#424242] mb-2">
                            <MapPin size={12} className="text-black flex-shrink-0" />
                            <p className="text-black text-sm truncate italic">{location || "Location not specified"}</p>
                        </div>

                        

                        {description !== "—" && (
                            <p className="text-[#424242] text-sm leading-relaxed line-clamp-2 mb-2">
                                {description}
                            </p>
                        )}

                        {open !== "—" && (
                            <div className="flex items-center gap-1.5 text-[#424242] text-xs">
                                <Clock size={12} />
                                <span>Open: {open}</span>
                            </div>
                        )}
                        <div className="flex flex-col items-start gap-2 mb-2 mt-2">
                            {hasCoords && (
                                <button
                                    onClick={() => setShowMapPopup(true)}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 text-black text-xs font-bold bg-white border border-[#E0E0E0] hover:bg-[#F5F5F5] rounded-sm transition-all duration-300 min-h-[32px]"
                                    aria-label="Quick Map"
                                >
                                    <MapPin size={12} />
                                    Quick Map
                                </button>
                            )}
                            {contactLink.length > 0 && (
                                <button
                                    onClick={() => window.open(contactLink, "_blank", "noopener,noreferrer")}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:bg-[#F5F5F5] bg-white px-3 py-1.5 rounded-lg border border-[#E0E0E0] transition-colors duration-200"
                                >
                                    <MapPin size={11} />
                                    Direct Contact Info
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 mt-1">
                        <div className="bg-[#F5F5F5] px-3 py-2 rounded-lg flex flex-col items-center justify-center border border-[#E0E0E0] min-w-[90px]">
                            <p className="text-black text-sm font-bold text-center leading-tight">
                                {cost === "—" ? "N/A" : `${cost}`}
                            </p>
                            <p className="text-[#424242] text-[10px]">LUNCH</p>
                        </div>

                        <div className="w-full">
                            {!isSelected ? (
                                <button
                                    onClick={onAdd}
                                    className="w-full py-3 px-4 text-sm font-bold uppercase tracking-wider rounded-xl bg-white text-black border border-black hover:bg-[#F5F5F5] active:scale-[0.98] transition-all duration-200 shadow-sm"
                                >
                                    Add to Trip
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={onRemove}
                                    className="w-full py-3 px-4 text-sm font-bold uppercase tracking-wider rounded-xl bg-black text-white hover:bg-[#222] active:scale-[0.98] transition-all duration-200 shadow-sm"
                                >
                                    Selected
                                </button>
                            )}

                            
                        </div>
                    </div>
                </div>
            </div>

            {showMapPopup && hasCoords && lunch.latitude != null && lunch.longitude != null && (
                <MapPopup
                    latitude={lunch.latitude}
                    longitude={lunch.longitude}
                    vineyardName={title || "Restaurant"}
                    onClose={() => setShowMapPopup(false)}
                />
            )}
        </div>
    );
}