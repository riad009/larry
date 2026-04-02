/* components/selector/DropdownSelector.tsx */
import { Option } from "@/types/option";
import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

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

    useEffect(() => {
        if (isOpen && internalRef.current) {
            setContentHeight(internalRef.current.scrollHeight);
        } else {
            setContentHeight(0);
        }
    }, [isOpen, options]);

    const bgColor = isOpen
        ? "bg-wine-50 text-charcoal border-wine-200"
        : "bg-white/60 text-charcoal border-warm-border";

    const borderColor = type === "country"
        ? "border-b border-warm-border"
        : "border-warm-border";

    return (
        <div className={`${bgColor} ${borderColor} border transition-all duration-300`}>
            {/* Header */}
            <div
                className={`flex justify-between items-center p-4 cursor-pointer font-medium ${
                    disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-wine-50/50"
                }`}
                onClick={!disabled ? onToggle : undefined}
            >
                <span className="flex items-center gap-2">
                    {label}
                    {value && <span className="text-wine-600 font-semibold">: {value.name}</span>}
                </span>
                <ChevronDown className={`w-4 h-4 text-wine-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Options Panel */}
            <div
                ref={internalRef}
                className="transition-all duration-300 ease-in-out overflow-hidden bg-white/80 text-charcoal"
                style={{ maxHeight: `${contentHeight}px` }}
            >
                {options.map((option) => (
                    <div
                        key={option.key}
                        className={`py-3 px-4 border-t border-warm-border/50 cursor-pointer transition-all duration-200 text-base ${
                            value?.key === option.key
                                ? "bg-wine-50 font-semibold text-wine-700 border-l-4 border-l-wine-500"
                                : "hover:bg-wine-50/50 hover:text-wine-600"
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