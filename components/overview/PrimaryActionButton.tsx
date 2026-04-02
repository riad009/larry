// components/overview/PrimaryActionButton.tsx
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface PrimaryActionButtonProps {
    href?: string;
    onClick?: () => void;
}

export function PrimaryActionButton({ href = "/transport", onClick }: PrimaryActionButtonProps) {
    return (
        <div className="space-y-3 md:space-y-4 max-w-2xl mx-auto">
            <Link href={href} className="block">
                <button
                    onClick={onClick}
                    className="group w-full py-5 md:py-6 rounded-xl md:rounded-2xl bg-gradient-to-r from-white to-zinc-100 hover:from-zinc-100 hover:to-zinc-200 text-charcoal text-base md:text-lg font-black uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-[0.98] flex items-center justify-center gap-3 md:gap-4 shadow-lg"
                >
                    <span>View Transport Options</span>
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
            </Link>

            <p className="text-center text-zinc-500 text-sm md:text-base">
                Continue to see transport and concierge services for your trip.
            </p>
        </div>
    );
}
