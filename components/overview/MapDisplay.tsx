// // components/overview/MapDisplay.tsx
// import { Route, Wine, Utensils } from "lucide-react";
// import dynamic from 'next/dynamic';
//
// const MapComponent = dynamic(() => import('@/components/MapComponent'), {
//     ssr: false,
//     loading: () => <div className="w-full h-56 md:h-72 lg:h-80 bg-gradient-to-br from-zinc-900 to-black animate-pulse rounded-xl md:rounded-2xl" />
// });
//
// interface MapDisplayProps {
//     vineyard: {
//         latitude: number;
//         longitude: number;
//     };
//     lunch: {
//         latitude: number | undefined;
//         longitude: number | undefined;
//     };
// }
//
// export function MapDisplay({ vineyard, lunch }: MapDisplayProps) {
//     return (
//         <div className="relative h-56 md:h-72 lg:h-80 bg-gradient-to-br from-zinc-900 to-black rounded-xl md:rounded-2xl overflow-hidden border border-zinc-800">
//             <MapComponent
//                 points={[
//                     { lat: vineyard.latitude, lng: vineyard.longitude },
//                     { lat: lunch.latitude, lng: lunch.longitude }
//                 ]}
//             />
//
//             {/* Enhanced map overlay buttons with better visibility */}
//             <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
//                 <div className="px-3 py-2 bg-black/80 backdrop-blur-md rounded-lg border border-white/20 shadow-lg">
//                     <div className="flex items-center gap-2">
//                         <Route className="w-4 h-4 text-green-400" />
//                         <p className="text-xs md:text-sm font-bold text-white">Active Route</p>
//                     </div>
//                 </div>
//
//                 <div className="flex gap-2">
//                     <div className="px-3 py-2 bg-black/80 backdrop-blur-md rounded-lg border border-white/20 shadow-lg">
//                         <div className="flex items-center gap-2">
//                             <Wine className="w-3.5 h-3.5 text-green-400" />
//                             <span className="text-xs md:text-sm font-bold text-white">Vineyard</span>
//                         </div>
//                     </div>
//                     <div className="px-3 py-2 bg-black/80 backdrop-blur-md rounded-lg border border-white/20 shadow-lg">
//                         <div className="flex items-center gap-2">
//                             <Utensils className="w-3.5 h-3.5 text-blue-400" />
//                             <span className="text-xs md:text-sm font-bold text-white">Lunch</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* Bottom map controls */}
//             <div className="absolute bottom-3 left-3 right-3 flex justify-center">
//                 <div className="bg-black/80 backdrop-blur-md rounded-full border border-white/20 shadow-lg px-4 py-2">
//                     <div className="flex items-center gap-2 md:gap-4">
//                         <div className="flex items-center gap-1.5">
//                             <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                             <span className="text-xs font-medium text-white">Start</span>
//                         </div>
//                         <div className="w-8 md:w-12 h-px bg-gradient-to-r from-green-500/50 to-blue-500/50"></div>
//                         <div className="flex items-center gap-1.5">
//                             <div className="w-2 h-2 rounded-full bg-blue-500"></div>
//                             <span className="text-xs font-medium text-white">End</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// components/overview/MapDisplay.tsx
import { Route, Wine, Utensils } from "lucide-react";
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-56 md:h-72 lg:h-80 bg-gradient-to-br from-zinc-900 to-black animate-pulse rounded-xl md:rounded-2xl" />
    )
});

interface MapDisplayProps {
    vineyard: {
        latitude: number;
        longitude: number;
        name?: string;
    };
    lunch: {
        latitude?: number;
        longitude?: number;
        name?: string;
    };
    showRoute?: boolean;
    className?: string;
}

