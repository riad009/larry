"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  Wine, ArrowRight, Star, MapPin, Sparkles, Grape, Utensils, Car,
  Heart, Shield, Clock, Globe, ChevronDown, Quote, Users, Award, Map,
  GlassWater, Mountain, Sun, Compass
} from "lucide-react";

/* ─── Intersection Observer hook for scroll reveals ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(".reveal, .reveal-scale, .reveal-left, .reveal-right, .img-reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ─── Data ─── */
const REGIONS = [
  { name: "Bordeaux", country: "France", img: "/images/vineyard-placeholder.webp", desc: "Legendary châteaux & Grand Crus" },
  { name: "Tuscany", country: "Italy", img: "/images/vineyard-placeholder2.jpg", desc: "Rolling hills & Super Tuscans" },
  { name: "Rioja", country: "Spain", img: "/images/lunch.jpg", desc: "Tempranillo heritage & bodegas" },
];

const TESTIMONIALS = [
  { quote: "SmartRoute made our Bordeaux trip effortless. Every vineyard, every meal — perfectly planned.", name: "Sarah & James M.", location: "London, UK", rating: 5 },
  { quote: "The curated itinerary saved us hours of research. We discovered hidden gems we'd never have found alone.", name: "Marco R.", location: "Munich, DE", rating: 5 },
  { quote: "Larry's 25 years of expertise shows in every recommendation. An absolutely unforgettable experience.", name: "Claire D.", location: "Sydney, AU", rating: 5 },
];

const STATS = [
  { value: "500+", label: "Vineyards", icon: Grape },
  { value: "200+", label: "Restaurants", icon: Utensils },
  { value: "3", label: "Countries", icon: Globe },
  { value: "4.8★", label: "Rating", icon: Star },
];

