import React from "react";
import { Wine } from "lucide-react";

export default function LoadingSkeleton() {
    return (
        <div className="min-h-screen text-charcoal app-background p-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-7xl">
                {/* Desktop Skeleton */}
                <div className="hidden md:flex gap-6">
                    <div className="w-80 p-6 glass-card rounded-3xl">
                        <div className="h-8 bg-wine-100 rounded mb-6 w-3/4 animate-pulse"></div>
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="mb-6">
                                <div className="h-4 bg-wine-100 rounded mb-2 w-1/2 animate-pulse"></div>
                                <div className="w-full bg-wine-50 border border-warm-border p-3 rounded-lg h-12 animate-pulse"></div>
                            </div>
                        ))}
                        <div className="flex gap-3 mt-8">
                            <div className="flex-1 h-12 bg-wine-100 rounded-xl animate-pulse"></div>
                            <div className="flex-1 h-12 bg-wine-50 rounded-xl animate-pulse"></div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center justify-center py-20">
                            <div className="flex flex-col items-center gap-4">
                                <div className="p-4 rounded-2xl gradient-wine-light animate-pulse">
                                    <Wine className="w-10 h-10 text-wine-500" />
                                </div>
                                <p className="text-warm-gray text-sm font-medium">Loading vineyards...</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Skeleton */}
                <div className="md:hidden w-full max-w-sm mx-auto">
                    <div className="flex flex-col items-center gap-4 py-12">
                        <div className="p-4 rounded-2xl gradient-wine-light animate-pulse">
                            <Wine className="w-10 h-10 text-wine-500" />
                        </div>
                        <p className="text-warm-gray text-sm font-medium">Loading vineyards...</p>
                    </div>

                    <div className="w-full p-4 glass-card rounded-3xl mb-6">
                        <div className="flex flex-row gap-2 mb-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex-1">
                                    <div className="h-4 w-16 bg-wine-100 rounded mb-2 animate-pulse"></div>
                                    <div className="w-full bg-wine-50 border border-warm-border p-2 rounded-lg h-9 animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <div className="flex-1 h-12 bg-wine-100 rounded-xl animate-pulse"></div>
                            <div className="flex-1 h-12 bg-wine-50 rounded-xl animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}