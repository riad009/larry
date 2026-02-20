import React from 'react'
import Image from "next/image";
import { ImagePaths } from "@/public/images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, ChevronRight, Sparkles, Search, Utensils, Wine, BarChart3, MapPin } from "lucide-react";

function Page() {
    return (
        <div className="min-h-screen bg-white text-black p-4 md:p-6 lg:p-8">
            {/* Desktop Layout */}
            <div className="hidden md:flex flex-col items-center justify-center min-h-screen max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight">
                                What You Get
                            </h1>
                            <p className="text-xl text-[#424242] leading-relaxed">
                                Everything you need for the perfect vineyard experience, all in one place.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="group p-5 rounded-2xl bg-white border border-[#E0E0E0] hover:border-[#9E9E9E] transition-all duration-300 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-[#F5F5F5] border border-[#E0E0E0]">
                                        <Search className="w-6 h-6 text-black" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-xl font-bold text-black">Discover</h3>
                                            <Check className="w-5 h-5 text-black" />
                                        </div>
                                        <p className="text-base text-[#424242] leading-relaxed">
                                            Explore hundreds of premium vineyards and exclusive offers tailored to your preferences.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group p-5 rounded-2xl bg-white border border-[#E0E0E0] hover:border-[#9E9E9E] transition-all duration-300 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-[#F5F5F5] border border-[#E0E0E0]">
                                        <BarChart3 className="w-6 h-6 text-black" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-xl font-bold text-black">Compare</h3>
                                            <Check className="w-5 h-5 text-black" />
                                        </div>
                                        <p className="text-base text-[#424242] leading-relaxed">
                                            Easily compare vineyards, pricing, and experiences in one convenient dashboard.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group p-5 rounded-2xl bg-white border border-[#E0E0E0] hover:border-[#9E9E9E] transition-all duration-300 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-[#F5F5F5] border border-[#E0E0E0]">
                                        <Utensils className="w-6 h-6 text-black" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-xl font-bold text-black">Lunch</h3>
                                            <Check className="w-5 h-5 text-black" />
                                        </div>
                                        <p className="text-base text-[#424242] leading-relaxed">
                                            Select from curated nearby lunch spots that complement your vineyard experience perfectly.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Link href="/free-trial" className="block">
                                <Button className="group w-full py-6 rounded-2xl bg-black hover:bg-[#424242] text-white text-lg font-black uppercase tracking-wider transition-all border border-black active:scale-[0.98] flex items-center justify-center gap-3">
                                    <span>Start Free Trial</span>
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </Link>
                            <p className="text-center text-[#424242] text-base mt-3 font-medium">
                                No credit card required
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative p-8 rounded-3xl bg-white border border-[#E0E0E0] shadow-sm">
                            <div className="relative z-10">
                                <div className="flex justify-center mb-6">
                                    <div className="p-4 rounded-2xl bg-black border border-[#E0E0E0]">
                                        <Wine className="w-12 h-12 text-white" />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-center p-3 rounded-xl bg-[#F5F5F5] border border-[#E0E0E0]">
                                            <div className="text-2xl font-bold text-black">500+</div>
                                            <div className="text-sm text-[#424242]">Vineyards</div>
                                        </div>
                                        <div className="text-center p-3 rounded-xl bg-[#F5F5F5] border border-[#E0E0E0]">
                                            <div className="text-2xl font-bold text-black">200+</div>
                                            <div className="text-sm text-[#424242]">Restaurants</div>
                                        </div>
                                        <div className="text-center p-3 rounded-xl bg-[#F5F5F5] border border-[#E0E0E0]">
                                            <div className="text-2xl font-bold text-black">4.8★</div>
                                            <div className="text-sm text-[#424242]">Rating</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <Check className="w-5 h-5 text-black flex-shrink-0" />
                                            <span className="text-base text-[#424242]">Premium vineyard access</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Check className="w-5 h-5 text-black flex-shrink-0" />
                                            <span className="text-base text-[#424242]">Exclusive wine tasting offers</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Check className="w-5 h-5 text-black flex-shrink-0" />
                                            <span className="text-base text-[#424242]">Curated dining experiences</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Check className="w-5 h-5 text-black flex-shrink-0" />
                                            <span className="text-base text-[#424242]">Route optimization</span>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-[#F5F5F5] border border-[#E0E0E0]">
                                        <p className="text-base text-[#424242] italic mb-2 leading-relaxed">
                                            "Found the perfect vineyard and lunch spot for our anniversary!"
                                        </p>
                                        <p className="text-sm text-black">— Sarah M., Verified User</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col justify-center items-center min-h-screen p-4">
                <div className="w-full max-w-sm mx-auto space-y-6">
                    <div className="text-center space-y-2">
                        <h2 className="text-4xl font-bold text-black">What You Get</h2>
                        <p className="text-base text-[#424242] leading-relaxed">
                            Everything for the perfect vineyard experience
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex flex-row items-center bg-white rounded-xl border border-[#E0E0E0] p-4 w-full gap-3 shadow-sm">
                            <div className="p-2 rounded-lg bg-[#F5F5F5] border border-[#E0E0E0]">
                                <Search className="w-5 h-5 text-black" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-black text-lg">Discover</h3>
                                    <Check className="w-4 h-4 text-black" />
                                </div>
                                <p className="text-sm text-[#424242] leading-relaxed">
                                    Discover hundreds of vineyards and offers
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center bg-white rounded-xl border border-[#E0E0E0] p-4 w-full gap-3 shadow-sm">
                            <div className="p-2 rounded-lg bg-[#F5F5F5] border border-[#E0E0E0]">
                                <BarChart3 className="w-5 h-5 text-black" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-black text-lg">Compare</h3>
                                    <Check className="w-4 h-4 text-black" />
                                </div>
                                <p className="text-sm text-[#424242] leading-relaxed">
                                    Compare easily in one place
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center bg-white rounded-xl border border-[#E0E0E0] p-4 w-full gap-3 shadow-sm">
                            <div className="p-2 rounded-lg bg-[#F5F5F5] border border-[#E0E0E0]">
                                <Utensils className="w-5 h-5 text-black" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-black text-lg">Lunch</h3>
                                    <Check className="w-4 h-4 text-black" />
                                </div>
                                <p className="text-sm text-[#424242] leading-relaxed">
                                    Select nearby lunch spots
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-2 rounded-lg bg-[#F5F5F5] border border-[#E0E0E0]">
                            <div className="text-lg font-bold text-black">500+</div>
                            <div className="text-xs text-[#424242]">Vineyards</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-[#F5F5F5] border border-[#E0E0E0]">
                            <div className="text-lg font-bold text-black">200+</div>
                            <div className="text-xs text-[#424242]">Lunch Spots</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-[#F5F5F5] border border-[#E0E0E0]">
                            <div className="text-lg font-bold text-black">4.8★</div>
                            <div className="text-xs text-[#424242]">Rating</div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Link href="/free-trial">
                            <Button className="group w-full py-4 rounded-2xl bg-black hover:bg-[#424242] text-white text-base font-black uppercase tracking-wider border border-black active:scale-[0.98] flex items-center justify-center gap-2">
                                <span>Start Free Trial</span>
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <p className="text-center text-[#424242] text-base mt-2 font-medium">
                            No credit card required
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page