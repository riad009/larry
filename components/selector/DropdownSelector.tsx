/* components/selector/DropdownSelector.tsx */
import { Option } from "@/types/option";
import { useEffect, useState, useRef } from "react";

interface DropdownSelectorProps {
    label: string;
    value: Option | null;
    options: Option[];
    isOpen: boolean;
    onToggle: () => void;
    onSelect: (option: Option) => void;
    type: "country" | "region";
    disabled?: boolean;
}

export function DropdownSelector({
                                     label,
                                     value,
                                     options,
                                     isOpen,
                                     onToggle,
                                     onSelect,
                                     type,
                                     disabled = false,
                                 }: DropdownSelectorProps) {
    const [contentHeight, setContentHeight] = useState(0);
    const internalRef = useRef<HTMLDivElement>(null);

    // Calculate height automatically for smooth animation
    useEffect(() => {
        if (isOpen && internalRef.current) {
            setContentHeight(internalRef.current.scrollHeight);
        } else {
            setContentHeight(0);
        }
    }, [isOpen, options]);

    const bgColor = isOpen
        ? "bg-[#F5F5F5] text-black border-[#E0E0E0]"
        : "bg-white text-black border-[#E0E0E0]";

    const borderColor = type === "country"
        ? "border-b border-[#E0E0E0]"
        : "border-[#E0E0E0]";

    return (
        <div className={`${bgColor} ${borderColor} border transition-colors duration-200`}>
            {/* Header */}
            <div
                className={`flex justify-between items-center p-4 cursor-pointer font-medium ${
                    disabled ? "opacity-30 cursor-not-allowed" : ""
                }`}
                onClick={!disabled ? onToggle : undefined}
            >
                <span>
                    {label} {value ? `: ${value.name}` : ""}
                </span>
            </div>

            {/* Options Panel */}
            <div
                ref={internalRef}
                className="transition-all duration-300 ease-in-out overflow-hidden bg-white text-black"
                style={{ maxHeight: `${contentHeight}px` }}
            >
                {options.map((option) => (
                    <div
                        key={option.key}
                        className={`py-3 px-4 border-t border-[#E0E0E0] cursor-pointer transition-colors text-base ${
                            value?.key === option.key
                                ? "bg-[#F5F5F5] font-semibold"
                                : "hover:bg-[#F5F5F5]"
                        }`}
                        onClick={() => onSelect(option)}
                    >
                        {option.name}
                    </div>
                ))}
            </div>
        </div>
    );
}