export function MapDisplay({
                               vineyard,
                               lunch,
                               showRoute = true,
                               className = ""
                           }: MapDisplayProps) {
    // Validate coordinates
    const isValidLunchCoords = lunch.latitude !== undefined && lunch.longitude !== undefined;

    // Prepare points for the map
    const points = isValidLunchCoords
        ? [
            { lat: vineyard.latitude, lng: vineyard.longitude },
            { lat: lunch.latitude!, lng: lunch.longitude! }
        ]
        : [{ lat: vineyard.latitude, lng: vineyard.longitude }];

    return (
        <div className={`relative h-56 md:h-72 lg:h-80 bg-gradient-to-br from-zinc-900 to-black rounded-xl md:rounded-2xl overflow-hidden border border-zinc-800 ${className}`}>
            <MapComponent points={points} />

            {/* Map Overlays */}
            <MapOverlays
                showRoute={showRoute}
                hasLunch={isValidLunchCoords}
                vineyardName={vineyard.name}
                lunchName={lunch.name}
            />
        </div>
    );
}

// Separate overlay components for better organization
function MapOverlays({
                         showRoute,
                         hasLunch,
                         vineyardName,
                         lunchName
                     }: {
    showRoute: boolean;
    hasLunch: boolean;
    vineyardName?: string;
    lunchName?: string;
}) {
    return (
        <>
            {/* Top overlay controls */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                {/* Route indicator */}
                {showRoute && (
                    <div className="px-3 py-2 bg-black/80 backdrop-blur-md rounded-lg border border-white/20 shadow-lg">
                        <div className="flex items-center gap-2">
                            <Route className="w-4 h-4 text-green-400" />
                            <p className="text-xs md:text-sm font-bold text-white">Active Route</p>
                        </div>
                    </div>
                )}

                {/* Placeholder for route indicator when not showing */}
                {!showRoute && <div />}

                {/* Location indicators */}
                <div className="flex gap-2">
                    <MapLocationIndicator
                        icon={Wine}
                        color="green"
                        label="Vineyard"
                        name={vineyardName}
                    />
                    {hasLunch && (
                        <MapLocationIndicator
                            icon={Utensils}
                            color="blue"
                            label="Lunch"
                            name={lunchName}
                        />
                    )}
                </div>
            </div>

            {/* Bottom route indicator - only show if we have both points */}
            {showRoute && hasLunch && (
                <div className="absolute bottom-3 left-3 right-3 flex justify-center">
                    <RouteIndicator />
                </div>
            )}
        </>
    );
}

// Reusable location indicator component
function MapLocationIndicator({
                                  icon: Icon,
                                  color,
                                  label,
                                  name
                              }: {
    icon: React.ComponentType<{ className?: string }>;
    color: "green" | "blue";
    label: string;
    name?: string;
}) {
    const colorClasses = {
        green: "text-green-400",
        blue: "text-blue-400"
    };

    const tooltip = name ? `${label}: ${name}` : label;

    return (
        <div
            className="px-3 py-2 bg-black/80 backdrop-blur-md rounded-lg border border-white/20 shadow-lg group relative"
            title={tooltip}
        >
            <div className="flex items-center gap-2">
                <Icon className={`w-3.5 h-3.5 ${colorClasses[color]}`} />
                <span className="text-xs md:text-sm font-bold text-white whitespace-nowrap">
                    {label}
                </span>
            </div>
            {/* Optional tooltip on hover for longer names */}
            {name && name.length > 15 && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 backdrop-blur-md rounded-lg border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                    <p className="text-xs font-medium text-white">{name}</p>
                </div>
            )}
        </div>
    );
}

// Reusable route indicator component
function RouteIndicator() {
    return (
        <div className="bg-black/80 backdrop-blur-md rounded-full border border-white/20 shadow-lg px-4 py-2">
            <div className="flex items-center gap-2 md:gap-4">
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-medium text-white">Start</span>
                </div>
                <div className="w-8 md:w-12 h-px bg-gradient-to-r from-green-500/50 to-blue-500/50"></div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-xs font-medium text-white">End</span>
                </div>
            </div>
        </div>
    );
}