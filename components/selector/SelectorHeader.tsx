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
            <h1 className="text-4xl font-extrabold text-gradient-wine tracking-wide mb-2 uppercase" style={{ fontFamily: 'var(--font-playfair)' }}>
                {title}
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-wine-500 to-gold-500 rounded-full mx-auto mb-4" />
            <p className="text-lg text-warm-gray leading-relaxed">
                {subtitle}
            </p>
        </div>
    );
}