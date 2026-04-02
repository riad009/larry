"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Import session
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Lock, User, Save, Key, Shield } from "lucide-react";

export default function AdminSettings() {
    const { data: session, update } = useSession(); // Use update to refresh session name/email
    const [adminData, setAdminData] = useState({
        adminId: "",
        name: "",
        email: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [message, setMessage] = useState("");

    // Load real data from the session
    useEffect(() => {
        if (session?.user) {
            setAdminData(prev => ({
                ...prev,
                adminId: (session.user as any).id || "",
                name: session.user.name || "",
                email: session.user.email || ""
            }));
            setFetching(false);
        }
    }, [session]);

    const handleUpdate = async () => {
        setMessage("");
        if (adminData.newPassword && adminData.newPassword !== adminData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: adminData.adminId,
                    name: adminData.name,
                    email: adminData.email,
                    password: adminData.newPassword || undefined // Only send if changed
                }),
            });

            if (res.ok) {
                setMessage("Settings updated successfully!");
                // Update the NextAuth session so the Header shows the new name
                await update({
                    ...session,
                    user: { ...session?.user, name: adminData.name, email: adminData.email }
                });
                setAdminData(prev => ({ ...prev, newPassword: "", confirmPassword: "" }));
            } else {
                const error = await res.json();
                alert(error.error || "Failed to update settings.");
            }
        } catch (error) {
            alert("Error updating settings.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="p-8 text-black">Loading Admin Data...</div>;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-white border border-black">
                                <ShieldCheck className="h-6 w-6 text-black" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-black">Admin Settings</h1>
                                <p className="text-warm-gray text-sm">Manage your account and security settings</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white border border-black rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white border border-black">
                                <Shield className="h-5 w-5 text-black" />
                            </div>
                            <div>
                                <p className="text-sm text-warm-gray">Account Type</p>
                                <p className="text-lg font-bold text-black">Super Admin</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border border-black rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white border border-black">
                                <Key className="h-5 w-5 text-black" />
                            </div>
                            <div>
                                <p className="text-sm text-warm-gray">Status</p>
                                <p className="text-lg font-bold text-black">Verified</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border border-black rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white border border-black">
                                <Lock className="h-5 w-5 text-black" />
                            </div>
                            <div>
                                <p className="text-sm text-warm-gray">Security</p>
                                <p className="text-lg font-bold text-black">Active</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-6">
                    <div className="bg-white border border-black rounded-xl p-6">
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="h-20 w-20 rounded-full bg-black flex items-center justify-center text-2xl font-bold text-white mb-4 uppercase">
                                {adminData.name.charAt(0)}
                            </div>
                            <h2 className="text-xl font-bold text-black">{adminData.name}</h2>
                            <p className="text-warm-gray text-sm mt-1">{adminData.email}</p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white border border-black rounded-xl p-6 text-black">
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-black">Display Name</Label>
                                    <Input
                                        className="bg-white border-warm-border text-black"
                                        value={adminData.name}
                                        onChange={(e) => setAdminData({...adminData, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-black">Email</Label>
                                    <Input
                                        className="bg-white border-warm-border text-black"
                                        value={adminData.email}
                                        onChange={(e) => setAdminData({...adminData, email: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-black">New Password</Label>
                                    <Input
                                        type="password"
                                        className="bg-white border-warm-border text-black"
                                        value={adminData.newPassword}
                                        onChange={(e) => setAdminData({...adminData, newPassword: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-black">Confirm Password</Label>
                                    <Input
                                        type="password"
                                        className="bg-white border-warm-border text-black"
                                        value={adminData.confirmPassword}
                                        onChange={(e) => setAdminData({...adminData, confirmPassword: e.target.value})}
                                    />
                                </div>
                            </div>
                            {message && <p className="text-black text-sm">{message}</p>}
                            <Button onClick={handleUpdate} disabled={loading} className="w-full bg-black hover:bg-[#424242] text-white border border-black">
                                {loading ? "Saving..." : "Save Settings"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}