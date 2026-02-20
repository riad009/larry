"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("If an account exists, a reset link has been sent to your email.");
            } else {
                setError(data.error || "Something went wrong.");
            }
        } catch (err) {
            setError("Failed to send request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold">Forgot Password?</h1>
                    <p className="text-sm text-gray-500">Enter your email to receive a reset link.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                className="pl-10"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}
                    {message && <p className="text-sm text-green-600 font-medium">{message}</p>}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </Button>
                </form>

                <div className="text-center">
                    <Link href="/login" className="inline-flex items-center text-sm text-gray-500 hover:text-black">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}