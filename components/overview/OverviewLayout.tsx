// components/overview/OverviewLayout.tsx
import { ReactNode } from "react";

interface OverviewLayoutProps {
    children: ReactNode;
    /** When true, full viewport split layout (Overview page only): no max-width, h-screen, overflow hidden */
    fullViewport?: boolean;
}

export function OverviewLayout({ children, fullViewport }: OverviewLayoutProps) {
    if (fullViewport) {
        return (
            <div className="min-h-screen w-full overflow-visible flex flex-col text-charcoal bg-white/70 backdrop-blur-sm">
                {children}
            </div>
        );
    }
    return (
        <div className="min-h-screen p-3 md:p-6 lg:p-8 text-charcoal bg-white/70 backdrop-blur-sm max-w-7xl mx-auto">
            {children}
        </div>
    );
}