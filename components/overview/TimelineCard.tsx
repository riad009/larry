// components/overview/TimelineCard.tsx
import { Clock, Calendar } from "lucide-react";

interface TimelineItem {
    time: string;
    title: string;
    description?: string;
    duration?: string;
    color: "green" | "purple" | "blue";
    icon?: string;
}

interface TimelineCardProps {
    items: TimelineItem[];
    totalDuration: string;
    hasTransport: boolean;
}

export function TimelineCard({ items, totalDuration, hasTransport }: TimelineCardProps) {
    // FIXED: Proper mapping for tailwind classes based on the color prop
    const theme = {
        green: {
            dot: "bg-green-500 shadow-green-500/50",
            badge: "text-green-400 border-green-500/20 bg-green-500/10",
            line: "from-green-500/30"
        },
        purple: {
            dot: "bg-purple-500 shadow-purple-500/50",
            badge: "text-purple-400 border-purple-500/20 bg-purple-500/10",
            line: "from-purple-500/30"
        },
        blue: {
            dot: "bg-blue-500 shadow-blue-500/50",
            badge: "text-blue-400 border-blue-500/20 bg-blue-500/10",
            line: "from-blue-500/30"
        }
    };

    return (
        <div className="p-4 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                </div>
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
                    DAY TIMELINE
                </h3>
            </div>

            <div className="space-y-5">
                {items.map((item, index) => (
                    <div key={index} className="relative">
                        {/* Timeline Connector Line */}
                        {index !== items.length - 1 && (
                            <div className="absolute left-[5.5px] top-4 bottom-[-20px] w-px bg-zinc-800"></div>
                        )}

                        {/* Timeline Item */}
                        <div className="relative pl-6">
                            {/* The Animated Dot */}
                            <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full ${theme[item.color].dot} shadow-lg z-10`}></div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs md:text-sm font-bold text-zinc-500 mb-0.5">
                                        {item.time}
                                    </p>
                                    <p className="text-sm md:text-base font-bold text-white leading-tight">
                                        {item.title}
                                    </p>
                                    {item.description && (
                                        <p className="text-xs text-zinc-500 mt-1 italic">{item.description}</p>
                                    )}
                                </div>
                                {item.duration && (
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${theme[item.color].badge}`}>
                                        {item.duration}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Total Duration Footer */}
                <div className="pt-5 mt-2 border-t border-zinc-800/50">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total Trip Time</p>
                            <p className="text-lg font-bold text-white">{totalDuration}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-zinc-800/30">
                            <Calendar className="w-4 h-4 text-zinc-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}