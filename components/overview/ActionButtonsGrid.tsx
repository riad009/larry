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
            hover: "hover:shadow-green-500/5",
            iconBg: "group-hover:from-green-500/20 group-hover:to-emerald-500/20",
            iconBorder: "group-hover:border-green-500/30",
            iconColor: "group-hover:text-green-400",
        },
        blue: {
            hover: "hover:shadow-blue-500/5",
            iconBg: "group-hover:from-blue-500/20 group-hover:to-cyan-500/20",
            iconBorder: "group-hover:border-blue-500/30",
            iconColor: "group-hover:text-blue-400",
        },
        amber: {
            hover: "hover:shadow-amber-500/5",
            iconBg: "group-hover:from-amber-500/20 group-hover:to-orange-500/20",
            iconBorder: "group-hover:border-amber-500/30",
            iconColor: "group-hover:text-amber-400",
        },
        purple: {
            hover: "hover:shadow-purple-500/5",
            iconBg: "group-hover:from-purple-500/20 group-hover:to-violet-500/20",
            iconBorder: "group-hover:border-purple-500/30",
            iconColor: "group-hover:text-purple-400",
        },
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {buttons.map((button) => {
                const color = colorClasses[button.color];
                const Icon = button.icon;

                return (
                    <button
                        key={button.id}
                        onClick={() => onButtonClick?.(button.id)}
                        className={`px-4 py-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-zinc-900 to-black border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 group ${color.hover}`}
                    >
                        <div
                            className={`p-2.5 rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700 transition-all ${color.iconBg} ${color.iconBorder}`}
                        >
                            <Icon className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${color.iconColor}`} />
                        </div>
                        <span className="text-sm font-bold">{button.label}</span>
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