"use client";
import React from "react";
import { Option } from "@/types/option";

export type FilterState = Record<string, string>;

interface FilterBarProps {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    config: {
        label: string;
        name: keyof FilterState;
        options: Option[];
    }[];
    onApply: () => void;
    onNext: () => void;
    applyDisabled?: boolean;
    nextDisabled?: boolean;
}

export default function FilterBar({
                                      filters,
                                      setFilters,
                                      config,
                                      onApply,
                                      onNext,
                                      applyDisabled = false,
                                      nextDisabled = false,
                                  }: FilterBarProps) {
    return (
        <div className="glass-card w-full max-w-sm p-4 rounded-2xl mb-6">
            {/* Dropdowns */}
            <div className="flex items-end justify-between gap-2">
                {config.map(({ label, name, options }) => (
                    <div className="w-1/3" key={name as string}>
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-wine-600 uppercase ml-1">{label}</label>
                            <select
                                name={name as string}
                                value={filters[name] ?? "ALL"}
                                onChange={(e) =>
                                    setFilters((prev) => ({ ...prev, [name]: e.target.value }))
                                }
                                className="w-full py-2 px-3 rounded-xl border border-warm-border bg-white/80 text-charcoal text-base focus:outline-none focus:ring-2 focus:ring-wine-500/20 focus:border-wine-500 transition-all"
                            >
                                {options.map((option) => (
                                    <option value={option.key} key={option.key} className="text-charcoal">
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
                <button
                    onClick={onApply}
                    className="flex-1 gradient-cta text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-base border-0"
                    disabled={applyDisabled}
                >
                    Apply filters
                </button>
                <button
                    onClick={onNext}
                    className="flex-1 bg-charcoal text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm hover:bg-charcoal/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-base border-0"
                    disabled={nextDisabled}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
