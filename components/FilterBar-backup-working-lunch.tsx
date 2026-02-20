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
    applyDisabled?: boolean; // disables Apply until valid
    nextDisabled?: boolean;  // disables Next until results exist
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
        <div className="w-full max-w-sm p-4 rounded-xl shadow-xl mb-6 bg-green-900">
            {/* Dropdowns */}
            <div className="flex items-end justify-between gap-2">
                {config.map(({ label, name, options }) => (
                    <div className="w-1/3" key={name as string}>
                        <div className="flex flex-col gap-1 w-full">
                            <p className="text-xs font-semibold text-green-300">{label}</p>
                            <select
                                name={name as string}
                                value={filters[name] ?? "ALL"}
                                onChange={(e) =>
                                    setFilters((prev) => ({ ...prev, [name]: e.target.value }))
                                }
                                className="w-full py-2 px-3 rounded-lg border border-green-300 bg-green-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                {options.map((option) => (
                                    <option value={option.key} key={option.key} className="text-black">
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
            </div>

            {/* Buttons: left/right */}
            <div className="flex gap-3 mt-4">
                <button
                    onClick={onApply}
                    className="flex-1 bg-brand-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
                    disabled={applyDisabled}
                >
                    Apply filters
                </button>
                <button
                    onClick={onNext}
                    className="flex-1 bg-brand-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
                    disabled={nextDisabled}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
