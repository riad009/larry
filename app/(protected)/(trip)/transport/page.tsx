"use client";

import React from "react";
import Link from "next/link";

export default function TransportPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-6 md:px-8 py-12">
                <header>
                    <h1 className="text-3xl md:text-4xl font-bold text-black text-center">
                        Transport
                    </h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-white border border-[#E0E0E0] rounded-2xl p-8 flex flex-col justify-between min-h-[220px] transition-colors hover:border-black">
                        <div>
                            <h2 className="text-xl font-semibold text-black">Private Driver</h2>
                            <p className="text-[#424242] text-sm mt-3">
                                Dedicated chauffeur for your group. Door-to-door between vineyards and lunch spots at your pace.
                            </p>
                        </div>
                        <Link
                            href="mailto:hello@example.com?subject=Private%20Driver%20Enquiry"
                            className="text-black font-medium mt-6 inline-flex items-center gap-2 hover:underline"
                        >
                            Email Us →
                        </Link>
                    </div>

                    <div className="bg-white border border-[#E0E0E0] rounded-2xl p-8 flex flex-col justify-between min-h-[220px] transition-colors hover:border-black">
                        <div>
                            <h2 className="text-xl font-semibold text-black">Local Shared Tours</h2>
                            <p className="text-[#424242] text-sm mt-3">
                                Join small-group day tours with fixed itineraries. A budget-friendly way to explore the region.
                            </p>
                        </div>
                        <span className="text-[#9E9E9E] font-medium mt-6 cursor-not-allowed">
                            Coming Soon
                        </span>
                    </div>

                    <div className="bg-white border border-[#E0E0E0] rounded-2xl p-8 flex flex-col justify-between min-h-[220px] transition-colors hover:border-black">
                        <div>
                            <h2 className="text-xl font-semibold text-black">Wine Concierge Service</h2>
                            <p className="text-[#424242] text-sm mt-3">
                                Full-service planning: transport, reservations, and tailored experiences. Our concierge handles the details.
                            </p>
                        </div>
                        <Link
                            href="mailto:larry@example.com?subject=Wine%20Concierge%20Enquiry"
                            className="text-black font-medium mt-6 inline-flex items-center gap-2 hover:underline"
                        >
                            Ask Larry →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
