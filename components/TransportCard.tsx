// components/TransportCard.tsx
import React from "react";
import { TransportOption } from "@/types/transport";
import { Car, Train, Bus, Bike, Clock, Navigation, X } from "lucide-react";
import clsx from "clsx";

type TransportCardProps = {
    option: TransportOption;
    onAdd: () => void;
    onRemove: () => void;
    isSelected?: boolean;
};

const getTransportIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case "car":
        case "taxi":
            return <Car className="w-5 h-5" />;
        case "train":
            return <Train className="w-5 h-5" />;
        case "bus":
            return <Bus className="w-5 h-5" />;
        case "bike":
            return <Bike className="w-5 h-5" />;
        default:
            return <Navigation className="w-5 h-5" />;
    }
};

const getTransportColor = (type: string) => {
    switch (type.toLowerCase()) {
        case "car":
        case "taxi":
            return "bg-blue-500";
        case "train":
            return "bg-purple-500";
        case "bus":
            return "bg-amber-500";
        case "bike":
            return "bg-emerald-500";
        default:
            return "bg-zinc-500";
    }
};

export const TransportCard: React.FC<TransportCardProps> = ({
                                                                option,
                                                                onAdd,
                                                                onRemove,
                                                                isSelected,
                                                            }) => {
    const icon = getTransportIcon(option.type);
    const colorClass = getTransportColor(option.type);

    return (
        <div className={clsx(
            "rounded-2xl overflow-hidden border transition-all duration-300 relative",
            isSelected
                ? "border-green-500 bg-zinc-900 shadow-[0_0_15px_rgba(22,163,74,0.2)]"
                : "border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:shadow-lg hover:shadow-zinc-900/30"
        )}>
            {/* Selected badge */}
            {isSelected && (
                // <div className="absolute top-3 right-3 bg-gradient-to-r from-green-600 to-emerald-500 px-3 py-1.5 rounded-full text-[11px] font-bold text-white uppercase tracking-wider shadow-lg">
                //     Selected
                // </div>
              ""
            )}

            {/* Card Header */}
            <div className="p-5">
                <div className="flex justify-between items-start gap-3 mb-3">
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`p-2 rounded-lg ${colorClass} bg-opacity-20 border ${colorClass.replace('bg-', 'border-')}/20`}>
                                {icon}
                            </div>
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                                {option.type}
                            </span>
                        </div>

                        <h3 className="text-white font-bold text-lg leading-tight mb-2">
                            {option.provider}
                        </h3>

                        <p className="text-zinc-400 text-xs italic">
                            {option.description || "Reliable transportation option"}
                        </p>
                    </div>

                    {/* Price badge */}
                    <div className="bg-zinc-800/80 px-3 py-2 rounded-lg flex flex-col items-center justify-center border border-zinc-700/50 min-w-[70px]">
                        <p className="text-white text-sm font-bold">{option.priceRange}</p>
                        <p className="text-zinc-400 text-[10px] mt-0.5">PRICE</p>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="flex items-center gap-2 text-zinc-400">
                        <Clock className="w-4 h-4 text-zinc-500" />
                        <div>
                            <p className="text-[10px] font-bold text-zinc-500">DURATION</p>
                            <p className="text-xs font-medium text-white">{option.duration}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-400">
                        <Navigation className="w-4 h-4 text-zinc-500" />
                        <div>
                            <p className="text-[10px] font-bold text-zinc-500">DISTANCE</p>
                            <p className="text-xs font-medium text-white">{option.distance}</p>
                        </div>
                    </div>
                </div>

                {/* Button Section */}
                <div className="mt-4 pt-4 border-t border-zinc-800/50">
                    {!isSelected ? (
                        <button
                            onClick={onAdd}
                            className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-xl
                                     bg-gradient-to-r from-white to-zinc-100 text-black
                                     hover:from-zinc-100 hover:to-zinc-200
                                     active:scale-[0.98] transition-all duration-200
                                     shadow-md hover:shadow-lg"
                        >
                            Select This Transport
                        </button>
                    ) : (
                        <button
                            onClick={onRemove}
                            className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-xl
                                     bg-gradient-to-r from-zinc-800 to-zinc-900 text-red-400
                                     border border-red-500/20 hover:border-red-500/40
                                     hover:bg-gradient-to-r hover:from-red-900/30 hover:to-red-900/10
                                     hover:text-red-300 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Remove Selection
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};