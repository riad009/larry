// components/selector/SelectorHeader.tsx
interface SelectorHeaderProps {
    title?: string;
    subtitle?: string;
    className?: string;
}

export function SelectorHeader({
                                   title = "PLAN LIKE AN EXPERT",
                                   subtitle = "Start exploring curated vineyards in your favorite destinations.",
                                   className = ""
                               }: SelectorHeaderProps) {
    return (
        <div className={`text-center mb-10 px-6 ${className}`}>
            <h1 className="text-4xl font-extrabold text-black tracking-wide mb-2 uppercase">
                {title}
            </h1>
            <p className="text-lg text-[#424242] leading-relaxed">
                {subtitle}
            </p>
        </div>
    );
}