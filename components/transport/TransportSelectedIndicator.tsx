// components/transport/TransportSelectedIndicator.tsx
import { ChevronRight } from "lucide-react";
import { TransportOption } from "@/types/transport";

interface TransportSelectedIndicatorProps {
    selectedTransport: TransportOption | null;
    isMobile?: boolean;
}

export function TransportSelectedIndicator({
                                               selectedTransport,
                                               isMobile = false,
                                           }: TransportSelectedIndicatorProps) {
    if (!selectedTransport) {
        return null;
    }

    if (!isMobile) {
        return null; // Desktop doesn't show this indicator
    }

    return (
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-zinc-900 to-black border border-green-500/30">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs font-bold text-green-400 uppercase tracking-wider mb-1">
                        SELECTED TRANSPORT
                    </p>
                    <p className="text-base font-bold text-white">
                        {selectedTransport.type} – {selectedTransport.provider}
                    </p>
                </div>
                <ChevronRight className="w-5 h-5 text-green-400" />
            </div>
        </div>
    );
}