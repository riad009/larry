// components/Lunch/MainLayoutWrapper.tsx
import React, { ReactNode } from "react";

interface MainLayoutWrapperProps {
    children: ReactNode;
    variant?: "desktop" | "mobile";
    className?: string;
}

export default function MainLayoutWrapper({
                                              children,
                                              variant = "desktop",
                                              className = "",
                                          }: MainLayoutWrapperProps) {
    if (variant === "desktop") {
        return (
            <div className={`hidden md:block max-w-7xl mx-auto ${className}`}>
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {children}
                </div>
            </div>
        );
    }

    // Mobile variant
    return (
        <div className={`md:hidden flex flex-col items-center ${className}`}>
            {children}
        </div>
    );
}