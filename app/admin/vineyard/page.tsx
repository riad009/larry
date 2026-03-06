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
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [current, setCurrent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const filteredVineyards = vineyards.filter((v) => {
        if (!searchTerm.trim()) return true;
        const term = searchTerm.toLowerCase().trim();
        const name = (v.name ?? "").toLowerCase();
        const id = (v.id ?? "").toLowerCase();
        const region = (v.region ?? "").toLowerCase();
        const commune = (v.commune ?? "").toLowerCase();
        return name.includes(term) || id.includes(term) || region.includes(term) || commune.includes(term);
    });

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
                country: "",
                region: "",
                subRegion: "",
                type: "",
                gkp: "",
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

    // Calculate vineyard statistics (from full list, not filtered)
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
                            <div className="p-2 rounded-lg bg-white border border-black">
                                <Wine className="h-6 w-6 text-black" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-black">Vineyard Management</h1>
                                <p className="text-[#424242] text-sm">Manage all vineyard estates in the system</p>
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={() => handleOpen()}
                        className="bg-black hover:bg-[#424242] text-white font-bold rounded-xl px-6 py-6 border border-black flex items-center gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Add New Vineyard</span>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white border border-black rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-black">{totalVineyards}</p>
                                <p className="text-sm text-[#424242]">Total Vineyards</p>
                            </div>
                            <Building className="h-8 w-8 text-black opacity-70" />
                        </div>
                    </div>
                    <div className="bg-white border border-black rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-black">{totalRegions}</p>
                                <p className="text-sm text-[#424242]">Unique Regions</p>
                            </div>
                            <MapPin className="h-8 w-8 text-black opacity-70" />
                        </div>
                    </div>
                    <div className="bg-white border border-black rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-black">€{avgCostRange}</p>
                                <p className="text-sm text-[#424242]">Avg. Cost Per Person</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-black opacity-70" />
                        </div>
                    </div>
                    <div className="bg-white border border-black rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-black">{socialPercentage}%</p>
                                <p className="text-sm text-[#424242]">With Social Media</p>
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
                    placeholder="Search vineyards by name, ID, region, or commune..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md bg-white border border-[#E0E0E0] rounded-xl px-4 py-2 text-black placeholder:text-[#424242] focus:border-black"
                />
            </div>

            {/* Table Section */}
            <div className="rounded-xl border border-black bg-white overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#E0E0E0] border-t-black"></div>
                        <p className="mt-4 text-[#424242]">Loading vineyards...</p>
                    </div>
                ) : vineyards.length === 0 ? (
                    <div className="p-12 text-center">
                        <Wine className="h-12 w-12 text-[#424242] mx-auto mb-4" />
                        <p className="text-[#424242]">No vineyards found in the database</p>
                        <Button
                            onClick={() => handleOpen()}
                            className="mt-4 bg-black hover:bg-[#424242] text-white border border-black"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add First Vineyard
                        </Button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#F5F5F5] border-b border-black">
                            <tr>
                                <th className="text-left p-4 text-xs font-bold text-black uppercase tracking-wider">Vineyard</th>
                                <th className="text-left p-4 text-xs font-bold text-black uppercase tracking-wider">Location</th>
                                <th className="text-left p-4 text-xs font-bold text-black uppercase tracking-wider">Cost Range</th>
                                <th className="text-left p-4 text-xs font-bold text-black uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E0E0E0]">
                            {filteredVineyards.map((v) => (
                                <tr key={v.mongoId || v.id} className="hover:bg-[#F5F5F5] transition-colors duration-150">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-white border border-[#E0E0E0]">
                                                <Wine className="h-5 w-5 text-black" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-black">{v.name}</p>
                                                <p className="text-xs text-[#424242] font-mono">{v.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div>
                                            <p className="text-black">{v.region}</p>
                                            <p className="text-xs text-[#424242]">{v.commune}</p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Euro className="h-4 w-4 text-[#424242]" />
                                            <span className="font-medium text-black">
                                                €{v.lowestCost} - €{v.highestCost}
                                            </span>
                                            {v.dominantGrape && (
                                                <div className="ml-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#F5F5F5] border border-[#E0E0E0]">
                                                    <Grape className="h-3 w-3 text-black" />
                                                    <span className="text-xs text-black">{v.dominantGrape}</span>
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
                                                className="text-[#424242] hover:text-black hover:bg-[#F5F5F5]"
                                                title="Edit vineyard"
                                            >
                                                <Edit3 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(v)}
                                                className="text-[#424242] hover:text-black hover:bg-[#F5F5F5]"
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
                <DialogContent className="max-w-4xl bg-white border border-black text-black rounded-xl p-0 overflow-hidden">
                    <DialogHeader className="p-6 border-b border-[#E0E0E0]">
                        <DialogTitle className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white border border-black">
                                <Wine className="h-5 w-5 text-black" />
                            </div>
                            <span className="text-xl font-bold">
                                {current?.mongoId ? "Edit Vineyard" : "Add New Vineyard"}
                            </span>
                        </DialogTitle>
                    </DialogHeader>

                    <ScrollArea className="max-h-[60vh] p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                                        <Tag className="h-4 w-4 text-[#424242]" />
                                        Vineyard ID
                                    </Label>
                                    <Input
                                        className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242] focus:border-black"
                                        placeholder="e.g., RV-007"
                                        value={current?.id || ""}
                                        onChange={(e) => setCurrent({...current, id: e.target.value})}
                                    />
                                    <p className="text-xs text-[#424242] mt-1">Unique identifier for offers mapping</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-black mb-2">Vineyard Name</Label>
                                    <Input
                                        className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242] focus:border-black"
                                        value={current?.name || ""}
                                        onChange={(e) => setCurrent({...current, name: e.target.value})}
                                        placeholder="Enter vineyard name"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-black mb-2">Country</Label>
                                        <Input
                                            className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242]"
                                            value={current?.country || ""}
                                            onChange={(e) => setCurrent({...current, country: e.target.value})}
                                            placeholder="e.g., France"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-black mb-2">Sub Region</Label>
                                        <Input
                                            className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242]"
                                            value={current?.subRegion || ""}
                                            onChange={(e) => setCurrent({...current, subRegion: e.target.value})}
                                            placeholder="e.g., Médoc"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-black mb-2">Region</Label>
                                        <Input
                                            className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242]"
                                            value={current?.region || ""}
                                            onChange={(e) => setCurrent({...current, region: e.target.value})}
                                            placeholder="e.g., Bordeaux"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-black mb-2">Commune</Label>
                                        <Input
                                            className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242]"
                                            value={current?.commune || ""}
                                            onChange={(e) => setCurrent({...current, commune: e.target.value})}
                                            placeholder="e.g., Pauillac"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-black mb-2">Type</Label>
                                    <Input
                                        className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242]"
                                        value={current?.type || ""}
                                        onChange={(e) => setCurrent({...current, type: e.target.value})}
                                        placeholder="e.g., Estate, Cooperative"
                                    />
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-black mb-2">GKP</Label>
                                    <Input
                                        className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242]"
                                        value={current?.gkp || ""}
                                        onChange={(e) => setCurrent({...current, gkp: e.target.value})}
                                        placeholder="GKP identifier"
                                    />
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-black mb-2">Dominant Grape</Label>
                                    <Input
                                        className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242]"
                                        value={current?.dominantGrape || ""}
                                        onChange={(e) => setCurrent({...current, dominantGrape: e.target.value})}
                                        placeholder="e.g., Cabernet Sauvignon"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-[#424242]" />
                                            Latitude
                                        </Label>
                                        <Input
                                            type="number"
                                            step="any"
                                            className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242]"
                                            value={current?.latitude || ""}
                                            onChange={(e) => setCurrent({...current, latitude: parseFloat(e.target.value)})}
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-[#424242]" />
                                            Longitude
                                        </Label>
                                        <Input
                                            type="number"
                                            step="any"
                                            className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242]"
                                            value={current?.longitude || ""}
                                            onChange={(e) => setCurrent({...current, longitude: parseFloat(e.target.value)})}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-[#424242]" />
                                            Lowest Cost
                                        </Label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242]"
                                            value={current?.lowestCost || 0}
                                            onChange={(e) => setCurrent({...current, lowestCost: Number(e.target.value)})}
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-[#424242]" />
                                            Highest Cost
                                        </Label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242]"
                                            value={current?.highestCost || 0}
                                            onChange={(e) => setCurrent({...current, highestCost: Number(e.target.value)})}
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                                        <Instagram className="h-4 w-4 text-[#424242]" />
                                        Instagram URL
                                    </Label>
                                    <Input
                                        className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242]"
                                        value={current?.instagram || ""}
                                        onChange={(e) => setCurrent({...current, instagram: e.target.value})}
                                        placeholder="https://instagram.com/..."
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-[#424242]" />
                                            Saturday Hours
                                        </Label>
                                        <Input
                                            className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242]"
                                            value={current?.saturday || ""}
                                            onChange={(e) => setCurrent({...current, saturday: e.target.value})}
                                            placeholder="e.g., 9:00 AM - 5:00 PM"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-[#424242]" />
                                            Sunday Hours
                                        </Label>
                                        <Input
                                            className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242]"
                                            value={current?.sunday || ""}
                                            onChange={(e) => setCurrent({...current, sunday: e.target.value})}
                                            placeholder="e.g., Closed"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-4 pt-6 border-t border-[#E0E0E0]">
                                <div className="flex items-center gap-2">
                                    <Wine className="h-5 w-5 text-black" />
                                    <h3 className="text-lg font-bold text-black">Experience Highlights</h3>
                                </div>
                                <p className="text-sm text-[#424242] mb-4">Add up to 5 key highlights for this vineyard</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <div key={num} className="space-y-2">
                                            <Label className="text-sm font-medium text-black">Highlight {num}</Label>
                                            <Input
                                                className="bg-white border-[#E0E0E0] text-black placeholder:text-[#424242]"
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

                    <DialogFooter className="p-6 border-t border-[#E0E0E0] bg-[#F5F5F5]">
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(false)}
                            className="text-[#424242] hover:text-black hover:bg-[#E0E0E0]"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="bg-black hover:bg-[#424242] text-white font-bold px-8 py-6 rounded-xl border border-black"
                        >
                            {current?.mongoId ? "Update Vineyard" : "Create Vineyard"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}