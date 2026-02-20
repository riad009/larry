// components/transport/TransportLayout.tsx
import { ReactNode } from "react";

interface TransportLayoutProps {
    children: ReactNode;
    isDesktop?: boolean;
}

export function TransportLayout({ children, isDesktop = false }: TransportLayoutProps) {
    if (isDesktop) {
        return (
            <div className="hidden md:block max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className="md:hidden flex flex-col items-center">
            {children}
        </div>
    );
}