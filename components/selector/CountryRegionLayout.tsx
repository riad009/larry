// components/selector/CountryRegionLayout.tsx
import { ReactNode } from "react";

interface CountryRegionLayoutProps {
    children: ReactNode;
    className?: string;
}

export function CountryRegionLayout({ children, className = "" }: CountryRegionLayoutProps) {
    return (
        <div className={`flex flex-col items-center justify-center min-h-screen w-full p-4 ${className}`}>
            {children}
        </div>
    );
}