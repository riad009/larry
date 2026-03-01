"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ChevronRight, Wine, Eye, EyeOff } from "lucide-react";
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
                redirect: false, // We handle the redirect manually below
            });

            if (result?.error) {
                setError("Invalid email or password");
                setLoading(false);
                return;
            }

            // 1. Fetch the session we just created to get the role
            const sessionRes = await fetch('/api/auth/session');
            const session = await sessionRes.json();

            // 2. Logic to redirect based on Role and trial
            const userRole = session?.user?.role;
            const trialEndDate = session?.user?.trialEndDate;

            if (trialEndDate && new Date() > new Date(trialEndDate)) {
                // Expired user: redirect to Plan / Pricing
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
        <div className="app-background flex flex-col items-center justify-center min-h-screen p-4 bg-white">
            <div className="hidden md:block w-full max-w-md">
                <div className="p-8 rounded-2xl bg-white border border-[#E0E0E0] shadow-sm">
                    <div className="space-y-8">
                        <div className="text-center space-y-3">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-full bg-black border border-[#E0E0E0]">
                                    <Wine className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-black">Welcome Back</h1>
                            <p className="text-base text-[#424242]">Sign in to continue your vineyard journey</p>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-black" />
                                    <Label htmlFor="email" className="text-sm font-medium text-black">Email Address</Label>
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242] focus:border-black focus:ring-2 focus:ring-black/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-black" />
                                        <Label htmlFor="password" className="text-sm font-medium text-black">Password</Label>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-xs text-black hover:underline transition-colors"
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
                                        className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242] focus:border-black focus:ring-2 focus:ring-black/20 pr-10"
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
                                        className="w-4 h-4 rounded border-[#E0E0E0] bg-white focus:ring-black focus:ring-offset-0"
                                    />
                                    <label htmlFor="remember" className="text-base text-[#424242] cursor-pointer select-none">
                                        Remember me
                                    </label>
                                </div>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-black hover:underline transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-[#F5F5F5] border border-[#E0E0E0]">
                                <p className="text-sm text-black text-center">{error}</p>
                            </div>
                        )}

                        <Button
                            onClick={handleLogin}
                            disabled={loading}
                            className="group w-full py-4 rounded-xl bg-black text-white hover:bg-[#424242] text-base font-bold transition-all border border-black shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-[#E0E0E0] border-t-black rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>

                        {/* Signup Link */}
                        <div className="text-center">
                            <p className="text-base text-[#424242]">
                                Don't have an account?{" "}
                                <Link
                                    href="/signup"
                                    className="text-black hover:underline font-medium transition-colors"
                                >
                                    Start Free Trial
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:hidden w-full max-w-sm">
                <div className="p-6 rounded-2xl bg-white border border-[#E0E0E0] shadow-sm">
                    <div className="space-y-6">
                        <div className="text-center space-y-3">
                            <div className="flex justify-center mb-3">
                                <div className="p-2.5 rounded-full bg-black border border-[#E0E0E0]">
                                    <Wine className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <h1 className="text-xl font-bold text-black">Welcome Back</h1>
                            <p className="text-sm text-[#424242]">Sign in to your account</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email-mobile" className="text-sm font-medium text-black">Email</Label>
                                <Input
                                    id="email-mobile"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242] text-base"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password-mobile" className="text-sm font-medium text-black">Password</Label>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-sm text-black hover:underline transition-colors"
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
                                    className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242] text-base"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="remember-mobile"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-[#E0E0E0] bg-white focus:ring-black focus:ring-offset-0"
                                />
                                <label htmlFor="remember-mobile" className="text-sm text-[#424242] cursor-pointer select-none">
                                    Remember me
                                </label>
                            </div>
                        </div>

                        {error && (
                            <div className="p-2 rounded-lg bg-[#F5F5F5] border border-[#E0E0E0]">
                                <p className="text-sm text-black text-center">{error}</p>
                            </div>
                        )}

                        <Button
                            onClick={handleLogin}
                            disabled={loading}
                            className="group w-full py-3 rounded-xl bg-black text-white hover:bg-[#424242] text-base font-bold transition-all border border-black shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-[#E0E0E0] border-t-black rounded-full animate-spin"></div>
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
                                className="block text-sm text-black hover:underline transition-colors"
                            >
                                Forgot your password?
                            </Link>
                            <p className="text-sm text-[#424242]">
                                Don't have an account?{" "}
                                <Link
                                    href="/signup"
                                    className="text-black hover:underline font-medium transition-colors"
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