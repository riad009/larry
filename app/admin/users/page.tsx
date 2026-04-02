"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Edit3, Trash2, Plus, Users, Shield, Lock, Mail, UserCheck, UserX, Search } from "lucide-react";

export default function UserAdmin() {
    const [users, setUsers] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [current, setCurrent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/user");
            const data = await res.json();
            setUsers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpen = (u: any = null) => {
        if (u) {
            setCurrent({ ...u, password: "" });
        } else {
            setCurrent({
                mongoId: null,
                name: "",
                email: "",
                password: "",
                role: "user",
                userType: "wineLover",
                isActive: true
            });
        }
        setIsOpen(true);
    };

    const handleSave = async () => {
        try {
            const isUpdate = !!current.mongoId;
            const method = isUpdate ? "PUT" : "POST";

            const res = await fetch("/api/user", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(current),
            });

            if (res.ok) {
                setIsOpen(false);
                fetchUsers();
            } else {
                const err = await res.json();
                alert(err.error || "Save failed");
            }
        } catch (error) {
            alert("Error saving user");
        }
    };

    const handleDelete = async (u: any) => {
        if (!confirm(`Are you sure you want to delete "${u.name}"? This action cannot be undone.`)) {
            return;
        }

        try {
            const res = await fetch(`/api/user?id=${u.mongoId}`, { method: "DELETE" });
            if (res.ok) fetchUsers();
        } catch (error) {
            alert("Error deleting user");
        }
    };

    // Calculate user statistics
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.isActive !== false).length;
    const adminUsers = users.filter(u => u.role === "admin").length;
    const wineLovers = users.filter(u => u.userType === "wineLover").length;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Header Section - Matches Vineyard page */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-white border border-black">
                                <Users className="h-6 w-6 text-black" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-black">User Management</h1>
                                <p className="text-warm-gray text-sm">Manage all user accounts in the system</p>
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={() => handleOpen()}
                        className="bg-black hover:bg-[#424242] text-white font-bold rounded-xl px-6 py-6 border border-black flex items-center gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        <span>New User</span>
                    </Button>
                </div>

                {/* Stats Cards - Same as Vineyard page */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white border border-black rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-black">{totalUsers}</p>
                                <p className="text-sm text-warm-gray">Total Users</p>
                            </div>
                            <Users className="h-8 w-8 text-black opacity-70" />
                        </div>
                    </div>
                    <div className="bg-white border border-black rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-black">{activeUsers}</p>
                                <p className="text-sm text-warm-gray">Active Users</p>
                            </div>
                            <UserCheck className="h-8 w-8 text-black opacity-70" />
                        </div>
                    </div>
                    <div className="bg-white border border-black rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-black">{wineLovers}</p>
                                <p className="text-sm text-warm-gray">Wine Lovers</p>
                            </div>
                            <UserCheck className="h-8 w-8 text-black opacity-70" />
                        </div>
                    </div>
                    <div className="bg-white border border-black rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-black">{adminUsers}</p>
                                <p className="text-sm text-warm-gray">Administrators</p>
                            </div>
                            <Shield className="h-8 w-8 text-black opacity-70" />
                        </div>
                    </div>
                </div>

                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-warm-gray" />
                    <Input
                        placeholder="Search users by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 bg-white border border-warm-border text-black placeholder:text-warm-gray focus:border-black"
                    />
                </div>
            </div>

            <div className="rounded-xl border border-black bg-white overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-warm-border border-t-black"></div>
                        <p className="mt-4 text-warm-gray">Loading users...</p>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="p-12 text-center">
                        <Users className="h-12 w-12 text-warm-gray mx-auto mb-4" />
                        <p className="text-warm-gray">No users found</p>
                        {search && (
                            <Button
                                variant="ghost"
                                onClick={() => setSearch("")}
                                className="mt-2 text-black hover:bg-cream"
                            >
                                Clear search
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-cream border-b border-black">
                            <tr>
                                <th className="text-left p-4 text-xs font-bold text-black uppercase tracking-wider">User</th>
                                <th className="text-left p-4 text-xs font-bold text-black uppercase tracking-wider">Type</th>
                                <th className="text-left p-4 text-xs font-bold text-black uppercase tracking-wider">Role</th>
                                <th className="text-left p-4 text-xs font-bold text-black uppercase tracking-wider">Status</th>
                                <th className="text-left p-4 text-xs font-bold text-black uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E0E0E0]">
                            {filteredUsers.map((u) => (
                                <tr key={u.mongoId} className="hover:bg-cream transition-colors duration-150">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${
                                                u.role === "admin"
                                                    ? "bg-cream border border-warm-border"
                                                    : "bg-white border border-warm-border"
                                            }`}>
                                                {u.role === "admin" ? (
                                                    <Shield className="h-5 w-5 text-black" />
                                                ) : (
                                                    <Users className="h-5 w-5 text-black" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-black">{u.name}</p>
                                                <p className="text-xs text-warm-gray">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                            <span className="text-sm text-black">
                                                {u.displayName || u.userType}
                                            </span>
                                    </td>
                                    <td className="p-4">
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                                u.role === "admin"
                                                    ? "bg-cream text-black border border-warm-border"
                                                    : "bg-white text-warm-gray border border-warm-border"
                                            }`}>
                                                {u.role}
                                            </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-2 w-2 rounded-full ${
                                                u.isActive ? "bg-black" : "bg-[#424242]"
                                            }`}></div>
                                            <span className="text-sm text-black">
                                                {u.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleOpen(u)}
                                                className="text-warm-gray hover:text-black hover:bg-cream"
                                                title="Edit user"
                                            >
                                                <Edit3 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(u)}
                                                className="text-warm-gray hover:text-black hover:bg-cream"
                                                title="Delete user"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-2xl bg-white border border-black text-black rounded-xl p-0 overflow-hidden">
                    <DialogHeader className="p-6 border-b border-warm-border">
                        <DialogTitle className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white border border-black">
                                <Shield className="h-5 w-5 text-black" />
                            </div>
                            <span className="text-xl font-bold">
                                {current?.mongoId ? "Edit User" : "Create New User"}
                            </span>
                        </DialogTitle>
                    </DialogHeader>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                                        <Users className="h-4 w-4 text-warm-gray" />
                                        Full Name
                                    </Label>
                                    <Input
                                        className="bg-white border-warm-border text-black placeholder:text-warm-gray focus:border-black"
                                        value={current?.name || ""}
                                        onChange={(e) => setCurrent({...current, name: e.target.value})}
                                        placeholder="Enter full name"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-warm-gray" />
                                        Email Address
                                    </Label>
                                    <Input
                                        type="email"
                                        className="bg-white border-warm-border text-black placeholder:text-warm-gray"
                                        value={current?.email || ""}
                                        onChange={(e) => setCurrent({...current, email: e.target.value})}
                                        placeholder="user@example.com"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                                        <Lock className="h-4 w-4 text-warm-gray" />
                                        Password
                                    </Label>
                                    <Input
                                        type="password"
                                        className="bg-white border-warm-border text-black placeholder:text-warm-gray"
                                        value={current?.password || ""}
                                        onChange={(e) => setCurrent({...current, password: e.target.value})}
                                        placeholder={current?.mongoId ? "Leave blank to keep current" : "Enter password"}
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium text-black mb-2">User Type</Label>
                                    <select
                                        className="w-full bg-white border-warm-border text-black rounded-lg p-3 focus:border-black"
                                        value={current?.userType || "wineLover"}
                                        onChange={(e) => setCurrent({...current, userType: e.target.value})}
                                    >
                                        <option value="wineLover">Wine Lover</option>
                                        <option value="travelPro">Travel Pro</option>
                                    </select>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium text-black mb-2">Role</Label>
                                    <select
                                        className="w-full bg-white border-warm-border text-black rounded-lg p-3 focus:border-black"
                                        value={current?.role || "user"}
                                        onChange={(e) => setCurrent({...current, role: e.target.value})}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-lg bg-cream border border-warm-border">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-3 w-3 rounded-full ${current?.isActive ? "bg-black" : "bg-[#424242]"}`}></div>
                                        <span className="text-sm font-medium text-black">
                                            Account Status
                                        </span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={current?.isActive}
                                            onChange={(e) => setCurrent({...current, isActive: e.target.checked})}
                                        />
                                        <div className="w-11 h-6 bg-[#E0E0E0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="p-6 border-t border-warm-border bg-cream">
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(false)}
                            className="text-warm-gray hover:text-black hover:bg-[#E0E0E0]"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="bg-black hover:bg-[#424242] text-white font-bold px-8 py-6 rounded-xl border border-black"
                        >
                            {current?.mongoId ? "Update User" : "Create User"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}