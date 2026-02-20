"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit3, Trash2, Plus, Wine, Instagram, Clock, Euro, Tag, MapPin, Building, Grape, TrendingUp, Percent, DollarSign } from "lucide-react";

export default function VineyardAdmin() {
    const [vineyards, setVineyards] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [current, setCurrent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchVineyards = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/vineyards");
            const data = await res.json();
            setVineyards(data);
        } catch (error) {
            console.error("Error fetching vineyards:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVineyards();
    }, []);

    const handleOpen = (v: any = null) => {
        if (v) {
            setCurrent({
                ...v,
                reason1: v.highlights?.[0] || "",
                reason2: v.highlights?.[1] || "",
                reason3: v.highlights?.[2] || "",
                reason4: v.highlights?.[3] || "",
                reason5: v.highlights?.[4] || "",
            });
        } else {
            setCurrent({
                id: "",
                name: "",
                country: "France",
                region: "",
                subRegion: "",
                commune: "",
                latitude: 0,
                longitude: 0,
                instagram: "",
                saturday: "",
                sunday: "",
                dominantGrape: "",
                lowestCost: 0,
                highestCost: 0,
                reason1: "", reason2: "", reason3: "", reason4: "", reason5: ""
            });
        }
        setIsOpen(true);
    };

    const handleSave = async () => {
        try {
            const isUpdate = !!current.mongoId;
            const method = isUpdate ? "PUT" : "POST";

            const res = await fetch("/api/vineyards", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(current),
            });

            if (res.ok) {
                setIsOpen(false);
                fetchVineyards();
            } else {
                const err = await res.json();
                alert("Error: " + err.error);
            }
        } catch (error) {
            alert("Error saving vineyard");
        }
    };

    const handleDelete = async (v: any) => {
        if (!confirm(`Are you sure you want to delete "${v.name}"? This action cannot be undone.`)) {
            return;
        }

        try {
            const targetId = v.mongoId || v._id;
            const res = await fetch(`/api/vineyards?id=${targetId}`, { method: "DELETE" });
            if (res.ok) {
                fetchVineyards();
            } else {
                alert("Error deleting vineyard");
            }
        } catch (error) {
            alert("Error deleting vineyard");
        }
    };

    // Calculate vineyard statistics
    const totalVineyards = vineyards.length;
    const totalRegions = Array.from(new Set(vineyards.map(v => v.region).filter(Boolean))).length;
    const avgCostRange = vineyards.length > 0
        ? (vineyards.reduce((sum, v) => sum + ((v.lowestCost + v.highestCost) / 2), 0) / vineyards.length).toFixed(2)
        : "0.00";

    // Find vineyards with Instagram
    const vineyardsWithSocial = vineyards.filter(v => v.instagram && v.instagram.trim() !== "").length;
    const socialPercentage = totalVineyards > 0 ? Math.round((vineyardsWithSocial / totalVineyards) * 100) : 0;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                                <Wine className="h-6 w-6 text-green-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white">Vineyard Management</h1>
                                <p className="text-gray-400 text-sm">Manage all vineyard estates in the system</p>
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={() => handleOpen()}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-xl px-6 py-6 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 flex items-center gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Add New Vineyard</span>
                    </Button>
                </div>

                {/* Stats Cards - Improved with vineyard-specific metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-white">{totalVineyards}</p>
                                <p className="text-sm text-gray-400">Total Vineyards</p>
                            </div>
                            <Building className="h-8 w-8 text-green-500 opacity-70" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-white">{totalRegions}</p>
                                <p className="text-sm text-gray-400">Unique Regions</p>
                            </div>
                            <MapPin className="h-8 w-8 text-blue-500 opacity-70" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-white">€{avgCostRange}</p>
                                <p className="text-sm text-gray-400">Avg. Cost Per Person</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-amber-500 opacity-70" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-white">{socialPercentage}%</p>
                                <p className="text-sm text-gray-400">With Social Media</p>
                            </div>
                            <Percent className="h-8 w-8 text-purple-500 opacity-70" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section - Cleaned up */}
            <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black overflow-hidden shadow-xl">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-800 border-t-green-500"></div>
                        <p className="mt-4 text-gray-400">Loading vineyards...</p>
                    </div>
                ) : vineyards.length === 0 ? (
                    <div className="p-12 text-center">
                        <Wine className="h-12 w-12 text-gray-700 mx-auto mb-4" />
                        <p className="text-gray-400">No vineyards found in the database</p>
                        <Button
                            onClick={() => handleOpen()}
                            className="mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add First Vineyard
                        </Button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-900/50 border-b border-gray-800">
                            <tr>
                                <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Vineyard</th>
                                <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Location</th>
                                <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Cost Range</th>
                                <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/50">
                            {vineyards.map((v) => (
                                <tr key={v.mongoId || v.id} className="hover:bg-white/5 transition-colors duration-150">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                                                <Wine className="h-5 w-5 text-green-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{v.name}</p>
                                                <p className="text-xs text-gray-500 font-mono">{v.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div>
                                            <p className="text-gray-300">{v.region}</p>
                                            <p className="text-xs text-gray-500">{v.commune}</p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Euro className="h-4 w-4 text-gray-500" />
                                            <span className="font-medium text-gray-300">
                                                    €{v.lowestCost} - €{v.highestCost}
                                                </span>
                                            {v.dominantGrape && (
                                                <div className="ml-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                                                    <Grape className="h-3 w-3 text-purple-400" />
                                                    <span className="text-xs text-purple-300">{v.dominantGrape}</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleOpen(v)}
                                                className="text-gray-400 hover:text-green-400 hover:bg-green-500/10"
                                                title="Edit vineyard"
                                            >
                                                <Edit3 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(v)}
                                                className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                                                title="Delete vineyard"
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

            {/* Dialog/Modal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-4xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 text-white rounded-2xl p-0 overflow-hidden">
                    <DialogHeader className="p-6 border-b border-gray-800">
                        <DialogTitle className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                                <Wine className="h-5 w-5 text-green-400" />
                            </div>
                            <span className="text-xl font-bold">
                                {current?.mongoId ? "Edit Vineyard" : "Add New Vineyard"}
                            </span>
                        </DialogTitle>
                    </DialogHeader>

                    <ScrollArea className="max-h-[60vh] p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                        <Tag className="h-4 w-4 text-gray-500" />
                                        Vineyard ID
                                    </Label>
                                    <Input
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500"
                                        placeholder="e.g., RV-007"
                                        value={current?.id || ""}
                                        onChange={(e) => setCurrent({...current, id: e.target.value})}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Unique identifier for offers mapping</p>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium text-gray-300 mb-2">Vineyard Name</Label>
                                    <Input
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500"
                                        value={current?.name || ""}
                                        onChange={(e) => setCurrent({...current, name: e.target.value})}
                                        placeholder="Enter vineyard name"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-300 mb-2">Region</Label>
                                        <Input
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                            value={current?.region || ""}
                                            onChange={(e) => setCurrent({...current, region: e.target.value})}
                                            placeholder="e.g., Bordeaux"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-300 mb-2">Commune</Label>
                                        <Input
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                            value={current?.commune || ""}
                                            onChange={(e) => setCurrent({...current, commune: e.target.value})}
                                            placeholder="e.g., Pauillac"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium text-gray-300 mb-2">Dominant Grape</Label>
                                    <Input
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                        value={current?.dominantGrape || ""}
                                        onChange={(e) => setCurrent({...current, dominantGrape: e.target.value})}
                                        placeholder="e.g., Cabernet Sauvignon"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-gray-500" />
                                            Latitude
                                        </Label>
                                        <Input
                                            type="number"
                                            step="any"
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                            value={current?.latitude || ""}
                                            onChange={(e) => setCurrent({...current, latitude: parseFloat(e.target.value)})}
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-gray-500" />
                                            Longitude
                                        </Label>
                                        <Input
                                            type="number"
                                            step="any"
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                            value={current?.longitude || ""}
                                            onChange={(e) => setCurrent({...current, longitude: parseFloat(e.target.value)})}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-gray-500" />
                                            Lowest Cost
                                        </Label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                            value={current?.lowestCost || 0}
                                            onChange={(e) => setCurrent({...current, lowestCost: Number(e.target.value)})}
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-gray-500" />
                                            Highest Cost
                                        </Label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                            value={current?.highestCost || 0}
                                            onChange={(e) => setCurrent({...current, highestCost: Number(e.target.value)})}
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                        <Instagram className="h-4 w-4 text-gray-500" />
                                        Instagram URL
                                    </Label>
                                    <Input
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                        value={current?.instagram || ""}
                                        onChange={(e) => setCurrent({...current, instagram: e.target.value})}
                                        placeholder="https://instagram.com/..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-gray-500" />
                                            Saturday Hours
                                        </Label>
                                        <Input
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                            value={current?.saturday || ""}
                                            onChange={(e) => setCurrent({...current, saturday: e.target.value})}
                                            placeholder="e.g., 9:00 AM - 5:00 PM"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-gray-500" />
                                            Sunday Hours
                                        </Label>
                                        <Input
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                            value={current?.sunday || ""}
                                            onChange={(e) => setCurrent({...current, sunday: e.target.value})}
                                            placeholder="e.g., Closed"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Highlights Section - Full Width */}
                            <div className="md:col-span-2 space-y-4 pt-6 border-t border-gray-800">
                                <div className="flex items-center gap-2">
                                    <Wine className="h-5 w-5 text-amber-500" />
                                    <h3 className="text-lg font-bold text-gray-300">Experience Highlights</h3>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">Add up to 5 key highlights for this vineyard</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <div key={num} className="space-y-2">
                                            <Label className="text-sm font-medium text-gray-300">Highlight {num}</Label>
                                            <Input
                                                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                                value={current?.[`reason${num}`] || ""}
                                                onChange={(e) => setCurrent({...current, [`reason${num}`]: e.target.value})}
                                                placeholder={`Key feature ${num}...`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    <DialogFooter className="p-6 border-t border-gray-800 bg-gray-900/50">
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold px-8 py-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
                        >
                            {current?.mongoId ? "Update Vineyard" : "Create Vineyard"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}