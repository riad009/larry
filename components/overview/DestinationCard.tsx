// components/overview/DestinationCard.tsx
import { LucideIcon, MapPin, Clock, Star } from "lucide-react";

interface DestinationCardProps {
    type: "vineyard" | "lunch";
    title: string;
    subtitle?: string;
    icon: LucideIcon;
    color: "green" | "blue";
    rating?: number;
    cost?: string | number;
    location?: string;
    hours?: string;
    tag?: string;
}

export function DestinationCard({
                                    type,
                                    title,
                                    subtitle,
                                    icon: Icon,
                                    color,
                                    rating,
                                    cost,
                                    location,
                                    hours,
                                    tag,
                                }: DestinationCardProps) {
    const colorClasses = {
        green: {
            bg: "from-green-500/20 to-emerald-500/20",
            border: "border-green-500/30",
            text: "text-green-400",
            tagBg: "bg-green-500/10",
            tagText: "text-green-400",
            tagBorder: "border-green-500/20",
        },
        blue: {
            bg: "from-blue-500/20 to-cyan-500/20",
            border: "border-blue-500/30",
            text: "text-blue-400",
            tagBg: "bg-blue-500/10",
            tagText: "text-blue-400",
            tagBorder: "border-blue-500/20",
        },
    };

    const currentColor = colorClasses[color];

    return (
        <div className="p-4 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-r from-zinc-900 to-black border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="flex items-start gap-4">
                {/* Icon Container */}
                <div
                    className={`p-3 rounded-lg bg-gradient-to-r ${currentColor.bg} border ${currentColor.border} flex-shrink-0`}
                >
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${currentColor.text}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Header with title and rating/cost */}
                    <div className="flex justify-between items-start mb-3">
                        <div className="min-w-0">
                            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                {type === "vineyard" ? "VINEYARD" : "LUNCH"}
                            </h3>
                            <h4 className="text-base md:text-lg font-bold text-white truncate">
                                {title}
                            </h4>
                            {subtitle && (
                                <p className="text-sm text-zinc-400 mt-1">{subtitle}</p>
                            )}
                        </div>

                        {/* Rating or Cost Badge */}
                        {rating !== undefined && (
                            <div className="flex items-center gap-1.5 bg-zinc-800 px-2.5 py-1.5 rounded-lg flex-shrink-0 ml-2">
                                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                <span className="text-sm font-bold text-white">
                  {rating.toFixed(1)}
                </span>
                            </div>
                        )}

                        {cost !== undefined && (
                            <div className="bg-zinc-800 px-2.5 py-1.5 rounded-lg flex-shrink-0 ml-2">
                <span className="text-sm font-bold text-white">
                  {typeof cost === "number" ? `€${cost}` : cost}
                </span>
                            </div>
                        )}
                    </div>

                    {/* Location */}
                    {location && (
                        <div className="flex items-center gap-2.5 text-sm text-zinc-400 mb-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{location}</span>
                        </div>
                    )}

                    {/* Hours (for lunch) */}
                    {hours && (
                        <div className="flex items-center gap-2.5 text-sm text-zinc-400">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{hours}</span>
                        </div>
                    )}

                    {/* Tag */}
                    {tag && (
                        <div className="mt-3">
              <span
                  className={`inline-block px-2.5 py-1 ${currentColor.tagBg} ${currentColor.tagText} text-xs font-medium rounded-full border ${currentColor.tagBorder}`}
              >
                {tag}
              </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}