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
                                {title}
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
                                {cost}
                            </p>
                            <p className="text-warm-gray text-[10px]">LUNCH</p>
                        </div>

                        <div className="flex items-center gap-1">
                            {!isSelected ? (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onAdd();
                                    }}
                                    className="px-2.5 py-1 text-xs font-semibold rounded-lg gradient-cta text-white active:scale-95 transition-all duration-150 whitespace-nowrap border-0 shadow-sm"
                                >
                                    Add
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemove(lunch.id);
                                    }}
                                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white text-wine-600 border-2 border-wine-500 hover:bg-wine-50 flex items-center gap-1 whitespace-nowrap transition-all duration-150"
                                >
                                    <span>Remove</span>
                                    <X size={11} />
                                </button>
                            )}

                            <button
                                className="p-1.5 rounded-lg bg-cream border border-warm-border hover:bg-wine-50 text-wine-500 transition-colors duration-150 pointer-events-none"
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
