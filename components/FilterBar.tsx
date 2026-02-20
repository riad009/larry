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
        <div className="bg-white w-full max-w-sm p-4 rounded-xl border border-[#E0E0E0] shadow-sm mb-6">
            {/* Dropdowns */}
            <div className="flex items-end justify-between gap-2">
                {config.map(({ label, name, options }) => (
                    <div className="w-1/3" key={name as string}>
                        <div className="flex flex-col gap-1 w-full">

                            <label className="text-sm font-bold text-black uppercase ml-1">{label}</label>
                            <select
                                name={name as string}
                                value={filters[name] ?? "ALL"}
                                onChange={(e) =>
                                    setFilters((prev) => ({ ...prev, [name]: e.target.value }))
                                }
                                className="w-full py-2 px-3 rounded-lg border border-[#E0E0E0] bg-white text-black text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
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
                    className="flex-1 bg-black text-white font-semibold py-2 px-4 rounded border border-black hover:bg-[#424242] transition disabled:bg-[#9E9E9E] disabled:cursor-not-allowed text-base"
                    disabled={applyDisabled}
                >
                    Apply filters
                </button>
                <button
                    onClick={onNext}
                    className="flex-1 bg-black text-white font-semibold py-2 px-4 rounded border border-black hover:bg-[#424242] transition disabled:bg-[#9E9E9E] disabled:cursor-not-allowed text-base"
                    disabled={nextDisabled}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