export default function Home() {
  const containerRef = useReveal();

  return (
    <div ref={containerRef} className="overflow-hidden bg-[#0D0A0B]">
      {/* ═══════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Backgrounds */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden" style={{ backgroundImage: "url('/images/mobile-bg.jpg')" }} />
        <div className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block" style={{ backgroundImage: "url('/images/Desktop-bg.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0A0B]/90 via-[#1A1A2E]/65 to-[#0D0A0B]" />

        {/* Animated glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[340px] h-[340px] rounded-full bg-wine-500/20 animate-glow-pulse pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/6 w-[260px] h-[260px] rounded-full bg-gold-500/15 animate-glow-pulse pointer-events-none" style={{ animationDelay: "2s" }} />

        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto">
          {/* Top badge */}
          <div className="animate-fade-in-up stagger-1 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-gold-500/20 bg-white/[0.04] backdrop-blur-xl mb-10">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-sm font-medium text-gold-300 tracking-widest uppercase">Curated Wine Experiences</span>
          </div>

          {/* Logo title */}
          <h1 className="animate-fade-in-up stagger-2 text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.9] text-white mb-2 tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>
            Smart<span className="text-gradient-gold">Route</span>
          </h1>

          {/* Gold divider line */}
          <div className="animate-fade-in-up stagger-3 wine-divider w-24 md:w-40 my-6" />

          {/* Subtitle */}
          <p className="animate-fade-in-up stagger-3 text-xl md:text-3xl lg:text-4xl font-light text-white/90 tracking-wide mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Your Vineyard Journey Awaits
          </p>

          {/* Description */}
          <p className="animate-fade-in-up stagger-4 text-base md:text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed font-light">
            Expertly curated by Larry Davis — 25&nbsp;years crafting unforgettable food&nbsp;&amp;&nbsp;wine experiences across Europe&apos;s finest wine regions.
          </p>

          {/* CTA group */}
          <div className="animate-fade-in-up stagger-5 flex flex-col sm:flex-row items-center gap-4 mb-14">
            <Link
              href="/what-you-get"
              className="group relative inline-flex items-center gap-3 gradient-gold-cta text-charcoal px-10 py-4 rounded-full text-lg font-bold tracking-wide shadow-[0_0_40px_rgba(212,168,67,0.3)] hover:shadow-[0_0_60px_rgba(212,168,67,0.5)] transition-all duration-500"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white px-6 py-4 rounded-full text-sm font-medium border border-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
            >
              Already a member? Sign In
            </Link>
          </div>

          {/* Stats ticker */}
          <div className="animate-fade-in-up stagger-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-2xl">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 py-3">
                <Icon className="w-4 h-4 text-gold-400/60" />
                <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">{value}</span>
                <span className="text-[11px] text-white/40 uppercase tracking-widest font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-gentle-bounce">
          <ChevronDown className="w-5 h-5 text-white/30" />
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 2 — THE EXPERIENCE
          ═══════════════════════════════════ */}
      <section className="relative py-24 md:py-36 px-6">
        {/* Bg gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0A0B] via-[#120E10] to-[#0D0A0B]" />
        <div className="absolute top-0 left-0 right-0 wine-divider" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section heading */}
          <div className="text-center mb-16 md:mb-24">
            <p className="reveal text-xs uppercase tracking-[0.35em] text-gold-400/70 font-semibold mb-4">The Experience</p>
            <h2 className="reveal delay-100 text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              More Than a Trip —<br />A <span className="text-gradient-gold">Wine Journey</span>
            </h2>
            <p className="reveal delay-200 text-base md:text-lg text-white/40 max-w-2xl mx-auto mt-6 leading-relaxed">
              We blend decades of local expertise with intelligent route planning to craft immersive wine experiences tailored just for you.
            </p>
          </div>

          {/* Feature cards — 3-column layout */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Grape,
                title: "Hand-Picked Vineyards",
                desc: "Every vineyard is personally visited and vetted. From boutique family estates to prestigious Grand Crus, we curate only the finest.",
                accent: "from-wine-500/20 to-wine-700/10",
              },
              {
                icon: Utensils,
                title: "Exceptional Dining",
                desc: "Michelin-starred restaurants, charming bistros, and hidden local gems — each paired perfectly with your vineyard route.",
                accent: "from-gold-500/20 to-gold-600/10",
              },
              {
                icon: Compass,
                title: "Smart Route Planning",
                desc: "Our intelligent routing optimises your day — minimising drive time and maximising experiences, so every moment counts.",
                accent: "from-wine-400/15 to-gold-500/10",
              },
            ].map(({ icon: Icon, title, desc, accent }, i) => (
              <div
                key={title}
                className={`reveal tilt-card ${i === 1 ? "delay-200" : i === 2 ? "delay-400" : ""} group relative rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-8 md:p-10 overflow-hidden`}
              >
                {/* Glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl`} />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/20 to-gold-600/10 border border-gold-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                    {title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 3 — HOW IT WORKS (Steps)
          ═══════════════════════════════════ */}
      <section className="relative py-24 md:py-36 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0A0B] to-[#0F0B0D]" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <p className="reveal text-xs uppercase tracking-[0.35em] text-gold-400/70 font-semibold mb-4">Journey Steps</p>
            <h2 className="reveal delay-100 text-3xl md:text-5xl lg:text-6xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              Plan in <span className="text-gradient-gold">Four</span> Simple Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

            {[
              { step: "01", icon: Grape, title: "Select Vineyards", desc: "Browse curated vineyards filtered by region, style, and rating" },
              { step: "02", icon: Utensils, title: "Pick Restaurants", desc: "Choose lunch spots matched to your route and taste" },
              { step: "03", icon: Map, title: "Review Your Route", desc: "Interactive map with optimised driving directions" },
              { step: "04", icon: Car, title: "Book Transport", desc: "Private drivers or self-drive — we handle the logistics" },
            ].map(({ step, icon: Icon, title, desc }, i) => (
              <div key={step} className={`reveal ${i > 0 ? `delay-${i * 200}` : ""} text-center group`}>
                {/* Step circle */}
                <div className="relative mx-auto w-32 h-32 rounded-full border border-white/[0.06] bg-white/[0.02] flex flex-col items-center justify-center mb-6 group-hover:border-gold-500/30 transition-all duration-500">
                  <span className="text-[10px] text-gold-500 font-bold tracking-widest uppercase mb-1">{step}</span>
                  <Icon className="w-8 h-8 text-white/70 group-hover:text-gold-400 transition-colors duration-500" />
                  {/* Glow ring */}
                  <div className="absolute inset-0 rounded-full bg-gold-500/5 opacity-0 group-hover:opacity-100 animate-ring-pulse transition-opacity duration-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-playfair)" }}>{title}</h3>
                <p className="text-sm text-white/35 leading-relaxed max-w-[200px] mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 4 — WINE REGIONS SHOWCASE
          ═══════════════════════════════════ */}
      <section className="relative py-24 md:py-36 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0B0D] via-[#140F11] to-[#0D0A0B]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <p className="reveal text-xs uppercase tracking-[0.35em] text-gold-400/70 font-semibold mb-4">Destinations</p>
            <h2 className="reveal delay-100 text-3xl md:text-5xl lg:text-6xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              Explore Europe&apos;s Finest <span className="text-gradient-gold">Wine Regions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {REGIONS.map((region, i) => (
              <div key={region.name} className={`reveal-scale ${i > 0 ? `delay-${i * 200}` : ""} group relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer`}>
                {/* Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${region.img}')` }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A0B] via-[#0D0A0B]/40 to-transparent" />
                {/* Top badge */}
                <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/10">
                  <span className="text-xs text-white/70 font-medium tracking-wide">{region.country}</span>
                </div>
                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                    {region.name}
                  </h3>
                  <p className="text-sm text-white/50 mb-4">{region.desc}</p>
                  <div className="flex items-center gap-2 text-gold-400 text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    <span>Explore region</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 5 — WHY SMARTROUTE
          ═══════════════════════════════════ */}
      <section className="relative py-24 md:py-36 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0A0B] to-[#0F0B0D]" />
        <div className="absolute top-0 left-0 right-0 wine-divider" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left — Text */}
            <div>
              <p className="reveal text-xs uppercase tracking-[0.35em] text-gold-400/70 font-semibold mb-4">Why SmartRoute</p>
              <h2 className="reveal delay-100 text-3xl md:text-5xl font-bold text-white leading-tight mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
                Wine Travel,<br /><span className="text-gradient-gold">Perfected</span>
              </h2>

              <div className="space-y-6">
                {[
                  { icon: Shield, title: "Expert Curation", desc: "Every listing personally vetted by Larry Davis with 25 years of local knowledge" },
                  { icon: Clock, title: "Time-Optimised", desc: "Smart routing means less driving, more tasting — every minute of your day maximised" },
                  { icon: Heart, title: "Personalised", desc: "Filter by wine style, budget, dining preference, and pace — your trip, your way" },
                  { icon: Award, title: "Trusted Reviews", desc: "Real ratings from fellow wine enthusiasts who've walked the same paths" },
                ].map(({ icon: Icon, title, desc }, i) => (
                  <div key={title} className={`reveal delay-${(i + 1) * 100} flex gap-4 group`}>
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-gold-500/15 to-gold-600/5 border border-gold-500/10 flex items-center justify-center group-hover:border-gold-500/30 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-gold-400/80" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-sm">{title}</h4>
                      <p className="text-white/35 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Image collage */}
            <div className="reveal-right relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/[0.06]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/vineyard-placeholder.webp')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A0B]/80 via-transparent to-[#0D0A0B]/30" />
                {/* Floating stat card */}
                <div className="absolute bottom-6 left-6 right-6 glass-dark rounded-2xl p-5 border border-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Travellers served</p>
                      <p className="text-3xl font-bold text-white">2,400+</p>
                    </div>
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className="w-9 h-9 rounded-full bg-gradient-to-br from-wine-400 to-wine-600 border-2 border-[#0D0A0B] flex items-center justify-center">
                          <Users className="w-3.5 h-3.5 text-white/70" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative glow behind image */}
              <div className="absolute -inset-4 rounded-3xl bg-wine-500/10 blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 6 — TESTIMONIALS
          ═══════════════════════════════════ */}
      <section className="relative py-24 md:py-36 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0B0D] to-[#0D0A0B]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <p className="reveal text-xs uppercase tracking-[0.35em] text-gold-400/70 font-semibold mb-4">Testimonials</p>
            <h2 className="reveal delay-100 text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              What Our <span className="text-gradient-gold">Guests</span> Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`reveal ${i > 0 ? `delay-${i * 200}` : ""} tilt-card relative rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-8 overflow-hidden`}>
                {/* Quote mark */}
                <Quote className="w-8 h-8 text-gold-500/20 mb-4" />
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/30 text-xs">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 7 — EXPERIENCE TYPES
          ═══════════════════════════════════ */}
      <section className="relative py-24 md:py-36 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0A0B] to-[#120E10]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <p className="reveal text-xs uppercase tracking-[0.35em] text-gold-400/70 font-semibold mb-4">Experiences</p>
            <h2 className="reveal delay-100 text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              Tailor Your Perfect <span className="text-gradient-gold">Day</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Wine, label: "Wine Tasting", sub: "Guided flights & cellar tours" },
              { icon: GlassWater, label: "Fine Dining", sub: "Michelin to rustic charm" },
              { icon: Mountain, label: "Scenic Drives", sub: "Through rolling vineyards" },
              { icon: Sun, label: "Private Tours", sub: "Exclusive estate access" },
            ].map(({ icon: Icon, label, sub }, i) => (
              <div key={label} className={`reveal-scale ${i > 0 ? `delay-${i * 100}` : ""} group relative rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 md:p-8 text-center hover:border-gold-500/20 transition-all duration-500 cursor-pointer`}>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-wine-500/10 to-gold-500/10 border border-white/[0.06] flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:border-gold-500/20 transition-all duration-500">
                  <Icon className="w-7 h-7 text-white/60 group-hover:text-gold-400 transition-colors duration-500" />
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">{label}</h4>
                <p className="text-white/30 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 8 — FINAL CTA
          ═══════════════════════════════════ */}
      <section className="relative py-28 md:py-40 px-6 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/vineyard-placeholder2.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0A0B]/95 via-[#0D0A0B]/85 to-[#0D0A0B]/95" />

        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold-500/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="reveal">
            <p className="text-xs uppercase tracking-[0.35em] text-gold-400/70 font-semibold mb-6">Begin Your Journey</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              Your Dream Wine Trip<br />
              <span className="text-gradient-gold">Starts Here</span>
            </h2>
            <p className="text-white/40 text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              Join thousands of wine lovers who trust SmartRoute to plan their perfect vineyard experience. Start planning for free.
            </p>
          </div>

          <div className="reveal delay-200 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/what-you-get"
              className="group relative inline-flex items-center gap-3 gradient-gold-cta text-charcoal px-12 py-5 rounded-full text-lg font-bold tracking-wide shadow-[0_0_50px_rgba(212,168,67,0.3)] hover:shadow-[0_0_80px_rgba(212,168,67,0.5)] transition-all duration-500"
            >
              Get Started — It&apos;s Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white px-6 py-4 rounded-full text-sm font-medium border border-white/10 hover:border-white/25 transition-all duration-300"
            >
              Sign In
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FOOTER
          ═══════════════════════════════════ */}
      <footer className="relative py-12 px-6 border-t border-white/[0.04]">
        <div className="absolute inset-0 bg-[#0D0A0B]" />
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Wine className="w-5 h-5 text-gold-500" />
            <span className="text-white/60 text-sm font-medium" style={{ fontFamily: "var(--font-playfair)" }}>
              Smart<span className="text-gold-400">Route</span>
            </span>
          </div>
          <p className="text-white/20 text-xs">&copy; {new Date().getFullYear()} SmartRoute. Curated by Larry Davis. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-white/30 text-xs hover:text-white/60 transition-colors">Sign In</Link>
            <Link href="/what-you-get" className="text-white/30 text-xs hover:text-white/60 transition-colors">Get Started</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
