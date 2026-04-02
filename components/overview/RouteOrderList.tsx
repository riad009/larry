"use client";

import React from "react";
import type { RouteStop } from "./GoogleOverviewMap";

interface RouteOrderListProps {
    routeStops: RouteStop[];
    onReorder: (newOrder: RouteStop[]) => void;
    onRemove?: (stop: RouteStop) => void;
}

function getName(stop: RouteStop): string {
    if (stop.type === "vineyard") return stop.data.name ?? "—";
    const l = stop.data;
    return l.restaurantName || l.name || "Restaurant";
}

function getSecondaryLine(stop: RouteStop): string {
    if (stop.type === "vineyard") {
        const v = stop.data;
        const location = [v.commune, v.subRegion].filter(Boolean).join(", ") || "";
        const price =
            v.lowestCost != null || v.highestCost != null
                ? `€${v.lowestCost ?? "?"} – €${v.highestCost ?? "?"}`
                : "";
        return [location, price].filter(Boolean).join(" · ") || "—";
    }
    const l = stop.data;
    const location = [l.commune, l.subRegion].filter(Boolean).join(", ") || "";
    const cost = l.bracket ? `Bracket ${l.bracket}` : l.type ?? "";
    return [location, cost].filter(Boolean).join(" · ") || "—";
}

export function RouteOrderList({ routeStops, onReorder, onRemove }: RouteOrderListProps) {
    const handleMoveUp = (index: number) => {
        if (index <= 0) return;
        const next = [...routeStops];
        [next[index - 1], next[index]] = [next[index], next[index - 1]];
        onReorder(next);
    };

    const handleMoveDown = (index: number) => {
        if (index >= routeStops.length - 1) return;
        const next = [...routeStops];
        [next[index], next[index + 1]] = [next[index + 1], next[index]];
        onReorder(next);
    };

    return (
        <ul className="space-y-0">
            {routeStops.map((stop, index) => (
                <li
                    key={`${stop.type}-${stop.data.id}-${index}`}
                    className="py-3 border-b border-warm-border last:border-b-0"
                >
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm text-warm-gray shrink-0">{index + 1}.</span>
                                {index === 0 && (
                                    <span className="text-xs font-medium px-1.5 py-0.5 rounded gradient-cta text-white shrink-0">
                                        START
                                    </span>
                                )}
                                {index === routeStops.length - 1 && index > 0 && (
                                    <span className="text-xs font-medium px-1.5 py-0.5 rounded gradient-cta text-white shrink-0">
                                        END
                                    </span>
                                )}
                                <span className="font-medium text-base text-charcoal break-words">{getName(stop)}</span>
                            </div>
                            <p className="text-sm text-warm-gray mt-0.5 pl-5">{getSecondaryLine(stop)}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span
                                className={`text-xs font-medium px-2 py-1 rounded capitalize shrink-0 ${
                                    stop.type === "vineyard"
                                        ? "bg-purple-100 text-purple-800 border border-purple-200"
                                        : "bg-amber-100 text-amber-800 border border-amber-200"
                                }`}
                            >
                                {stop.type}
                            </span>
                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() => handleMoveUp(index)}
                                    disabled={index === 0}
                                    className="px-2 py-1 text-xs border border-wine-500 rounded bg-white/70 backdrop-blur-sm text-charcoal disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    ↑
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleMoveDown(index)}
                                    disabled={index === routeStops.length - 1}
                                    className="px-2 py-1 text-xs border border-wine-500 rounded bg-white/70 backdrop-blur-sm text-charcoal disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    ↓
                                </button>
                                {onRemove && (
                                    <button
                                        type="button"
                                        onClick={() => onRemove(stop)}
                                        className="px-2 py-1 text-xs border border-wine-500 rounded bg-white/70 backdrop-blur-sm text-charcoal hover:bg-cream disabled:opacity-40"
                                        aria-label="Remove from trip"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
