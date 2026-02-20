"use client";

import React from "react";
import { MapPin, ChevronDown, X } from "lucide-react";
import { LunchExperience } from "@/types/lunch";

const formatCost = (c?: number) => (typeof c === "number" ? `€${c}` : "—");
const safeText = (s?: string) => s?.trim() || "—";

interface CompactLunchCardProps {
    lunch: LunchExperience;
    isSelected: boolean;
    onAdd: () => void;
    onRemove: (id: string) => void;
}

export default function CompactLunchCard({
    lunch,
    isSelected,
    onAdd,
    onRemove,
}: CompactLunchCardProps) {
    const title = safeText(lunch.name);
    const location = [safeText(lunch.commune), safeText(lunch.subRegion)]
        .filter((x) => x !== "—")
        .join(", ");
    const cost = formatCost(lunch.lunchCost);

    const cardClasses = `
    rounded-lg border transition-all duration-300 bg-white
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
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-black font-medium text-sm truncate">
                                {title}
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
                                {cost}
                            </p>
                            <p className="text-[#424242] text-[10px]">LUNCH</p>
                        </div>

                        <div className="flex items-center gap-1">
                            {!isSelected ? (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onAdd();
                                    }}
                                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-black text-white hover:bg-[#424242] active:scale-95 transition-all duration-150 whitespace-nowrap border border-black"
                                >
                                    Add
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemove(lunch.id);
                                    }}
                                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white text-black border-2 border-black hover:bg-[#F5F5F5] flex items-center gap-1 whitespace-nowrap transition-all duration-150"
                                >
                                    <span>Remove</span>
                                    <X size={11} />
                                </button>
                            )}

                            <button
                                className="p-1.5 rounded-md bg-[#F5F5F5] border border-[#E0E0E0] hover:bg-[#E0E0E0] text-black transition-colors duration-150 pointer-events-none"
                                aria-label="Expand"
                                tabIndex={-1}
                            >
                                <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
