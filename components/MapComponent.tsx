/* components/map/MapComponent.tsx (or wherever your MapComponent lives) */
"use client";
import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import { renderToStaticMarkup } from 'react-dom/server';
import { Grape, Utensils, MapPin, Loader2, Navigation } from 'lucide-react';

// Fix for Leaflet default icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
    iconUrl: '/leaflet/images/marker-icon.png',
    shadowUrl: '/leaflet/images/marker-shadow.png',
});

const createCustomIcon = (icon: React.ReactNode, bgColor: string, label?: string) => {
    const html = renderToStaticMarkup(
        <div className="relative flex items-center justify-center">
            <div className="flex items-center justify-center text-white rounded-full p-2 border-2 border-[#E0E0E0] shadow-md"
                 style={{ backgroundColor: bgColor }}>
                {icon}
            </div>
            {label && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="px-2 py-1 bg-white rounded-md border border-[#E0E0E0] shadow-sm">
                        <span className="text-[10px] font-bold text-black">{label}</span>
                    </div>
                </div>
            )}
        </div>
    );
    return L.divIcon({
        html,
        className: 'custom-div-icon',
        iconSize: [42, 42],
        iconAnchor: [21, 21],
        popupAnchor: [0, -21]
    });
};

const createRouteIcon = (icon: React.ReactNode, bgColor: string) => {
    const html = renderToStaticMarkup(
        <div className="flex items-center justify-center text-white rounded-full p-2 border-2 border-[#E0E0E0] shadow-md animate-pulse"
             style={{ backgroundColor: bgColor }}>
            {icon}
        </div>
    );
    return L.divIcon({
        html,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });
};

function Routing({ points, onRouteLoaded }: { points: [number, number][], onRouteLoaded: () => void }) {
    const map = useMap();
    const [routePoints, setRoutePoints] = useState<[number, number][]>([]);

    useEffect(() => {
        if (!map || points.length < 2) return;

        let routingControl: any;

        const initRouting = () => {
            try {
                routingControl = (L as any).Routing.control({
                    waypoints: [
                        L.latLng(points[0][0], points[0][1]),
                        L.latLng(points[1][0], points[1][1])
                    ],
                    lineOptions: {
                        styles: [{
                            color: '#000000',
                            weight: 4,
                            opacity: 0.8,
                            dashArray: '5, 8'
                        }]
                    },
                    show: false,
                    addWaypoints: false,
                    draggableWaypoints: false,
                    fitSelectedRoutes: true,
                    createMarker: () => null,
                    containerClassName: 'hidden',
                    router: (L as any).Routing.osrmv1({
                        serviceUrl: 'https://router.project-osrm.org/route/v1'
                    })
                }).addTo(map);

                routingControl.on('routesfound', (e: any) => {
                    if (e.routes && e.routes[0]) {
                        const coordinates = e.routes[0].coordinates.map((coord: L.LatLng) => [coord.lat, coord.lng]);
                        setRoutePoints(coordinates);
                        onRouteLoaded();
                    }
                });

                const bounds = L.latLngBounds(points.map(p => L.latLng(p[0], p[1])));
                map.fitBounds(bounds, { padding: [30, 30] });

            } catch (error) {
                console.error('Routing error:', error);
                setRoutePoints(points);
                onRouteLoaded();
                const bounds = L.latLngBounds(points.map(p => L.latLng(p[0], p[1])));
                map.fitBounds(bounds, { padding: [30, 30] });
            }
        };

        const timer = setTimeout(initRouting, 100);

        return () => {
            clearTimeout(timer);
            if (routingControl) {
                map.removeControl(routingControl);
            }
        };
    }, [map, points, onRouteLoaded]);

    if (routePoints.length > 0) {
        return (
            <>
                <Polyline
                    positions={routePoints}
                    pathOptions={{
                        color: '#000000',
                        weight: 4,
                        opacity: 0.8,
                        dashArray: '5, 8'
                    }}
                />
                {routePoints.length > 2 && (
                    <Marker
                        position={routePoints[Math.floor(routePoints.length / 2)]}
                        icon={createRouteIcon(<Navigation size={14} />, '#000000')}
                    />
                )}
            </>
        );
    }
    return null;
}

export default function MapComponent({ points }: { points: any[] }) {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [routeLoaded, setRouteLoaded] = useState(false);
    const coords = useMemo(() => points.map(p => [p.lat, p.lng] as [number, number]), [points]);

    const defaultCenter: [number, number] = [48.8566, 2.3522];

    const center = useMemo((): [number, number] => {
        if (coords.length === 0) return defaultCenter;
        if (coords.length === 1) return coords[0];
        const lat = (coords[0][0] + coords[1][0]) / 2;
        const lng = (coords[0][1] + coords[1][1]) / 2;
        return [lat, lng];
    }, [coords]);

    const vIcon = useMemo(() => createCustomIcon(<Grape size={18} />, '#000000', 'Vineyard'), []);
    const lIcon = useMemo(() => createCustomIcon(<Utensils size={18} />, '#2563eb', 'Lunch'), []);

    const zoom = useMemo(() => {
        if (coords.length < 2) return 10;
        const [lat1, lng1] = coords[0];
        const [lat2, lng2] = coords[1];
        const distance = Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lng2 - lng1, 2));
        if (distance < 0.01) return 12;
        if (distance < 0.05) return 11;
        if (distance < 0.1) return 10;
        if (distance < 0.5) return 9;
        return 8;
    }, [coords]);

    if (points.length === 0) {
        return (
            <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-black rounded-xl flex flex-col items-center justify-center border border-zinc-800">
                <MapPin className="w-12 h-12 text-zinc-600 mb-3" />
                <p className="text-zinc-400 text-sm">No locations to display</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full rounded-xl overflow-hidden border border-zinc-800">
            {!mapLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black z-[1000] flex items-center justify-center">
                    <div className="text-center">
                        <div className="relative mb-3">
                            <div className="w-12 h-12 rounded-full border-4 border-zinc-800 border-t-green-500 animate-spin mx-auto"></div>
                            <MapPin className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-green-500" />
                        </div>
                        <p className="text-zinc-400 text-sm">Loading map...</p>
                    </div>
                </div>
            )}

            <MapContainer
                center={center}
                zoom={zoom}
                zoomControl={false}
                attributionControl={false}
                className="w-full h-full"
                whenReady={() => setMapLoaded(true)}
            >
                {/* FIXED: Removed Stadia Maps and used CartoDB Dark (Completely Free) */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                {coords.length > 0 && <Marker position={coords[0]} icon={vIcon} />}
                {coords.length > 1 && (
                    <>
                        <Marker position={coords[1]} icon={lIcon} />
                        <Routing points={coords} onRouteLoaded={() => setRouteLoaded(true)} />
                    </>
                )}
            </MapContainer>

            <div className="absolute bottom-3 left-3 right-3 flex justify-end z-[1000]">
                <button
                    className="px-3 py-1 bg-white rounded-lg border border-[#E0E0E0] hover:bg-[#F5F5F5] transition-colors shadow-sm"
                    onClick={() => {
                        const mapElement = document.querySelector('.leaflet-container') as HTMLElement;
                        if (mapElement?.requestFullscreen) mapElement.requestFullscreen();
                    }}
                >
                    <span className="text-xs text-black font-bold">Fullscreen</span>
                </button>
            </div>
        </div>
    );
}