"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit3, Trash2, Plus, Utensils, MapPin, Star, Euro, Tag, Clock, Building, Percent, TrendingUp, ChefHat, Coffee, Users } from "lucide-react";

export default function LunchAdmin() {
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [current, setCurrent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchLunch = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/lunch");
            const data = await res.json();
            setRestaurants(data);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchLunch(); }, []);

    const handleOpen = (r: any = null) => {
        if (r) {
            setCurrent({ ...r });
        } else {
            setCurrent({
                id: "", name: "", country: "France", region: "", subRegion: "",
                commune: "", type: "", description: "", gkp: "", open: "",
                rating: 0, latitude: 0, longitude: 0, lunchCost: 0, bracket: ""
            });
        }
        setIsOpen(true);
    };

    const handleSave = async () => {
        try {
            const isUpdate = !!current.mongoId;
            const method = isUpdate ? "PUT" : "POST";

            const res = await fetch("/api/lunch", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(current),
            });

            if (res.ok) {
                setIsOpen(false);
                fetchLunch();
            } else {
                const err = await res.json();
                alert("Error: " + err.error);
            }
        } catch (error) {
            alert("Error saving restaurant");
        }
    };

    const handleDelete = async (r: any) => {
        if (!confirm(`Are you sure you want to delete "${r.name}"? This action cannot be undone.`)) {
            return;
        }

        try {
            const targetId = r.mongoId || r._id;
            const res = await fetch(`/api/lunch?id=${targetId}`, { method: "DELETE" });
            if (res.ok) {
                fetchLunch();
            } else {
                alert("Error deleting restaurant");
            }
        } catch (error) {
            alert("Error deleting restaurant");
        }
    };

    // Calculate restaurant statistics
    const totalRestaurants = restaurants.length;
    const totalRegions = Array.from(new Set(restaurants.map(r => r.region).filter(Boolean))).length;
    const avgLunchCost = restaurants.length > 0
        ? (restaurants.reduce((sum, r) => sum + (r.lunchCost || 0), 0) / restaurants.length).toFixed(2)
        : "0.00";

    // Calculate restaurants by cuisine type
    const restaurantsByType = restaurants.filter(r => r.type && r.type.trim() !== "").length;
    const typePercentage = totalRestaurants > 0 ? Math.round((restaurantsByType / totalRestaurants) * 100) : 0;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                                <Utensils className="h-6 w-6 text-blue-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white">Restaurant Management</h1>
                                <p className="text-gray-400 text-sm">Manage all lunch spots in the system</p>
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={() => handleOpen()}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-xl px-6 py-6 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 flex items-center gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Add Restaurant</span>
                    </Button>
                </div>

                {/* Stats Cards - Restaurant-specific metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-white">{totalRestaurants}</p>
                                <p className="text-sm text-gray-400">Total Restaurants</p>
                            </div>
                            <Building className="h-8 w-8 text-blue-500 opacity-70" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-white">{totalRegions}</p>
                                <p className="text-sm text-gray-400">Unique Regions</p>
                            </div>
                            <MapPin className="h-8 w-8 text-green-500 opacity-70" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-white">€{avgLunchCost}</p>
                                <p className="text-sm text-gray-400">Avg. Lunch Cost</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-amber-500 opacity-70" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-white">{typePercentage}%</p>
                                <p className="text-sm text-gray-400">With Cuisine Type</p>
                            </div>
                            <Percent className="h-8 w-8 text-purple-500 opacity-70" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black overflow-hidden shadow-xl">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-800 border-t-blue-500"></div>
                        <p className="mt-4 text-gray-400">Loading restaurants...</p>
                    </div>
                ) : restaurants.length === 0 ? (
                    <div className="p-12 text-center">
                        <Utensils className="h-12 w-12 text-gray-700 mx-auto mb-4" />
                        <p className="text-gray-400">No restaurants found in the database</p>
                        <Button
                            onClick={() => handleOpen()}
                            className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add First Restaurant
                        </Button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-900/50 border-b border-gray-800">
                            <tr>
                                <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Restaurant</th>
                                <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Location</th>
                                <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Cost & Rating</th>
                                <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/50">
                            {restaurants.map((r) => (
                                <tr key={r.mongoId || r.id} className="hover:bg-white/5 transition-colors duration-150">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                                                <Utensils className="h-5 w-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{r.name}</p>
                                                <p className="text-xs text-gray-500 font-mono">{r.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div>
                                            <p className="text-gray-300">{r.region}</p>
                                            <p className="text-xs text-gray-500">{r.commune}</p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <Euro className="h-4 w-4 text-gray-500" />
                                                <span className="font-medium text-gray-300">
                                                        €{r.lunchCost || "0"}
                                                    </span>
                                                {r.bracket && (
                                                    <span className="text-xs text-gray-500">({r.bracket})</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Star className="h-4 w-4 text-amber-500 fill-current" />
                                                <span className="text-sm text-gray-300">{r.rating?.toFixed(1) || "0.0"}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleOpen(r)}
                                                className="text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                                                title="Edit restaurant"
                                            >
                                                <Edit3 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(r)}
                                                className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                                                title="Delete restaurant"
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
                            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                                <Utensils className="h-5 w-5 text-blue-400" />
                            </div>
                            <span className="text-xl font-bold">
                                {current?.mongoId ? "Edit Restaurant" : "Add New Restaurant"}
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
                                        Restaurant ID
                                    </Label>
                                    <Input
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="e.g., RS-001"
                                        value={current?.id || ""}
                                        onChange={(e) => setCurrent({...current, id: e.target.value})}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Unique identifier for database</p>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium text-gray-300 mb-2">Restaurant Name</Label>
                                    <Input
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                                        value={current?.name || ""}
                                        onChange={(e) => setCurrent({...current, name: e.target.value})}
                                        placeholder="Enter restaurant name"
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
                                    <Label className="text-sm font-medium text-gray-300 mb-2">Cuisine Type</Label>
                                    <Input
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                        value={current?.type || ""}
                                        onChange={(e) => setCurrent({...current, type: e.target.value})}
                                        placeholder="e.g., French, Italian, Bistro"
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                            <Euro className="h-4 w-4 text-gray-500" />
                                            Lunch Cost (€)
                                        </Label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                            value={current?.lunchCost || 0}
                                            onChange={(e) => setCurrent({...current, lunchCost: Number(e.target.value)})}
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-300 mb-2">Price Bracket</Label>
                                        <Input
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                            value={current?.bracket || ""}
                                            onChange={(e) => setCurrent({...current, bracket: e.target.value})}
                                            placeholder="€€ - €€€"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                            <Star className="h-4 w-4 text-gray-500" />
                                            Rating (0-5)
                                        </Label>
                                        <Input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                            value={current?.rating || 0}
                                            onChange={(e) => setCurrent({...current, rating: Number(e.target.value)})}
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-300 mb-2">GKP Code</Label>
                                        <Input
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                            value={current?.gkp || ""}
                                            onChange={(e) => setCurrent({...current, gkp: e.target.value})}
                                            placeholder="GKP identifier"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        Opening Hours
                                    </Label>
                                    <Input
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                        value={current?.open || ""}
                                        onChange={(e) => setCurrent({...current, open: e.target.value})}
                                        placeholder="e.g., 11:00 AM - 3:00 PM"
                                    />
                                </div>
                            </div>

                            {/* Coordinates Section */}
                            <div className="grid grid-cols-2 gap-4 md:col-span-2 pt-4 border-t border-gray-800">
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

                            {/* Description Section - Full Width */}
                            <div className="md:col-span-2 space-y-4 pt-6 border-t border-gray-800">
                                <div className="flex items-center gap-2">
                                    <Coffee className="h-5 w-5 text-amber-500" />
                                    <h3 className="text-lg font-bold text-gray-300">Description & Details</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-300 mb-2">Short Description</Label>
                                        <textarea
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-white placeholder:text-gray-500 min-h-[100px] resize-y"
                                            value={current?.description || ""}
                                            onChange={(e) => setCurrent({...current, description: e.target.value})}
                                            placeholder="Brief description of the restaurant, ambiance, specialties..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-sm font-medium text-gray-300 mb-2">Country</Label>
                                            <Input
                                                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                                value={current?.country || ""}
                                                onChange={(e) => setCurrent({...current, country: e.target.value})}
                                                placeholder="e.g., France"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-gray-300 mb-2">Sub-Region</Label>
                                            <Input
                                                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                                value={current?.subRegion || ""}
                                                onChange={(e) => setCurrent({...current, subRegion: e.target.value})}
                                                placeholder="Specific sub-region"
                                            />
                                        </div>
                                    </div>
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
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold px-8 py-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                        >
                            {current?.mongoId ? "Update Restaurant" : "Create Restaurant"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}