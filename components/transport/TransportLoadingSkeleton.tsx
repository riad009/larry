// components/transport/TransportLoadingSkeleton.tsx
import { Car } from "lucide-react";

export function TransportLoadingSkeleton() {
    return (
        <div className="min-h-screen text-white p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-7xl">
                {/* Desktop loading skeleton */}
                <div className="hidden md:flex gap-6">
                    {/* Filters sidebar skeleton */}
                    <div className="w-80 p-6 bg-zinc-900/50 rounded-3xl border border-zinc-800">
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

                    {/* Content skeleton - Grid layout */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div
                                    key={i}
                                    className="bg-zinc-900/30 rounded-2xl overflow-hidden border border-zinc-800 animate-pulse"
                                >
                                    <div className="p-4">
                                        <div className="h-6 bg-zinc-800 rounded mb-2 w-3/4"></div>
                                        <div className="h-4 bg-zinc-800 rounded mb-3 w-1/2"></div>
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

                {/* Mobile loading skeleton */}
                <div className="md:hidden w-full max-w-sm">
                    {/* Loading header */}
                    <div className="mb-8 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full border-4 border-zinc-800 border-t-green-500 animate-spin"></div>
                                <Car className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-green-500" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            Loading Transport
                        </h1>
                        <p className="text-zinc-400 text-sm">
                            Finding the best routes for your trip...
                        </p>
                    </div>

                    {/* Loading filters skeleton */}
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

                    {/* Loading cards skeleton */}
                    <div className="w-full max-w-sm space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="w-full bg-zinc-900/30 rounded-2xl overflow-hidden border border-zinc-800 animate-pulse"
                            >
                                <div className="p-4">
                                    <div className="h-6 bg-zinc-800 rounded mb-2 w-3/4"></div>
                                    <div className="h-4 bg-zinc-800 rounded mb-3 w-1/2"></div>
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