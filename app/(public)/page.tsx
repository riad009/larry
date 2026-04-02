import Link from "next/link";
import { Wine, ArrowRight, Star, MapPin, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Mobile background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: "url('/images/mobile-bg.jpg')" }}
      />
      {/* Desktop background */}
      <div
        className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
        style={{ backgroundImage: "url('/images/Desktop-bg.png')" }}
      />
      {/* Wine-tinted overlay with luxury gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2A070D]/80 via-[#1A1A2E]/50 to-[#9B1B30]/30" />

      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gold-500/10 blur-3xl animate-float" />
      <div className="absolute bottom-40 right-10 w-48 h-48 rounded-full bg-wine-500/10 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="animate-fade-in-up stagger-1 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-8">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-sm font-medium text-gold-300 tracking-wide">Curated Wine Experiences</span>
          </div>

          {/* Title */}
          <h1 className="animate-fade-in-up stagger-2 text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-white mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            Smart<span className="text-gradient-gold">Route</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up stagger-3 text-xl md:text-3xl font-medium text-white/90 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Vineyard Journey
          </p>

          {/* Description */}
          <p className="animate-fade-in-up stagger-4 text-base md:text-lg text-white/70 max-w-lg mx-auto mb-4 leading-relaxed">
            Curated by Larry Davis — 25 years planning<br className="hidden md:block" />
            Food & Wine experiences
          </p>

          {/* Stats row */}
          <div className="animate-fade-in-up stagger-5 flex items-center justify-center gap-6 md:gap-10 mb-10">
            <div className="flex items-center gap-2 text-white/60">
              <Wine className="w-4 h-4 text-gold-400" />
              <span className="text-sm font-medium">500+ Vineyards</span>
            </div>
            <div className="w-1 h-4 bg-white/20 rounded-full" />
            <div className="flex items-center gap-2 text-white/60">
              <MapPin className="w-4 h-4 text-gold-400" />
              <span className="text-sm font-medium">200+ Restaurants</span>
            </div>
            <div className="w-1 h-4 bg-white/20 rounded-full hidden md:block" />
            <div className="hidden md:flex items-center gap-2 text-white/60">
              <Star className="w-4 h-4 text-gold-400" />
              <span className="text-sm font-medium">4.8★ Rating</span>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href="/what-you-get"
            className="animate-fade-in-up stagger-6 inline-flex items-center gap-3 gradient-gold-cta text-charcoal px-10 py-5 rounded-full text-lg font-bold tracking-wide shadow-lg hover:shadow-2xl transition-all duration-400 group"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#2A070D]/50 to-transparent" />
    </div>
  );
}
