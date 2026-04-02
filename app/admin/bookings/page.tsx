"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Wine, Utensils, MapPin, User, ChevronDown, ChevronUp, Search, Car } from "lucide-react";
import type { Booking } from "@/types/booking";

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/bookings?all=true")
            .then(r => r.json())
            .then(data => {
                setBookings(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filtered = bookings.filter(b =>
        !search ||
        b.userName.toLowerCase().includes(search.toLowerCase()) ||
        b.userEmail.toLowerCase().includes(search.toLowerCase()) ||
        b.tripName.toLowerCase().includes(search.toLowerCase()) ||
        b.region.toLowerCase().includes(search.toLowerCase())
    );

    const stats = {
        total: bookings.length,
        confirmed: bookings.filter(b => b.status === "confirmed").length,
        regions: new Set(bookings.map(b => b.region).filter(Boolean)).size,
        avgVineyards: bookings.length > 0
            ? (bookings.reduce((sum, b) => sum + (b.vineyards?.length || 0), 0) / bookings.length).toFixed(1)
            : "0",
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <div className="w-8 h-8 border-2 border-wine-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl gradient-wine">
                        <CalendarDays className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-charcoal" style={{ fontFamily: "var(--font-playfair)" }}>
                            Booking Management
                        </h1>
                        <p className="text-sm text-warm-gray">View and manage all user trip bookings</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total Bookings", value: stats.total, icon: CalendarDays, color: "wine" },
                    { label: "Confirmed", value: stats.confirmed, icon: MapPin, color: "green" },
                    { label: "Regions", value: stats.regions, icon: Wine, color: "gold" },
                    { label: "Avg. Vineyards", value: stats.avgVineyards, icon: Wine, color: "blue" },
                ].map((s) => {
                    const Icon = s.icon;
                    return (
                        <div key={s.label} className="glass-card rounded-2xl p-5 flex items-center gap-4">
                            <div className={`p-2.5 rounded-xl ${
                                s.color === "wine" ? "bg-wine-50" :
                                s.color === "green" ? "bg-green-50" :
                                s.color === "gold" ? "bg-gold-200/30" :
                                "bg-blue-50"
                            }`}>
                                <Icon className={`w-5 h-5 ${
                                    s.color === "wine" ? "text-wine-500" :
                                    s.color === "green" ? "text-green-500" :
                                    s.color === "gold" ? "text-gold-600" :
                                    "text-blue-500"
                                }`} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-charcoal">{s.value}</p>
                                <p className="text-xs text-warm-gray">{s.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray" />
                <input
                    type="text"
                    placeholder="Search by name, email, trip, or region..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-warm-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-wine-500/20 focus:border-wine-500"
                />
            </div>

            {/* Bookings Table */}
            {filtered.length === 0 ? (
                <div className="glass-card rounded-2xl p-12 text-center">
                    <CalendarDays className="w-12 h-12 text-warm-gray mx-auto mb-3" />
                    <p className="text-charcoal font-semibold">No bookings found</p>
                    <p className="text-sm text-warm-gray mt-1">Bookings will appear here when users save their trips.</p>
                </div>
            ) : (
                <div className="glass-card rounded-2xl overflow-hidden border border-warm-border">
                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-cream/80 border-b border-warm-border text-xs font-bold text-warm-gray uppercase tracking-wider">
                        <div className="col-span-3">User</div>
                        <div className="col-span-3">Trip</div>
                        <div className="col-span-2">Region</div>
                        <div className="col-span-1 text-center">Stops</div>
                        <div className="col-span-1 text-center">Status</div>
                        <div className="col-span-2 text-right">Date</div>
                    </div>

                    {/* Rows */}
                    {filtered.map((booking) => {
                        const isExpanded = expandedId === booking._id;
                        const dateStr = new Date(booking.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric", month: "short", year: "numeric"
                        });
                        const totalStops = (booking.vineyards?.length || 0) + (booking.lunches?.length || 0);

                        return (
                            <div key={booking._id} className="border-b border-warm-border last:border-0">
                                <div
                                    className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-cream/40 cursor-pointer transition-colors"
                                    onClick={() => setExpandedId(isExpanded ? null : (booking._id ?? null))}
                                >
                                    {/* User */}
                                    <div className="col-span-12 md:col-span-3 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg gradient-wine flex items-center justify-center flex-shrink-0">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-charcoal truncate">{booking.userName}</p>
                                            <p className="text-xs text-warm-gray truncate">{booking.userEmail}</p>
                                        </div>
                                    </div>
                                    {/* Trip Name */}
                                    <div className="hidden md:block col-span-3">
                                        <p className="text-sm text-charcoal truncate">{booking.tripName}</p>
                                    </div>
                                    {/* Region */}
                                    <div className="hidden md:block col-span-2">
                                        <p className="text-sm text-charcoal">{booking.region}</p>
                                        <p className="text-xs text-warm-gray">{booking.subRegion}</p>
                                    </div>
                                    {/* Stops */}
                                    <div className="hidden md:flex col-span-1 justify-center">
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-cream rounded-lg text-xs font-bold text-charcoal">
                                            {totalStops}
                                        </span>
                                    </div>
                                    {/* Status */}
                                    <div className="hidden md:flex col-span-1 justify-center">
                                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                                            booking.status === "confirmed" ? "bg-green-50 text-green-600" :
                                            booking.status === "completed" ? "bg-blue-50 text-blue-600" :
                                            "bg-gray-50 text-gray-500"
                                        }`}>{booking.status}</span>
                                    </div>
                                    {/* Date */}
                                    <div className="hidden md:flex col-span-2 justify-end items-center gap-2">
                                        <span className="text-sm text-warm-gray">{dateStr}</span>
                                        {isExpanded ? <ChevronUp className="w-4 h-4 text-warm-gray" /> : <ChevronDown className="w-4 h-4 text-warm-gray" />}
                                    </div>
                                </div>

                                {/* Expanded Row */}
                                {isExpanded && (
                                    <div className="px-6 pb-5 bg-cream/30 animate-fade-in-up">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Vineyards */}
                                            <div>
                                                <h4 className="text-xs font-bold text-wine-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                    <Wine className="w-3.5 h-3.5" /> Vineyards ({booking.vineyards?.length || 0})
                                                </h4>
                                                <div className="space-y-1.5">
                                                    {(booking.vineyards || []).map((v, i) => (
                                                        <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white border border-warm-border">
                                                            <div>
                                                                <p className="text-sm font-medium text-charcoal">{v.name}</p>
                                                                <p className="text-xs text-warm-gray">{v.commune}</p>
                                                            </div>
                                                            {v.rating > 0 && (
                                                                <span className="text-xs text-warm-gray">★ {v.rating.toFixed(1)}</span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            {/* Lunches */}
                                            <div>
                                                <h4 className="text-xs font-bold text-gold-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                    <Utensils className="w-3.5 h-3.5" /> Restaurants ({booking.lunches?.length || 0})
                                                </h4>
                                                <div className="space-y-1.5">
                                                    {(booking.lunches || []).map((l, i) => (
                                                        <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white border border-warm-border">
                                                            <div>
                                                                <p className="text-sm font-medium text-charcoal">{l.restaurantName || l.name}</p>
                                                                <p className="text-xs text-warm-gray">{l.commune}</p>
                                                            </div>
                                                            {l.bracket && (
                                                                <span className="text-xs text-warm-gray">{l.bracket}</span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        {booking.transportOption && (
                                            <div className="mt-3 flex items-center gap-2 text-sm text-warm-gray">
                                                <Car className="w-4 h-4" />
                                                Transport: <span className="font-medium text-charcoal">{booking.transportOption}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
