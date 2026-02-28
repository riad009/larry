"use client";

import React, { useEffect, useRef, useState } from "react";
import { VineyardExperience } from "@/types/vineyard";
import { LunchExperience } from "@/types/lunch";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
    interface Window {
        google?: any;
    }
}

export type RouteStop =
    | { type: "vineyard"; data: VineyardExperience }
    | { type: "lunch"; data: LunchExperience };

interface GoogleOverviewMapProps {
    routeStops: RouteStop[];
}

export function GoogleOverviewMap({ routeStops }: GoogleOverviewMapProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<unknown>(null);
    const markersRef = useRef<unknown[]>([]);
    const infoWindowsRef = useRef<unknown[]>([]);
    const directionsRendererRef = useRef<unknown>(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const apiKey = typeof window !== "undefined" ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY : undefined;

    useEffect(() => {
        if (!apiKey) {
            setError("Google Maps API key is not configured.");
            return;
        }
        if (typeof (window as any).google?.maps?.Map === "function") {
            setScriptLoaded(true);
            return;
        }

        const callbackName = "__gmapsOverviewReady";
        const onReady = () => setScriptLoaded(true);
        (window as any)[callbackName] = onReady;

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}`;
        script.async = true;
        script.defer = true;
        script.onerror = () => {
            delete (window as any)[callbackName];
            setError("Failed to load Google Maps.");
        };
        document.head.appendChild(script);

        return () => {
            delete (window as any)[callbackName];
            script.remove();
        };
    }, [apiKey]);

    useEffect(() => {
        if (!scriptLoaded || !containerRef.current || !window.google?.maps) return;

        const g = window.google.maps;
        const map = new g.Map(containerRef.current, {
            mapTypeId: "roadmap",
            zoom: 10,
            center: { lat: 48.8566, lng: 2.3522 },
            styles: [],
            gestureHandling: "greedy",
        });
        mapRef.current = map;

        const bounds = new g.LatLngBounds();
        const markers: InstanceType<typeof g.Marker>[] = [];
        const infoWindows: InstanceType<typeof g.InfoWindow>[] = [];

        const START_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#fff" stroke="#000" stroke-width="2"/><text x="20" y="26" text-anchor="middle" font-size="18" font-weight="bold" fill="#000" font-family="system-ui,sans-serif">S</text></svg>`;
        const END_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#fff" stroke="#000" stroke-width="2"/><text x="20" y="26" text-anchor="middle" font-size="18" font-weight="bold" fill="#000" font-family="system-ui,sans-serif">E</text></svg>`;
        function makeIconDataUrl(svg: string): string {
            return `data:image/svg+xml,${encodeURIComponent(svg)}`;
        }

        const startIcon = {
            url: makeIconDataUrl(START_ICON_SVG),
            scaledSize: new g.Size(40, 40),
            anchor: new g.Point(20, 40),
        };
        const endIcon = {
            url: makeIconDataUrl(END_ICON_SVG),
            scaledSize: new g.Size(40, 40),
            anchor: new g.Point(20, 40),
        };
        const vineyardIcon = {
            url: "/grape.png",
            scaledSize: new g.Size(36, 36),
            anchor: new g.Point(18, 36),
        };
        const lunchIcon = {
            url: "/lunch.png",
            scaledSize: new g.Size(30, 30),
            anchor: new g.Point(15, 30),
        };

        const isTouch = typeof window !== "undefined" && "ontouchstart" in window;
        const allStopsInOrder: { lat: number; lng: number }[] = [];

        routeStops.forEach((stop, index) => {
            const lat = stop.data.latitude;
            const lng = stop.data.longitude;
            if (lat == null || lng == null || typeof lat !== "number" || typeof lng !== "number") return;
            const position = { lat, lng };
            bounds.extend(position);
            allStopsInOrder.push(position);

            const isFirst = index === 0;
            const isLast = index === routeStops.length - 1;
            let content: string;
            let title: string;
            let icon: typeof vineyardIcon;

            if (stop.type === "vineyard") {
                const v = stop.data;
                title = v.name;
                const location = [v.commune, v.subRegion].filter(Boolean).join(", ") || "—";
                const price = v.lowestCost != null || v.highestCost != null
                    ? `€${v.lowestCost ?? "?"} – €${v.highestCost ?? "?"}`
                    : "—";
                const rating = v.rating != null && v.rating > 0 ? `${v.rating.toFixed(1)}` : "—";
                content = `<div style="background:#fff;border:1px solid #E0E0E0;border-radius:8px;box-shadow:0 1px 2px rgba(0,0,0,0.05);padding:12px 14px;min-width:160px;font-family:system-ui,sans-serif;">
  <div style="font-weight:700;color:#000;font-size:14px;margin-bottom:6px;">${escapeHtml(v.name)}</div>
  <div style="font-size:12px;color:#424242;margin-bottom:2px;">${escapeHtml(location)}</div>
  <div style="font-size:12px;color:#424242;margin-bottom:2px;">${escapeHtml(price)}</div>
  <div style="font-size:12px;color:#424242;">Rating: ${escapeHtml(rating)}</div>
</div>`;
                icon = isFirst ? startIcon : isLast ? endIcon : vineyardIcon;
            } else {
                const l = stop.data;
                const name = l.restaurantName || l.name || "Restaurant";
                title = name;
                const location = [l.commune, l.subRegion].filter(Boolean).join(", ") || "—";
                const bracket = l.bracket ? `Bracket ${l.bracket}` : "—";
                const cuisine = l.type ?? "—";
                content = `<div style="background:#fff;border:1px solid #E0E0E0;border-radius:8px;box-shadow:0 1px 2px rgba(0,0,0,0.05);padding:12px 14px;min-width:160px;font-family:system-ui,sans-serif;">
  <div style="font-weight:700;color:#000;font-size:14px;margin-bottom:6px;">${escapeHtml(name)}</div>
  <div style="font-size:12px;color:#424242;margin-bottom:2px;">${escapeHtml(location)}</div>
  <div style="font-size:12px;color:#424242;margin-bottom:2px;">${escapeHtml(bracket)}</div>
  <div style="font-size:12px;color:#424242;">Cuisine: ${escapeHtml(cuisine)}</div>
</div>`;
                icon = isFirst ? startIcon : isLast ? endIcon : lunchIcon;
            }

            const infoWindow = new g.InfoWindow({ content });
            infoWindows.push(infoWindow);

            const marker = new g.Marker({
                position,
                map,
                icon,
                title,
            });

            if (isTouch) {
                marker.addListener("click", () => {
                    infoWindows.forEach((iw: any) => iw.close());
                    infoWindow.open(map, marker);
                });
            } else {
                marker.addListener("mouseover", () => {
                    infoWindows.forEach((iw: any) => iw.close());
                    infoWindow.open(map, marker);
                });
                marker.addListener("mouseout", () => infoWindow.close());
            }
            markers.push(marker);
        });
        markersRef.current = markers;
        infoWindowsRef.current = infoWindows;

        const fitMapToRouteOrMarkers = (routeBounds: { getNorthEast?: () => unknown; getSouthWest?: () => unknown } | null) => {
            if (routeBounds && routeBounds.getNorthEast?.() && routeBounds.getSouthWest?.()) {
                map.fitBounds(routeBounds, { top: 50, right: 50, bottom: 50, left: 50 });
            } else if (markers.length > 1) {
                map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
            } else if (markers.length === 1) {
                map.setCenter(markers[0].getPosition()!);
                map.setZoom(13);
            } else {
                map.setCenter({ lat: 48.8566, lng: 2.3522 });
                map.setZoom(10);
            }
        };

        if (allStopsInOrder.length === 0) {
            map.setCenter({ lat: 48.8566, lng: 2.3522 });
            map.setZoom(10);
        } else if (allStopsInOrder.length === 1) {
            map.setCenter(allStopsInOrder[0]);
            map.setZoom(13);
        } else {
            map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });

            const origin = allStopsInOrder[0];
            const destination = allStopsInOrder[allStopsInOrder.length - 1];
            const waypoints = allStopsInOrder.slice(1, -1).map((wp) => ({ location: wp, stopover: true }));

            const directionsService = new g.DirectionsService();
            const directionsRenderer = new g.DirectionsRenderer({
                map,
                suppressMarkers: true,
                polylineOptions: {
                    strokeColor: "#000000",
                    strokeWeight: 3,
                    strokeOpacity: 0.8,
                },
            });
            directionsRendererRef.current = directionsRenderer;

            directionsService.route(
                {
                    origin,
                    destination,
                    waypoints,
                    travelMode: g.TravelMode.DRIVING,
                },
                (result: any, status: string) => {
                    if (status === "OK" && result?.routes?.[0]) {
                        directionsRenderer.setDirections(result);
                        const route = result.routes[0];
                        const routeBounds = new g.LatLngBounds();
                        if (route.overview_path) {
                            route.overview_path.forEach((p: any) => routeBounds.extend(p));
                        }
                        fitMapToRouteOrMarkers(routeBounds);
                    } else {
                        fitMapToRouteOrMarkers(null);
                    }
                }
            );
        }

        return () => {
            markers.forEach((m: any) => m.setMap(null));
            infoWindows.forEach((iw: any) => iw.close());
            const dr = directionsRendererRef.current as { setMap?: (map: null) => void } | null;
            if (dr?.setMap) dr.setMap(null);
            directionsRendererRef.current = null;
            markersRef.current = [];
            infoWindowsRef.current = [];
        };
    }, [scriptLoaded, routeStops]);

    if (error) {
        return (
            <div className="w-full h-full min-h-[300px] bg-white border border-[#E0E0E0] rounded-2xl shadow-sm flex items-center justify-center p-6">
                <p className="text-[#424242] text-sm">{error}</p>
            </div>
        );
    }

    if (!apiKey) {
        return (
            <div className="w-full h-full min-h-[300px] bg-white border border-[#E0E0E0] rounded-2xl shadow-sm flex items-center justify-center p-6">
                <p className="text-[#424242] text-sm">Google Maps API key is not configured.</p>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="w-full h-full min-h-[300px] rounded-2xl overflow-hidden border border-[#E0E0E0] bg-white shadow-sm relative"
        />
    );
}

function escapeHtml(s: string): string {
    const div = typeof document !== "undefined" ? document.createElement("div") : null;
    if (div) {
        div.textContent = s;
        return div.innerHTML;
    }
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
