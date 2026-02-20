"use client";

import { usePathname, useRouter } from "next/navigation";
import { Wine, Utensils, MapPin, Car, ChevronLeft } from "lucide-react";

type NavigationTab = "Vineyard" | "Lunch" | "Trip" | "Transport";

interface TabOption {
    name: NavigationTab;
    path: string;
    icon: React.ReactNode;
}

const tabs: TabOption[] = [
    { name: "Vineyard", path: "/vineyard", icon: <Wine className="w-4 h-4" /> },
    { name: "Lunch", path: "/lunch", icon: <Utensils className="w-4 h-4" /> },
    { name: "Trip", path: "/overview", icon: <MapPin className="w-4 h-4" /> },
    { name: "Transport", path: "/transport", icon: <Car className="w-4 h-4" /> },
];

export default function TopTabs() {
    const pathname = usePathname();
    const router = useRouter();

    const handleBackToPlan = () => {
        router.push("/plan-like-an-expert");
    };

    return (
        <div className="w-full flex justify-center px-4 mb-6 mt-3">
            {/* Desktop - Horizontal tabs with back button in same row */}
            <div className="hidden md:flex flex-col items-center w-full max-w-4xl">
                {/* Main container with back button and tabs in same row */}
                <div className="flex items-center justify-between w-full gap-4 mb-4">
                    {/* Back Button - Separate styled container */}
                    <button
                        onClick={handleBackToPlan}
                        className="group flex items-center gap-3 px-4 py-3 bg-white border border-[#E0E0E0] hover:border-black rounded-2xl transition-all duration-300 shadow-sm"
                    >
                        <div className="p-1.5 bg-[#F5F5F5] group-hover:bg-[#E0E0E0] rounded-lg transition-colors duration-300 border border-[#E0E0E0]">
                            <ChevronLeft className="w-4 h-4 text-black transition-colors" />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-xs text-[#424242] transition-colors">
                                BACK TO
                            </span>
                            <span className="text-sm font-bold text-black transition-colors">
                                Plan Like an Expert
                            </span>
                        </div>
                    </button>

                    {/* Tabs Container */}
                    <div className="flex-1 flex items-center justify-between p-1 bg-white rounded-2xl border border-[#E0E0E0] shadow-sm">
                        {tabs.map((tab) => {
                            const isActive = pathname === tab.path;

                            return (
                                <button
                                    key={tab.name}
                                    onClick={() => router.push(tab.path)}
                                    className={`
                                        flex-1 flex flex-col items-center justify-center 
                                        py-3 px-4 rounded-xl transition-all duration-200
                                        ${isActive
                                        ? 'bg-black text-white shadow-sm'
                                        : 'text-[#424242] hover:text-black hover:bg-[#F5F5F5]'
                                    }
                                    `}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className={`
                                            p-1.5 rounded-lg
                                            ${isActive ? 'bg-white/20' : 'bg-[#F5F5F5] border border-[#E0E0E0]'}
                                        `}>
                                            {tab.icon}
                                        </div>
                                        <span className="text-sm font-bold tracking-wide">
                                            {tab.name}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Progress indicator */}
                <div className="flex items-center gap-1">
                    {tabs.map((tab, index) => {
                        const isActive = pathname === tab.path;
                        const isCompleted = tabs.findIndex(t => t.path === pathname) > tabs.findIndex(t => t.path === tab.path);

                        return (
                            <div key={`progress-${tab.name}`} className="flex items-center">
                                <div className={`
                                    w-2 h-2 rounded-full transition-all duration-300
                                    ${isActive
                                    ? 'bg-black'
                                    : isCompleted
                                        ? 'bg-[#424242]'
                                        : 'bg-[#E0E0E0]'
                                }
                                `}></div>
                                {index < tabs.length - 1 && (
                                    <div className={`
                                        w-6 h-0.5 transition-all duration-300
                                        ${isCompleted ? 'bg-[#424242]' : 'bg-[#E0E0E0]'}
                                    `}></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile - Stacked layout */}
            <div className="md:hidden w-full max-w-sm">
                <div className="flex flex-col items-center">
                    {/* Back Button for Mobile - Styled similarly */}
                    <button
                        onClick={handleBackToPlan}
                        className="group w-full flex items-center justify-between px-4 py-3 bg-white border border-[#E0E0E0] hover:border-black rounded-2xl mb-4 transition-all duration-300 shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-[#F5F5F5] rounded-lg transition-colors duration-300 border border-[#E0E0E0]">
                                <ChevronLeft className="w-4 h-4 text-black transition-colors" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-xs text-[#424242] transition-colors">
                                    BACK TO
                                </span>
                                <span className="text-sm font-bold text-black transition-colors">
                                    Plan Like an Expert
                                </span>
                            </div>
                        </div>
                    </button>

                    {/* Tabs */}
                    <div className="flex items-center justify-between w-full p-1 bg-white rounded-2xl border border-[#E0E0E0] shadow-sm">
                        {tabs.map((tab) => {
                            const isActive = pathname === tab.path;

                            return (
                                <button
                                    key={tab.name}
                                    onClick={() => router.push(tab.path)}
                                    className={`
                                        flex-1 flex flex-col items-center justify-center 
                                        py-2.5 px-2 rounded-xl transition-all duration-200
                                        ${isActive
                                        ? 'bg-black text-white shadow-sm'
                                        : 'text-[#424242]'
                                    }
                                    `}
                                >
                                    <div className={`
                                        p-1.5 rounded-lg mb-1
                                        ${isActive ? 'bg-white/20' : 'bg-[#F5F5F5] border border-[#E0E0E0]'}
                                    `}>
                                        {tab.icon}
                                    </div>
                                    <span className="text-xs font-bold tracking-wide">
                                        {tab.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Step indicator */}
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-[#424242] font-medium">
                            Step {tabs.findIndex(t => t.path === pathname) + 1} of {tabs.length}
                        </span>
                        <span className="text-xs font-bold text-black">
                            {pathname === '/vineyard' && 'Vineyard'}
                            {pathname === '/lunch' && 'Lunch'}
                            {pathname === '/overview' && 'Trip'}
                            {pathname === '/transport' && 'Transport'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}