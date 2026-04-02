// components/selector/CountryRegionLayout.tsx
export function CountryRegionLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 app-background relative">
            {/* Decorative background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-10 left-1/4 w-72 h-72 bg-wine-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-1/4 w-56 h-56 bg-gold-500/5 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10 w-full flex flex-col items-center">
                {children}
            </div>
        </div>
    );
}