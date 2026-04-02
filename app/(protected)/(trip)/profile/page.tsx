"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Mail, Clock, Shield, Wine, Utensils, MapPin, ChevronDown, ChevronUp, Trash2, CalendarDays, Car } from "lucide-react";
import type { Booking } from "@/types/booking";

function formatCountdown(ms: number): string {
  if (ms <= 0) return "Expired";
  const d = Math.floor(ms / (24 * 60 * 60 * 1000));
  const h = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const m = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function BookingCard({ booking, onDelete }: { booking: Booking; onDelete: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const dateStr = new Date(booking.createdAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric"
  });

  return (
    <div className="rounded-2xl border border-warm-border bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl gradient-wine flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-charcoal text-sm truncate">{booking.tripName}</h3>
            <p className="text-xs text-warm-gray">{booking.region}{booking.subRegion ? ` · ${booking.subRegion}` : ""} · {dateStr}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
            booking.status === "confirmed" ? "bg-green-50 text-green-600 border border-green-200" :
            booking.status === "completed" ? "bg-blue-50 text-blue-600 border border-blue-200" :
            booking.status === "cancelled" ? "bg-red-50 text-red-500 border border-red-200" :
            "bg-gray-50 text-gray-500 border border-gray-200"
          }`}>{booking.status}</span>
          {expanded ? <ChevronUp className="w-4 h-4 text-warm-gray" /> : <ChevronDown className="w-4 h-4 text-warm-gray" />}
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-warm-border animate-fade-in-up">
          {/* Quick stats */}
          <div className="grid grid-cols-3 divide-x divide-warm-border bg-cream/50">
            <div className="p-3 text-center">
              <Wine className="w-4 h-4 text-wine-500 mx-auto mb-1" />
              <p className="text-xs font-bold text-charcoal">{booking.vineyards?.length || 0}</p>
              <p className="text-[10px] text-warm-gray">Vineyards</p>
            </div>
            <div className="p-3 text-center">
              <Utensils className="w-4 h-4 text-gold-500 mx-auto mb-1" />
              <p className="text-xs font-bold text-charcoal">{booking.lunches?.length || 0}</p>
              <p className="text-[10px] text-warm-gray">Restaurants</p>
            </div>
            <div className="p-3 text-center">
              <Car className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <p className="text-xs font-bold text-charcoal">{booking.transportOption || "—"}</p>
              <p className="text-[10px] text-warm-gray">Transport</p>
            </div>
          </div>

          {/* Vineyards */}
          {booking.vineyards?.length > 0 && (
            <div className="p-4">
              <h4 className="text-xs font-bold text-wine-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Wine className="w-3.5 h-3.5" /> Vineyards
              </h4>
              <div className="space-y-2">
                {booking.vineyards.map((v, i) => (
                  <div key={v.id || i} className="flex items-center justify-between p-2.5 rounded-lg bg-wine-50/50 border border-wine-100">
                    <div>
                      <p className="text-sm font-semibold text-charcoal">{v.name}</p>
                      <p className="text-xs text-warm-gray">{[v.subRegion, v.commune].filter(Boolean).join(", ")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-charcoal">
                        {v.lowestCost && v.highestCost ? `€${v.lowestCost} - €${v.highestCost}` : "N/A"}
                      </p>
                      {v.rating > 0 && <p className="text-[10px] text-warm-gray">★ {v.rating.toFixed(1)}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lunches */}
          {booking.lunches?.length > 0 && (
            <div className="px-4 pb-4">
              <h4 className="text-xs font-bold text-gold-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5" /> Restaurants
              </h4>
              <div className="space-y-2">
                {booking.lunches.map((l, i) => (
                  <div key={l.id || i} className="flex items-center justify-between p-2.5 rounded-lg bg-gold-200/20 border border-gold-200/50">
                    <div>
                      <p className="text-sm font-semibold text-charcoal">{l.restaurantName || l.name}</p>
                      <p className="text-xs text-warm-gray">{[l.subRegion, l.commune].filter(Boolean).join(", ")}</p>
                    </div>
                    <div className="text-right">
                      {l.bracket && <p className="text-xs font-bold text-charcoal">{l.bracket}</p>}
                      {l.type && <p className="text-[10px] text-warm-gray">{l.type}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {booking.notes && (
            <div className="px-4 pb-4">
              <p className="text-xs text-warm-gray italic">"{booking.notes}"</p>
            </div>
          )}

          {/* Actions */}
          <div className="px-4 pb-4 flex gap-2">
            <button
              onClick={() => onDelete(booking._id!)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-500 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [countdown, setCountdown] = useState<string>("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }
    if (status !== "authenticated" || !session?.user) return;

    const trialEnd = (session.user as any).trialEndDate;
    if (!trialEnd) {
      setCountdown("Expired");
      return;
    }

    const update = () => {
      const end = new Date(trialEnd).getTime();
      if (Number.isNaN(end)) {
        setCountdown("Expired");
        return;
      }
      const now = Date.now();
      setCountdown(formatCountdown(end - now));
    };

    update();
    const t = setInterval(update, 60 * 1000);
    return () => clearInterval(t);
  }, [session, status, router]);

  // Fetch bookings
  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/bookings")
      .then(r => r.json())
      .then(data => {
        setBookings(Array.isArray(data) ? data : []);
        setLoadingBookings(false);
      })
      .catch(() => setLoadingBookings(false));
  }, [status]);

  const handleDeleteBooking = async (id: string) => {
    const res = await fetch(`/api/bookings?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setBookings(prev => prev.filter(b => b._id !== id));
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen app-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-wine-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session?.user) return null;

  const user = session.user as any;
  const initials = (user.name || "U").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen app-background py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Profile Card */}
        <div className="rounded-2xl border border-warm-border bg-white shadow-sm overflow-hidden">
          {/* Header banner */}
          <div className="h-20 gradient-wine relative">
            <div className="absolute -bottom-8 left-6">
              <div className="w-16 h-16 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center gradient-wine-gold">
                <span className="text-2xl font-bold text-white">{initials}</span>
              </div>
            </div>
          </div>

          <div className="pt-12 pb-6 px-6">
            <h1 className="text-xl font-bold text-charcoal" style={{ fontFamily: "var(--font-playfair)" }}>
              {user.name ?? "Wine Explorer"}
            </h1>
            <p className="text-sm text-warm-gray mt-0.5">{user.email ?? "—"}</p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="p-3 rounded-xl bg-cream border border-warm-border text-center">
                <Shield className="w-4 h-4 text-wine-500 mx-auto mb-1" />
                <p className="text-xs font-bold text-charcoal">Free</p>
                <p className="text-[10px] text-warm-gray">Plan</p>
              </div>
              <div className="p-3 rounded-xl bg-cream border border-warm-border text-center">
                <Clock className="w-4 h-4 text-gold-500 mx-auto mb-1" />
                <p className="text-xs font-bold text-charcoal">{countdown || "—"}</p>
                <p className="text-[10px] text-warm-gray">Remaining</p>
              </div>
              <div className="p-3 rounded-xl bg-cream border border-warm-border text-center">
                <CalendarDays className="w-4 h-4 text-wine-500 mx-auto mb-1" />
                <p className="text-xs font-bold text-charcoal">{bookings.length}</p>
                <p className="text-[10px] text-warm-gray">Trips Saved</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full mt-6 py-3 rounded-xl border-2 border-wine-500 text-wine-600 font-semibold text-sm hover:bg-wine-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Saved Trips / Bookings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-charcoal" style={{ fontFamily: "var(--font-playfair)" }}>
              Your Saved Trips
            </h2>
            <span className="text-xs font-bold text-warm-gray bg-cream px-2.5 py-1 rounded-full border border-warm-border">
              {bookings.length} trip{bookings.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loadingBookings ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-wine-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="rounded-2xl border border-warm-border bg-white p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-cream mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-7 h-7 text-warm-gray" />
              </div>
              <h3 className="font-bold text-charcoal mb-1">No trips saved yet</h3>
              <p className="text-sm text-warm-gray mb-4">Start planning your vineyard tour and save it from the Trip overview.</p>
              <button
                onClick={() => router.push("/vineyard")}
                className="px-6 py-2.5 rounded-xl gradient-cta text-white text-sm font-semibold"
              >
                Start Planning
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((booking) => (
                <BookingCard key={booking._id} booking={booking} onDelete={handleDeleteBooking} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
