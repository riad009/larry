// components/selector/ContinueButton.tsx
import Link from "next/link";

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
    const buttonClasses = `w-full py-3 text-lg font-semibold rounded-full border-2 transition-colors ${
        isValid
            ? "bg-black text-white hover:bg-[#424242] border-black"
            : "bg-[#E0E0E0] text-[#424242] cursor-not-allowed border-[#E0E0E0]"
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
                </button>
            </Link>
        </div>
    );
}