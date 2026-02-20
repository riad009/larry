// /src/components/MapPopup.tsx

"use client";

import { X } from "lucide-react";

interface MapPopupProps {
    latitude: number;
    longitude: number;
    vineyardName: string;
    onClose: () => void;
}

export default function MapPopup({ latitude, longitude, vineyardName, onClose }: MapPopupProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    // FIX: Using /embed/v1/place. The 'q' parameter drops the RED PIN.
    const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}&zoom=15`;

    const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    return (
        <div className="w-full bg-white rounded-xl border border-[#E0E0E0] overflow-hidden mt-2 shadow-sm">

            <div className="p-3 border-b border-[#E0E0E0] flex justify-between items-center">
                <div className="truncate">
                    <h2 className="text-sm font-bold text-black truncate">{vineyardName}</h2>
                    <p className="text-xs text-[#424242] font-mono italic">
                        {latitude.toFixed(6)}, {longitude.toFixed(6)}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 text-[#424242] hover:text-black transition-colors"
                >
                    <X size={18} />
                </button>
            </div>

            <div className="w-full h-[300px] bg-[#F5F5F5]">
                {apiKey ? (
                    <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={mapEmbedUrl}
                    ></iframe>
                ) : (
                    <div className="flex items-center justify-center h-full text-[#424242] text-sm">
                        API KEY MISSING
                    </div>
                )}
            </div>

            <div className="p-2 border-t border-[#E0E0E0]">
                <button
                    onClick={() => window.open(externalMapUrl, '_blank')}
                    className="w-full py-2 text-sm font-bold bg-black hover:bg-[#424242] text-white rounded-lg transition-colors border border-black"
                >
                    VIEW ON GOOGLE MAPS
                </button>
            </div>
        </div>
    );
}