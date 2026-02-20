// components/overview/OverviewLayout.tsx
import { ReactNode } from "react";

interface OverviewLayoutProps {
    children: ReactNode;
}

export function OverviewLayout({ children }: OverviewLayoutProps) {
    return (
        <div className="min-h-screen p-3 md:p-6 lg:p-8 text-white max-w-7xl mx-auto">
            {children}
        </div>
    );
}