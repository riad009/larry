"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ChevronRight, Wine, Eye, EyeOff, Sparkles } from "lucide-react";
import Link from "next/link";
import {signIn} from "next-auth/react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
                setLoading(false);
                return;
            }

            const sessionRes = await fetch('/api/auth/session');
            const session = await sessionRes.json();

            const trialEndDate = session?.user?.trialEndDate;

            if (trialEndDate && new Date() > new Date(trialEndDate)) {
                router.push("/plan");
            } else {
                router.push("/plan-like-an-expert");
            }

        } catch (err) {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="app-background flex flex-col items-center justify-center min-h-screen p-4">
            {/* Decorative background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-wine-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block w-full max-w-md relative z-10">
                <div className="glass-card rounded-3xl p-8 shadow-xl animate-fade-in-up">
                    <div className="space-y-8">
                        <div className="text-center space-y-3">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-full gradient-wine shadow-lg animate-pulse-glow">
                                    <Wine className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-playfair)' }}>Welcome Back</h1>
                            <p className="text-base text-warm-gray">Sign in to continue your vineyard journey</p>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-wine-500" />
                                    <Label htmlFor="email" className="text-sm font-medium text-charcoal">Email Address</Label>
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="bg-white/80 border-warm-border text-charcoal placeholder:text-warm-gray/60 focus:border-wine-500 focus:ring-2 focus:ring-wine-500/20 rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-wine-500" />
                                        <Label htmlFor="password" className="text-sm font-medium text-charcoal">Password</Label>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-xs text-wine-500 hover:text-wine-700 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="bg-white/80 border-warm-border text-charcoal placeholder:text-warm-gray/60 focus:border-wine-500 focus:ring-2 focus:ring-wine-500/20 pr-10 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-warm-border bg-white accent-wine-500 focus:ring-wine-500 focus:ring-offset-0"
                                    />
                                    <label htmlFor="remember" className="text-sm text-warm-gray cursor-pointer select-none">
                                        Remember me
                                    </label>
                                </div>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-wine-500 hover:text-wine-700 font-medium transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                                <p className="text-sm text-red-700 text-center">{error}</p>
                            </div>
                        )}

                        <Button
                            onClick={handleLogin}
                            disabled={loading}
                            className="group w-full py-4 rounded-xl gradient-cta text-white text-base font-bold transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 border-0"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>

                        <div className="text-center">
                            <p className="text-base text-warm-gray">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/signup"
                                    className="text-wine-500 hover:text-wine-700 font-semibold transition-colors"
                                >
                                    Start Free Trial
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden w-full max-w-sm relative z-10">
                <div className="glass-card rounded-3xl p-6 shadow-xl animate-fade-in-up">
                    <div className="space-y-6">
                        <div className="text-center space-y-3">
                            <div className="flex justify-center mb-3">
                                <div className="p-2.5 rounded-full gradient-wine shadow-lg">
                                    <Wine className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <h1 className="text-xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-playfair)' }}>Welcome Back</h1>
                            <p className="text-sm text-warm-gray">Sign in to your account</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email-mobile" className="text-sm font-medium text-charcoal">Email</Label>
                                <Input
                                    id="email-mobile"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="bg-white/80 border-warm-border text-charcoal placeholder:text-warm-gray/60 text-base focus:border-wine-500 focus:ring-wine-500/20 rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password-mobile" className="text-sm font-medium text-charcoal">Password</Label>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-sm text-wine-500 hover:text-wine-700 transition-colors"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                <Input
                                    id="password-mobile"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="bg-white/80 border-warm-border text-charcoal placeholder:text-warm-gray/60 text-base focus:border-wine-500 focus:ring-wine-500/20 rounded-xl"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="remember-mobile"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-warm-border bg-white accent-wine-500 focus:ring-wine-500 focus:ring-offset-0"
                                />
                                <label htmlFor="remember-mobile" className="text-sm text-warm-gray cursor-pointer select-none">
                                    Remember me
                                </label>
                            </div>
                        </div>

                        {error && (
                            <div className="p-2 rounded-xl bg-red-50 border border-red-200">
                                <p className="text-sm text-red-700 text-center">{error}</p>
                            </div>
                        )}

                        <Button
                            onClick={handleLogin}
                            disabled={loading}
                            className="group w-full py-3 rounded-xl gradient-cta text-white text-base font-bold transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 border-0"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>

                        <div className="space-y-3 text-center">
                            <Link
                                href="/forgot-password"
                                className="block text-sm text-wine-500 hover:text-wine-700 transition-colors"
                            >
                                Forgot your password?
                            </Link>
                            <p className="text-sm text-warm-gray">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/signup"
                                    className="text-wine-500 hover:text-wine-700 font-semibold transition-colors"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}