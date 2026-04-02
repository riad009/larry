"use client";

import React from "react";
import Link from "next/link";
import { Car, Users, Sparkles, ArrowRight, Mail } from "lucide-react";

const services = [
    {
        title: "Private Driver",
        description: "Dedicated chauffeur for your group. Door-to-door between vineyards and lunch spots at your pace.",
        icon: Car,
        cta: { label: "Email Us", href: "mailto:hello@example.com?subject=Private%20Driver%20Enquiry", type: "link" as const },
        accent: "wine",
    },
    {
        title: "Local Shared Tours",
        description: "Join small-group day tours with fixed itineraries. A budget-friendly way to explore the region.",
        icon: Users,
        cta: { label: "Coming Soon", href: "#", type: "disabled" as const },
        accent: "gold",
    },
    {
        title: "Wine Concierge Service",
        description: "Full-service planning: transport, reservations, and tailored experiences. Our concierge handles the details.",
        icon: Sparkles,
        cta: { label: "Ask Larry", href: "mailto:larry@example.com?subject=Wine%20Concierge%20Enquiry", type: "link" as const },
        accent: "wine",
    },
];

export default function TransportPage() {
    return (
        <div className="min-h-screen app-background">
            <div className="max-w-5xl mx-auto px-6 md:px-8 py-12 animate-fade-in-up">
                {/* Header */}
                <header className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wine-50 border border-wine-100 mb-4">
                        <Car className="w-3.5 h-3.5 text-wine-500" />
                        <span className="text-xs font-semibold text-wine-600 uppercase tracking-wider">Getting Around</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-playfair)' }}>
                        <span className="text-gradient-wine">Transport</span>
                    </h1>
                    <p className="text-warm-gray mt-3 max-w-lg mx-auto">
                        Choose how you'd like to travel between your selected vineyards and restaurants.
                    </p>
                </header>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={service.title}
                                className="glass-card rounded-2xl p-8 flex flex-col justify-between min-h-[260px] hover-lift transition-all duration-300 group"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div>
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${
                                        service.accent === "gold"
                                            ? "bg-gold-100 group-hover:bg-gold-200"
                                            : "gradient-wine-light group-hover:shadow-md"
                                    }`}>
                                        <Icon className={`w-6 h-6 ${
                                            service.accent === "gold" ? "text-gold-600" : "text-wine-500"
                                        }`} />
                                    </div>
                                    <h2 className="text-xl font-semibold text-charcoal mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
                                        {service.title}
                                    </h2>
                                    <p className="text-warm-gray text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>

                                {service.cta.type === "link" ? (
                                    <Link
                                        href={service.cta.href}
                                        className="mt-6 inline-flex items-center gap-2 text-wine-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                                    >
                                        <Mail className="w-4 h-4" />
                                        {service.cta.label}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                ) : (
                                    <span className="mt-6 text-warm-gray/60 font-medium text-sm cursor-not-allowed">
                                        {service.cta.label}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
