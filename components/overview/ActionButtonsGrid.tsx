// components/overview/ActionButtonsGrid.tsx
import { Save, Share2, Download, Calendar } from "lucide-react";

interface ActionButton {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: "green" | "blue" | "amber" | "purple";
}

interface ActionButtonsGridProps {
    buttons?: ActionButton[];
    onButtonClick?: (id: string) => void;
}

export function ActionButtonsGrid({
                                      buttons = defaultButtons,
                                      onButtonClick
                                  }: ActionButtonsGridProps) {
    const colorClasses = {
        green: {
            bg: "bg-green-50 hover:bg-green-100 border-green-200",
            icon: "text-green-600",
            text: "text-green-700",
        },
        blue: {
            bg: "bg-blue-50 hover:bg-blue-100 border-blue-200",
            icon: "text-blue-600",
            text: "text-blue-700",
        },
        amber: {
            bg: "bg-amber-50 hover:bg-amber-100 border-amber-200",
            icon: "text-amber-600",
            text: "text-amber-700",
        },
        purple: {
            bg: "bg-purple-50 hover:bg-purple-100 border-purple-200",
            icon: "text-purple-600",
            text: "text-purple-700",
        },
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {buttons.map((button) => {
                const color = colorClasses[button.color];
                const Icon = button.icon;

                return (
                    <button
                        key={button.id}
                        onClick={() => onButtonClick?.(button.id)}
                        className={`px-3 py-3 rounded-xl border ${color.bg} transition-all duration-200 flex items-center justify-center gap-2 group hover:shadow-sm active:scale-[0.97]`}
                    >
                        <Icon className={`w-4 h-4 ${color.icon}`} />
                        <span className={`text-xs font-bold ${color.text}`}>{button.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

// Default buttons configuration
const defaultButtons: ActionButton[] = [
    {
        id: "save",
        label: "Save",
        icon: Save,
        color: "green",
    },
    {
        id: "share",
        label: "Share",
        icon: Share2,
        color: "blue",
    },
    {
        id: "export",
        label: "Export",
        icon: Download,
        color: "amber",
    },
    {
        id: "schedule",
        label: "Schedule",
        icon: Calendar,
        color: "purple",
    },
];