import React from "react";

export default function LoadingSkeleton() {
    return (
        <div className="min-h-screen text-black bg-white p-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-7xl">
                <div className="hidden md:flex gap-6">
                    <div className="w-80 p-6 bg-white rounded-3xl border border-[#E0E0E0] shadow-sm">
                        <div className="h-8 bg-[#E0E0E0] rounded mb-6 w-3/4 animate-pulse"></div>
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="mb-6">
                                <div className="h-4 bg-[#E0E0E0] rounded mb-2 w-1/2 animate-pulse"></div>
                                <div className="w-full bg-[#E0E0E0] border border-[#E0E0E0] p-3 rounded-lg h-12 animate-pulse"></div>
                            </div>
                        ))}
                        <div className="flex gap-3 mt-8">
                            <div className="flex-1 h-12 bg-[#E0E0E0] rounded-xl animate-pulse"></div>
                            <div className="flex-1 h-12 bg-[#E0E0E0] rounded-xl animate-pulse"></div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#E0E0E0] animate-pulse shadow-sm">
                                    <div className="h-48 bg-[#E0E0E0]"></div>
                                    <div className="p-4">
                                        <div className="h-6 bg-[#E0E0E0] rounded mb-2"></div>
                                        <div className="h-4 bg-[#E0E0E0] rounded mb-4 w-3/4"></div>
                                        <div className="flex justify-between">
                                            <div className="h-4 bg-[#E0E0E0] rounded w-1/4"></div>
                                            <div className="h-8 bg-[#E0E0E0] rounded w-1/3"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="md:hidden w-full max-w-sm">
                    <div className="w-full p-4 bg-white rounded-3xl mb-6 border border-[#E0E0E0] shadow-sm">
                        <div className="flex flex-row gap-2 mb-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex-1">
                                    <div className="h-4 w-16 bg-[#E0E0E0] rounded mb-2 animate-pulse"></div>
                                    <div className="w-full bg-[#E0E0E0] border border-[#E0E0E0] p-2 rounded-lg h-9 animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <div className="flex-1 h-12 bg-[#E0E0E0] rounded-xl animate-pulse"></div>
                            <div className="flex-1 h-12 bg-[#E0E0E0] rounded-xl animate-pulse"></div>
                        </div>
                    </div>

                    <div className="w-full max-w-sm space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-full bg-white rounded-2xl overflow-hidden border border-[#E0E0E0] animate-pulse shadow-sm">
                                <div className="h-48 bg-[#E0E0E0]"></div>
                                <div className="p-4">
                                    <div className="h-6 bg-[#E0E0E0] rounded mb-2"></div>
                                    <div className="h-4 bg-[#E0E0E0] rounded mb-4 w-3/4"></div>
                                    <div className="flex justify-between">
                                        <div className="h-4 bg-[#E0E0E0] rounded w-1/4"></div>
                                        <div className="h-8 bg-[#E0E0E0] rounded w-1/3"></div>
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