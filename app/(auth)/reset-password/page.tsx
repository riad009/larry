"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => router.push("/login"), 3000);
            } else {
                const data = await res.json();
                setError(data.error || "This link may be invalid or expired.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg text-center animate-in fade-in zoom-in duration-300">
                <div className="flex justify-center">
                    <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">Password Updated!</h2>
                    <p className="text-gray-500">Your password has been changed successfully. Redirecting you to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight">Set New Password</h1>
                <p className="text-sm text-gray-500">Please enter your new password below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="pl-10"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="confirmPassword"
                            type="password"
                            className="pl-10"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-100">
                        {error}
                    </div>
                )}

                {!token && (
                    <div className="p-3 text-sm text-amber-600 bg-amber-50 rounded-md border border-amber-100">
                        No reset token found. Please check your email link.
                    </div>
                )}

                <Button type="submit" className="w-full" disabled={loading || !token}>
                    {loading ? "Updating..." : "Reset Password"}
                </Button>
            </form>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        // Removed bg-gray-50 so your Layout's background image shows through
        <div className="flex items-center justify-center min-h-screen p-4 bg-transparent">
            <Suspense fallback={<div className="text-white">Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
}