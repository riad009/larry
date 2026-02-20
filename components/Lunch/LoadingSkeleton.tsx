// components/Lunch/LoadingSkeleton.tsx
import React from "react";
import { Utensils } from "lucide-react";

interface LoadingSkeletonProps {
    // Optional props to customize the skeleton
    desktopSidebarWidth?: string;
    mobileCardCount?: number;
    desktopCardCount?: number;
}

export default function LoadingSkeleton({
                                            desktopSidebarWidth = "w-80",
                                            mobileCardCount = 3,
                                            desktopCardCount = 6,
                                        }: LoadingSkeletonProps) {
    return (
        <div className="min-h-screen text-white p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-7xl">
                {/* Desktop Loading Skeleton */}
                <div className="hidden md:flex gap-6">
                    {/* Filters Sidebar Skeleton */}
                    <div className={`${desktopSidebarWidth} p-6 bg-zinc-900/50 rounded-3xl border border-zinc-800`}>
                        <div className="h-8 bg-zinc-800 rounded mb-6 w-3/4 animate-pulse"></div>
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="mb-6">
                                <div className="h-4 bg-zinc-800 rounded mb-2 w-1/2 animate-pulse"></div>
                                <div className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-lg h-12 animate-pulse"></div>
                            </div>
                        ))}
                        <div className="flex gap-3 mt-8">
                            <div className="flex-1 h-12 bg-zinc-800 rounded-xl animate-pulse"></div>
                            <div className="flex-1 h-12 bg-zinc-800 rounded-xl animate-pulse"></div>
                        </div>
                    </div>

                    {/* Content Skeleton - Grid Layout */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {Array.from({ length: desktopCardCount }).map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-zinc-900/30 rounded-2xl overflow-hidden border border-zinc-800 animate-pulse"
                                >
                                    <div className="h-48 bg-zinc-800"></div>
                                    <div className="p-4">
                                        <div className="h-6 bg-zinc-800 rounded mb-2"></div>
                                        <div className="h-4 bg-zinc-800 rounded mb-4 w-3/4"></div>
                                        <div className="flex justify-between">
                                            <div className="h-4 bg-zinc-800 rounded w-1/4"></div>
                                            <div className="h-8 bg-zinc-800 rounded w-1/3"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Loading Skeleton */}
                <div className="md:hidden w-full max-w-sm">
                    {/* Loading Header */}
                    <div className="mb-8 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full border-4 border-zinc-800 border-t-green-500 animate-spin"></div>
                                <Utensils className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-green-500" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            Loading Restaurants
                        </h1>
                        <p className="text-zinc-400 text-sm">
                            Discovering culinary experiences...
                        </p>
                    </div>

                    {/* Filters Skeleton */}
                    <div className="w-full p-4 bg-zinc-900/50 rounded-3xl mb-6 border border-zinc-800">
                        <div className="flex flex-row gap-2 mb-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex-1">
                                    <div className="h-4 w-16 bg-zinc-800 rounded mb-2 animate-pulse"></div>
                                    <div className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded-lg h-9 animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <div className="flex-1 h-12 bg-zinc-800 rounded-xl animate-pulse"></div>
                            <div className="flex-1 h-12 bg-zinc-800 rounded-xl animate-pulse"></div>
                        </div>
                    </div>

                    {/* Cards Skeleton */}
                    <div className="w-full max-w-sm space-y-4">
                        {Array.from({ length: mobileCardCount }).map((_, i) => (
                            <div
                                key={i}
                                className="w-full bg-zinc-900/30 rounded-2xl overflow-hidden border border-zinc-800 animate-pulse"
                            >
                                <div className="h-48 bg-zinc-800"></div>
                                <div className="p-4">
                                    <div className="h-6 bg-zinc-800 rounded mb-2"></div>
                                    <div className="h-4 bg-zinc-800 rounded mb-4 w-3/4"></div>
                                    <div className="flex justify-between">
                                        <div className="h-4 bg-zinc-800 rounded w-1/4"></div>
                                        <div className="h-8 bg-zinc-800 rounded w-1/3"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}