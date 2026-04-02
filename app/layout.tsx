// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import 'leaflet/dist/leaflet.css'

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "SmartRoute — Vineyard Journey",
    description: "Curated wine country experiences. Discover, compare, and plan your perfect vineyard tour with expert guidance from Larry Davis.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${inter.variable} ${playfair.variable} antialiased app-background`}>
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}