// components/selector/ContinueButton.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ContinueButtonProps {
    isValid: boolean;
    href: string;
    disabledHref?: string;
    label?: string;
    className?: string;
}

export function ContinueButton({
                                   isValid,
                                   href,
                                   disabledHref = "#",
                                   label = "CONTINUE",
                                   className = "",
                               }: ContinueButtonProps) {
    const buttonClasses = `group w-full py-4 text-lg font-bold rounded-2xl border-0 transition-all duration-300 flex items-center justify-center gap-2 ${
        isValid
            ? "gradient-cta text-white shadow-lg active:scale-[0.98]"
            : "bg-cream-dark text-warm-gray cursor-not-allowed"
    } ${className}`;

    return (
        <div className="w-full max-w-sm mt-8">
            <Link href={isValid ? href : disabledHref}>
                <button
                    className={buttonClasses}
                    type="button"
                    disabled={!isValid}
                >
                    {label}
                    {isValid && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </button>
            </Link>
        </div>
    );
}