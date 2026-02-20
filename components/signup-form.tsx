"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Wine, MapPin, ChevronRight } from "lucide-react";
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

      // Step 1: Create the user account via your manual API
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

      // --- STEP 2: MANUAL AUTO-LOGIN (REPLACES NextAuth signIn) ---
      const userObj = {
        id: data.userId,
        name: normalizedName,
        email: normalizedEmail,
        role: "user", // Default for new signups
        userType: userType,
        isActive: true
      };

      // Save to localStorage so RootLayout and AdminLayout can see it
      localStorage.setItem("user", JSON.stringify(userObj));
      // -----------------------------------------------------------

      // Step 3: Redirect
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFFFF] p-4">
        {/* Desktop Layout */}
        <div className="hidden md:block w-full max-w-md">
          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E0E0E0] shadow-sm">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-black">Start Your Free Trial</h1>
                <p className="text-sm text-[#424242]">Join thousands discovering premium vineyards</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-black">Full Name</Label>
                  <Input
                      id="name"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-[#FFFFFF] border border-[#E0E0E0] text-black placeholder:text-[#737373] focus:border-[#424242] focus:ring-[#424242]"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-black">Email Address</Label>
                  <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#FFFFFF] border border-[#E0E0E0] text-black placeholder:text-[#737373] focus:border-[#424242] focus:ring-[#424242]"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-black">Password</Label>
                  <Input
                      id="password"
                      type="password"
                      placeholder="Choose a secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-[#FFFFFF] border border-[#E0E0E0] text-black placeholder:text-[#737373] focus:border-[#424242] focus:ring-[#424242]"
                  />
                </div>

                {/* User Type Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-black">I am a:</Label>
                  <RadioGroup
                      defaultValue="wineLover"
                      onValueChange={(val) => setUserType(val)}
                      className="grid grid-cols-2 gap-3"
                  >
                    <div className="relative">
                      <RadioGroupItem value="wineLover" id="wineLover" className="sr-only peer" />
                      <Label
                          htmlFor="wineLover"
                          className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#E0E0E0] bg-[#FFFFFF] peer-data-[state=checked]:border-black peer-data-[state=checked]:bg-[#F5F5F5] cursor-pointer transition-all"
                      >
                        <Wine className="w-5 h-5 mb-2 text-[#424242] peer-data-[state=checked]:text-black" />
                        <span className="text-sm font-medium text-black peer-data-[state=checked]:text-black">Wine Lover</span>
                      </Label>
                    </div>
                    <div className="relative">
                      <RadioGroupItem value="travelPro" id="travelPro" className="sr-only peer" />
                      <Label
                          htmlFor="travelPro"
                          className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#E0E0E0] bg-[#FFFFFF] peer-data-[state=checked]:border-black peer-data-[state=checked]:bg-[#F5F5F5] cursor-pointer transition-all"
                      >
                        <MapPin className="w-5 h-5 mb-2 text-[#424242] peer-data-[state=checked]:text-black" />
                        <span className="text-sm font-medium text-black peer-data-[state=checked]:text-black">Travel Pro</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm text-red-700 text-center">{error}</p>
                  </div>
              )}

              <Button
                  onClick={handleSignup}
                  disabled={loading}
                  className="group w-full py-4 rounded-xl bg-black hover:bg-[#424242] text-white text-base font-bold transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 border border-black"
              >
                {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#E0E0E0] border-t-white rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                ) : (
                    <>
                      <span>Start Free Trial</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
              </Button>

              <p className="text-center text-sm text-[#424242]">
                Already have an account?{" "}
                <a href="/login" className="text-black hover:underline font-medium">
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden w-full max-w-sm">
          <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E0E0E0] shadow-sm">
            <div className="space-y-5">
              <div className="text-center space-y-2">
                <h1 className="text-xl font-bold text-black">Start Free Trial</h1>
                <p className="text-xs text-[#424242]">Sign up in seconds</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name-mobile" className="text-xs font-medium text-black">Full Name</Label>
                  <Input
                      id="name-mobile"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-[#FFFFFF] border border-[#E0E0E0] text-black placeholder:text-[#737373] text-sm"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email-mobile" className="text-xs font-medium text-black">Email</Label>
                  <Input
                      id="email-mobile"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#FFFFFF] border border-[#E0E0E0] text-black placeholder:text-[#737373] text-sm"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password-mobile" className="text-xs font-medium text-black">Password</Label>
                  <Input
                      id="password-mobile"
                      type="password"
                      placeholder="Secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-[#FFFFFF] border border-[#E0E0E0] text-black placeholder:text-[#737373] text-sm"
                  />
                </div>

                {/* User Type Selection */}
                <div className="space-y-3">
                  <Label className="text-xs font-medium text-black">I am a:</Label>
                  <RadioGroup
                      defaultValue="wineLover"
                      onValueChange={(val) => setUserType(val)}
                      className="grid grid-cols-2 gap-2"
                  >
                    <div className="relative">
                      <RadioGroupItem value="wineLover" id="wineLover-mobile" className="sr-only peer" />
                      <Label
                          htmlFor="wineLover-mobile"
                          className="flex flex-col items-center justify-center p-3 rounded-lg border border-[#E0E0E0] bg-[#FFFFFF] peer-data-[state=checked]:border-black peer-data-[state=checked]:bg-[#F5F5F5] cursor-pointer transition-all"
                      >
                        <Wine className="w-4 h-4 mb-1 text-[#424242] peer-data-[state=checked]:text-black" />
                        <span className="text-xs font-medium text-black peer-data-[state=checked]:text-black">Wine Lover</span>
                      </Label>
                    </div>
                    <div className="relative">
                      <RadioGroupItem value="travelPro" id="travelPro-mobile" className="sr-only peer" />
                      <Label
                          htmlFor="travelPro-mobile"
                          className="flex flex-col items-center justify-center p-3 rounded-lg border border-[#E0E0E0] bg-[#FFFFFF] peer-data-[state=checked]:border-black peer-data-[state=checked]:bg-[#F5F5F5] cursor-pointer transition-all"
                      >
                        <MapPin className="w-4 h-4 mb-1 text-[#424242] peer-data-[state=checked]:text-black" />
                        <span className="text-xs font-medium text-black peer-data-[state=checked]:text-black">Travel Pro</span>
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
                  className="group w-full py-3 rounded-xl bg-black hover:bg-[#424242] text-white text-sm font-bold transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 border border-black"
              >
                {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#E0E0E0] border-t-white rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                ) : (
                    <>
                      <span>Start Free Trial</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
              </Button>

              <p className="text-center text-xs text-[#424242]">
                Already have an account?{" "}
                <a href="/login" className="text-black hover:underline font-medium">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}