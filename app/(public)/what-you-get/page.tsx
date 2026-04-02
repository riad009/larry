import React from 'react'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, ChevronRight, Search, Utensils, BarChart3, Wine, Star, Users, MapPin } from "lucide-react";

function Page() {
    return (
        <div className="min-h-screen bg-cream text-charcoal">
            {/* Decorative background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-wine-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex flex-col items-center justify-center min-h-screen max-w-7xl mx-auto relative z-10 px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wine-50 border border-wine-100 animate-fade-in-up stagger-1">
                                <Star className="w-3.5 h-3.5 text-gold-500" />
                                <span className="text-xs font-semibold text-wine-600 uppercase tracking-wider">Premium Experience</span>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-bold text-charcoal leading-tight animate-fade-in-up stagger-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                                What You <span className="text-gradient-wine">Get</span>
                            </h1>
                            <p className="text-xl text-warm-gray leading-relaxed animate-fade-in-up stagger-3">
                                Everything you need for the perfect vineyard experience, all in one place.
                            </p>
                        </div>

                        <div className="space-y-4 animate-fade-in-up stagger-4">
                            {/* Discover card */}
                            <div className="group p-5 rounded-2xl glass-card hover-lift cursor-default">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl gradient-wine text-white shadow-md">
                                        <Search className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-xl font-bold text-charcoal">Discover</h3>
                                            <div className="w-5 h-5 rounded-full bg-wine-500 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        </div>
                                        <p className="text-base text-warm-gray leading-relaxed">
                                            Explore hundreds of premium vineyards and exclusive offers tailored to your preferences.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Compare card */}
                            <div className="group p-5 rounded-2xl glass-card hover-lift cursor-default">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl gradient-wine text-white shadow-md">
                                        <BarChart3 className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-xl font-bold text-charcoal">Compare</h3>
                                            <div className="w-5 h-5 rounded-full bg-wine-500 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        </div>
                                        <p className="text-base text-warm-gray leading-relaxed">
                                            Easily compare vineyards, pricing, and experiences in one convenient dashboard.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Lunch card */}
                            <div className="group p-5 rounded-2xl glass-card hover-lift cursor-default">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl gradient-wine text-white shadow-md">
                                        <Utensils className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-xl font-bold text-charcoal">Lunch</h3>
                                            <div className="w-5 h-5 rounded-full bg-wine-500 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        </div>
                                        <p className="text-base text-warm-gray leading-relaxed">
                                            Select from curated nearby lunch spots that complement your vineyard experience perfectly.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 animate-fade-in-up stagger-5">
                            <Link href="/free-trial" className="block">
                                <Button className="group w-full py-6 rounded-2xl gradient-cta text-white text-lg font-bold uppercase tracking-wider transition-all active:scale-[0.98] flex items-center justify-center gap-3 border-0 shadow-lg">
                                    <span>Start Free Trial</span>
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </Link>
                            <p className="text-center text-warm-gray text-sm mt-3 font-medium">
                                No credit card required
                            </p>
                        </div>
                    </div>

                    {/* Right side — showcase card */}
                    <div className="relative animate-fade-in-up stagger-6">
                        <div className="absolute -inset-4 bg-gradient-to-br from-wine-500/20 via-transparent to-gold-500/20 rounded-[32px] blur-2xl" />
                        <div className="relative p-8 rounded-3xl glass-card shadow-xl">
                            <div className="relative z-10">
                                <div className="flex justify-center mb-6">
                                    <div className="p-4 rounded-2xl gradient-wine shadow-lg animate-pulse-glow">
                                        <Wine className="w-12 h-12 text-white" />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-center p-3 rounded-xl bg-wine-50 border border-wine-100">
                                            <div className="text-2xl font-bold text-wine-600">500+</div>
                                            <div className="text-sm text-warm-gray">Vineyards</div>
                                        </div>
                                        <div className="text-center p-3 rounded-xl bg-wine-50 border border-wine-100">
                                            <div className="text-2xl font-bold text-wine-600">200+</div>
                                            <div className="text-sm text-warm-gray">Restaurants</div>
                                        </div>
                                        <div className="text-center p-3 rounded-xl bg-wine-50 border border-wine-100">
                                            <div className="text-2xl font-bold text-gold-500">4.8★</div>
                                            <div className="text-sm text-warm-gray">Rating</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {[
                                            "Premium vineyard access",
                                            "Exclusive wine tasting offers",
                                            "Curated dining experiences",
                                            "Route optimization"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full bg-wine-500 flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-3 h-3 text-white" />
                                                </div>
                                                <span className="text-base text-warm-gray">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-4 rounded-xl bg-cream border border-warm-border">
                                        <p className="text-base text-warm-gray italic mb-2 leading-relaxed">
                                            &ldquo;Found the perfect vineyard and lunch spot for our anniversary!&rdquo;
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full gradient-wine" />
                                            <p className="text-sm font-semibold text-charcoal">Sarah M., <span className="text-warm-gray font-normal">Verified User</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col justify-center items-center min-h-screen p-4 relative z-10">
                <div className="w-full max-w-sm mx-auto space-y-6">
                    <div className="text-center space-y-3 animate-fade-in-up stagger-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wine-50 border border-wine-100">
                            <Star className="w-3 h-3 text-gold-500" />
                            <span className="text-xs font-semibold text-wine-600 uppercase tracking-wider">Premium</span>
                        </div>
                        <h2 className="text-4xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-playfair)' }}>
                            What You <span className="text-gradient-wine">Get</span>
                        </h2>
                        <p className="text-base text-warm-gray leading-relaxed">
                            Everything for the perfect vineyard experience
                        </p>
                    </div>

                    <div className="space-y-3 animate-fade-in-up stagger-2">
                        {[
                            { icon: Search, title: "Discover", desc: "Discover hundreds of vineyards and offers" },
                            { icon: BarChart3, title: "Compare", desc: "Compare easily in one place" },
                            { icon: Utensils, title: "Lunch", desc: "Select nearby lunch spots" },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-row items-center glass-card rounded-xl p-4 w-full gap-3 hover-lift">
                                <div className="p-2 rounded-lg gradient-wine text-white">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-charcoal text-lg">{item.title}</h3>
                                        <div className="w-4 h-4 rounded-full bg-wine-500 flex items-center justify-center">
                                            <Check className="w-2.5 h-2.5 text-white" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-warm-gray leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 animate-fade-in-up stagger-3">
                        <div className="text-center p-2 rounded-lg bg-wine-50 border border-wine-100">
                            <div className="text-lg font-bold text-wine-600">500+</div>
                            <div className="text-xs text-warm-gray">Vineyards</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-wine-50 border border-wine-100">
                            <div className="text-lg font-bold text-wine-600">200+</div>
                            <div className="text-xs text-warm-gray">Lunch Spots</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-wine-50 border border-wine-100">
                            <div className="text-lg font-bold text-gold-500">4.8★</div>
                            <div className="text-xs text-warm-gray">Rating</div>
                        </div>
                    </div>

                    <div className="pt-2 animate-fade-in-up stagger-4">
                        <Link href="/free-trial">
                            <Button className="group w-full py-4 rounded-2xl gradient-cta text-white text-base font-bold uppercase tracking-wider active:scale-[0.98] flex items-center justify-center gap-2 border-0 shadow-lg">
                                <span>Start Free Trial</span>
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <p className="text-center text-warm-gray text-sm mt-2 font-medium">
                            No credit card required
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page