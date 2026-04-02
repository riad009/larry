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
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [current, setCurrent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const filteredRestaurants = restaurants.filter((r) => {
        if (!searchTerm.trim()) return true;
        const term = searchTerm.toLowerCase().trim();
        const name = (r.name ?? "").toLowerCase();
        const id = (r.id ?? "").toLowerCase();
        const region = (r.region ?? "").toLowerCase();
        const commune = (r.commune ?? "").toLowerCase();
        return name.includes(term) || id.includes(term) || region.includes(term) || commune.includes(term);
    });

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
                            <div className="p-2 rounded-lg bg-white border border-black">
                                <Utensils className="h-6 w-6 text-black" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-black">Restaurant Management</h1>
                                <p className="text-warm-gray text-sm">Manage all lunch spots in the system</p>
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={() => handleOpen()}
                        className="bg-black hover:bg-[#424242] text-white font-bold rounded-xl px-6 py-6 border border-black flex items-center gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Add Restaurant</span>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white border border-black rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-black">{totalRestaurants}</p>
                                <p className="text-sm text-warm-gray">Total Restaurants</p>
                            </div>
                            <Building className="h-8 w-8 text-black opacity-70" />
                        </div>
                    </div>
                    <div className="bg-white border border-black rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-black">{totalRegions}</p>
                                <p className="text-sm text-warm-gray">Unique Regions</p>
                            </div>
                            <MapPin className="h-8 w-8 text-black opacity-70" />
                        </div>
                    </div>
                    <div className="bg-white border border-black rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-black">€{avgLunchCost}</p>
                                <p className="text-sm text-warm-gray">Avg. Lunch Cost</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-black opacity-70" />
                        </div>
                    </div>
                    <div className="bg-white border border-black rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-black">{typePercentage}%</p>
                                <p className="text-sm text-warm-gray">With Cuisine Type</p>
                            </div>
                            <Percent className="h-8 w-8 text-black opacity-70" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="Search restaurants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md bg-white border border-warm-border rounded-xl px-4 py-2 text-black placeholder:text-warm-gray focus:border-black"
                />
            </div>

            {/* Table Section */}
            <div className="rounded-xl border border-black bg-white overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-warm-border border-t-black"></div>
                        <p className="mt-4 text-warm-gray">Loading restaurants...</p>
                    </div>
                ) : restaurants.length === 0 ? (
                    <div className="p-12 text-center">
                        <Utensils className="h-12 w-12 text-warm-gray mx-auto mb-4" />
                        <p className="text-warm-gray">No restaurants found in the database</p>
                        <Button
                            onClick={() => handleOpen()}
                            className="mt-4 bg-black hover:bg-[#424242] text-white border border-black"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add First Restaurant
                        </Button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-cream border-b border-black">
                            <tr>
                                <th className="text-left p-4 text-xs font-bold text-black uppercase tracking-wider">Restaurant</th>
                                <th className="text-left p-4 text-xs font-bold text-black uppercase tracking-wider">Location</th>
                                <th className="text-left p-4 text-xs font-bold text-black uppercase tracking-wider">Cost & Rating</th>
                                <th className="text-left p-4 text-xs font-bold text-black uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E0E0E0]">
                            {filteredRestaurants.map((r) => (
                                <tr key={r.mongoId || r.id} className="hover:bg-cream transition-colors duration-150">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-white border border-warm-border">
                                                <Utensils className="h-5 w-5 text-black" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-black">{r.name}</p>
                                                <p className="text-xs text-warm-gray font-mono">{r.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div>
                                            <p className="text-black">{r.region}</p>
                                            <p className="text-xs text-warm-gray">{r.commune}</p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <Euro className="h-4 w-4 text-warm-gray" />
                                                <span className="font-medium text-black">
                                                    €{r.lunchCost || "0"}
                                                </span>
                                                {r.bracket && (
                                                    <span className="text-xs text-warm-gray">({r.bracket})</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Star className="h-4 w-4 text-black fill-current" />
                                                <span className="text-sm text-black">{r.rating?.toFixed(1) || "0.0"}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleOpen(r)}
                                                className="text-warm-gray hover:text-black hover:bg-cream"
                                                title="Edit restaurant"
                                            >
                                                <Edit3 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(r)}
                                                className="text-warm-gray hover:text-black hover:bg-cream"
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
                <DialogContent className="max-w-4xl bg-white border border-black text-black rounded-xl p-0 overflow-hidden">
                    <DialogHeader className="p-6 border-b border-warm-border">
                        <DialogTitle className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white border border-black">
                                <Utensils className="h-5 w-5 text-black" />
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
                                    <Label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                                        <Tag className="h-4 w-4 text-warm-gray" />
                                        Restaurant ID
                                    </Label>
                                    <Input
                                        className="bg-white border-warm-border text-black placeholder:text-warm-gray focus:border-black"
                                        placeholder="e.g., RS-001"
                                        value={current?.id || ""}
                                        onChange={(e) => setCurrent({...current, id: e.target.value})}
                                    />
                                    <p className="text-xs text-warm-gray mt-1">Unique identifier for database</p>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium text-black mb-2">Restaurant Name</Label>
                                    <Input
                                        className="bg-white border-warm-border text-black placeholder:text-warm-gray focus:border-black"
                                        value={current?.name || ""}
                                        onChange={(e) => setCurrent({...current, name: e.target.value})}
                                        placeholder="Enter restaurant name"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-black mb-2">Region</Label>
                                        <Input
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-warm-gray"
                                            value={current?.region || ""}
                                            onChange={(e) => setCurrent({...current, region: e.target.value})}
                                            placeholder="e.g., Bordeaux"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-black mb-2">Commune</Label>
                                        <Input
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-warm-gray"
                                            value={current?.commune || ""}
                                            onChange={(e) => setCurrent({...current, commune: e.target.value})}
                                            placeholder="e.g., Pauillac"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium text-black mb-2">Cuisine Type</Label>
                                    <Input
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-warm-gray"
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
                                        <Label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                                            <Euro className="h-4 w-4 text-warm-gray" />
                                            Lunch Cost (€)
                                        </Label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-warm-gray"
                                            value={current?.lunchCost || 0}
                                            onChange={(e) => setCurrent({...current, lunchCost: Number(e.target.value)})}
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-black mb-2">Price Bracket</Label>
                                        <Input
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-warm-gray"
                                            value={current?.bracket || ""}
                                            onChange={(e) => setCurrent({...current, bracket: e.target.value})}
                                            placeholder="€€ - €€€"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                                            <Star className="h-4 w-4 text-warm-gray" />
                                            Rating (0-5)
                                        </Label>
                                        <Input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-warm-gray"
                                            value={current?.rating || 0}
                                            onChange={(e) => setCurrent({...current, rating: Number(e.target.value)})}
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-black mb-2">GKP Code</Label>
                                        <Input
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-warm-gray"
                                            value={current?.gkp || ""}
                                            onChange={(e) => setCurrent({...current, gkp: e.target.value})}
                                            placeholder="GKP identifier"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-warm-gray" />
                                        Opening Hours
                                    </Label>
                                    <Input
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-warm-gray"
                                        value={current?.open || ""}
                                        onChange={(e) => setCurrent({...current, open: e.target.value})}
                                        placeholder="e.g., 11:00 AM - 3:00 PM"
                                    />
                                </div>
                            </div>

                            {/* Coordinates Section */}
                            <div className="grid grid-cols-2 gap-4 md:col-span-2 pt-4 border-t border-warm-border">
                                <div>
                                    <Label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-warm-gray" />
                                        Latitude
                                    </Label>
                                    <Input
                                        type="number"
                                        step="any"
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-warm-gray"
                                        value={current?.latitude || ""}
                                        onChange={(e) => setCurrent({...current, latitude: parseFloat(e.target.value)})}
                                    />
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-warm-gray" />
                                        Longitude
                                    </Label>
                                    <Input
                                        type="number"
                                        step="any"
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-warm-gray"
                                        value={current?.longitude || ""}
                                        onChange={(e) => setCurrent({...current, longitude: parseFloat(e.target.value)})}
                                    />
                                </div>
                            </div>

                            {/* Description Section - Full Width */}
                            <div className="md:col-span-2 space-y-4 pt-6 border-t border-warm-border">
                                <div className="flex items-center gap-2">
                                    <Coffee className="h-5 w-5 text-black" />
                                    <h3 className="text-lg font-bold text-black">Description & Details</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-sm font-medium text-black mb-2">Short Description</Label>
                                        <textarea
                                            className="w-full bg-white border border-warm-border rounded-lg p-3 text-white placeholder:text-warm-gray min-h-[100px] resize-y"
                                            value={current?.description || ""}
                                            onChange={(e) => setCurrent({...current, description: e.target.value})}
                                            placeholder="Brief description of the restaurant, ambiance, specialties..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-sm font-medium text-black mb-2">Country</Label>
                                            <Input
                                                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-warm-gray"
                                                value={current?.country || ""}
                                                onChange={(e) => setCurrent({...current, country: e.target.value})}
                                                placeholder="e.g., France"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-black mb-2">Sub-Region</Label>
                                            <Input
                                                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-warm-gray"
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
                            {current?.mongoId ? "Update Restaurant" : "Create Restaurant"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}