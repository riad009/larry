"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Wine, MapPin, ChevronRight, Sparkles } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("wineLover");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedName = name.trim();

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: normalizedName,
          email: normalizedEmail,
          password,
          userType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to sign up");
      }

      const userObj = {
        id: data.userId,
        name: normalizedName,
        email: normalizedEmail,
        role: "user",
        userType: userType,
        isActive: true
      };

      localStorage.setItem("user", JSON.stringify(userObj));

      router.push("/plan-like-an-expert");
      router.refresh();

    } catch (err: any) {
      console.error("Overall error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen app-background p-4">
        {/* Decorative background */}
        <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-wine-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block w-full max-w-md relative z-10">
          <div className="glass-card rounded-3xl p-8 shadow-xl animate-fade-in-up">
            <div className="space-y-6">
              <div className="text-center space-y-3">
                <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-full gradient-wine shadow-lg animate-pulse-glow">
                        <Wine className="w-7 h-7 text-white" />
                    </div>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-200/50 border border-gold-300/50">
                    <Sparkles className="w-3 h-3 text-gold-500" />
                    <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">7-Day Free Trial</span>
                </div>
                <h1 className="text-2xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-playfair)' }}>Start Your Free Trial</h1>
                <p className="text-sm text-warm-gray">Join thousands discovering premium vineyards</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-charcoal">Full Name</Label>
                  <Input
                      id="name"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/80 border-warm-border text-charcoal placeholder:text-warm-gray/60 focus:border-wine-500 focus:ring-wine-500/20 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-charcoal">Email Address</Label>
                  <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/80 border-warm-border text-charcoal placeholder:text-warm-gray/60 focus:border-wine-500 focus:ring-wine-500/20 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-charcoal">Password</Label>
                  <Input
                      id="password"
                      type="password"
                      placeholder="Choose a secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/80 border-warm-border text-charcoal placeholder:text-warm-gray/60 focus:border-wine-500 focus:ring-wine-500/20 rounded-xl"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-charcoal">I am a:</Label>
                  <RadioGroup
                      defaultValue="wineLover"
                      onValueChange={(val) => setUserType(val)}
                      className="grid grid-cols-2 gap-3"
                  >
                    <div className="relative">
                      <RadioGroupItem value="wineLover" id="wineLover" className="sr-only peer" />
                      <Label
                          htmlFor="wineLover"
                          className="flex flex-col items-center justify-center p-4 rounded-xl border border-warm-border bg-white/60 peer-data-[state=checked]:border-wine-500 peer-data-[state=checked]:bg-wine-50 cursor-pointer transition-all hover-lift"
                      >
                        <Wine className="w-5 h-5 mb-2 text-wine-500" />
                        <span className="text-sm font-medium text-charcoal">Wine Lover</span>
                      </Label>
                    </div>
                    <div className="relative">
                      <RadioGroupItem value="travelPro" id="travelPro" className="sr-only peer" />
                      <Label
                          htmlFor="travelPro"
                          className="flex flex-col items-center justify-center p-4 rounded-xl border border-warm-border bg-white/60 peer-data-[state=checked]:border-wine-500 peer-data-[state=checked]:bg-wine-50 cursor-pointer transition-all hover-lift"
                      >
                        <MapPin className="w-5 h-5 mb-2 text-wine-500" />
                        <span className="text-sm font-medium text-charcoal">Travel Pro</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                    <p className="text-sm text-red-700 text-center">{error}</p>
                  </div>
              )}

              <Button
                  onClick={handleSignup}
                  disabled={loading}
                  className="group w-full py-4 rounded-xl gradient-cta text-white text-base font-bold transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 border-0 shadow-lg"
              >
                {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                ) : (
                    <>
                      <span>Start Free Trial</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
              </Button>

              <p className="text-center text-sm text-warm-gray">
                Already have an account?{" "}
                <a href="/login" className="text-wine-500 hover:text-wine-700 font-semibold transition-colors">
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden w-full max-w-sm relative z-10">
          <div className="glass-card rounded-3xl p-5 shadow-xl animate-fade-in-up">
            <div className="space-y-5">
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-2">
                    <div className="p-2.5 rounded-full gradient-wine shadow-lg">
                        <Wine className="w-5 h-5 text-white" />
                    </div>
                </div>
                <h1 className="text-xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-playfair)' }}>Start Free Trial</h1>
                <p className="text-xs text-warm-gray">Sign up in seconds</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-mobile" className="text-xs font-medium text-charcoal">Full Name</Label>
                  <Input
                      id="name-mobile"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/80 border-warm-border text-charcoal placeholder:text-warm-gray/60 text-sm focus:border-wine-500 focus:ring-wine-500/20 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-mobile" className="text-xs font-medium text-charcoal">Email</Label>
                  <Input
                      id="email-mobile"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/80 border-warm-border text-charcoal placeholder:text-warm-gray/60 text-sm focus:border-wine-500 focus:ring-wine-500/20 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-mobile" className="text-xs font-medium text-charcoal">Password</Label>
                  <Input
                      id="password-mobile"
                      type="password"
                      placeholder="Secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/80 border-warm-border text-charcoal placeholder:text-warm-gray/60 text-sm focus:border-wine-500 focus:ring-wine-500/20 rounded-xl"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-medium text-charcoal">I am a:</Label>
                  <RadioGroup
                      defaultValue="wineLover"
                      onValueChange={(val) => setUserType(val)}
                      className="grid grid-cols-2 gap-2"
                  >
                    <div className="relative">
                      <RadioGroupItem value="wineLover" id="wineLover-mobile" className="sr-only peer" />
                      <Label
                          htmlFor="wineLover-mobile"
                          className="flex flex-col items-center justify-center p-3 rounded-lg border border-warm-border bg-white/60 peer-data-[state=checked]:border-wine-500 peer-data-[state=checked]:bg-wine-50 cursor-pointer transition-all"
                      >
                        <Wine className="w-4 h-4 mb-1 text-wine-500" />
                        <span className="text-xs font-medium text-charcoal">Wine Lover</span>
                      </Label>
                    </div>
                    <div className="relative">
                      <RadioGroupItem value="travelPro" id="travelPro-mobile" className="sr-only peer" />
                      <Label
                          htmlFor="travelPro-mobile"
                          className="flex flex-col items-center justify-center p-3 rounded-lg border border-warm-border bg-white/60 peer-data-[state=checked]:border-wine-500 peer-data-[state=checked]:bg-wine-50 cursor-pointer transition-all"
                      >
                        <MapPin className="w-4 h-4 mb-1 text-wine-500" />
                        <span className="text-xs font-medium text-charcoal">Travel Pro</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {error && (
                  <div className="p-2 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-xs text-red-700 text-center">{error}</p>
                  </div>
              )}

              <Button
                  onClick={handleSignup}
                  disabled={loading}
                  className="group w-full py-3 rounded-xl gradient-cta text-white text-sm font-bold transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 border-0 shadow-lg"
              >
                {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                ) : (
                    <>
                      <span>Start Free Trial</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
              </Button>

              <p className="text-center text-xs text-warm-gray">
                Already have an account?{" "}
                <a href="/login" className="text-wine-500 hover:text-wine-700 font-semibold transition-colors">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}