"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";

export default function ListingsTable() {
    const [listings, setListings] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({});

    // Fetch listings
    useEffect(() => {
        (async () => {
            const res = await fetch("/api/listings");
            const data = await res.json();
            setListings(data);
        })();
    }, []);

    const handleEdit = (listing: any) => {
        setEditingId(listing._id);
        setFormData(listing);
    };

    const handleSave = async () => {
        await fetch("/api/listings", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        setEditingId(null);

        // Refresh listings
        const res = await fetch("/api/listings");
        setListings(await res.json());
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4 text-green-700">Listings Management</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Region</TableCell>
                        <TableCell>Closed Sat</TableCell>
                        <TableCell>Closed Sun</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {listings.map((l) => (
                        <TableRow key={l._id}>
                            <TableCell>
                                {editingId === l._id ? (
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                ) : (
                                    l.name
                                )}
                            </TableCell>
                            <TableCell>
                                {editingId === l._id ? (
                                    <Input
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    />
                                ) : (
                                    l.country
                                )}
                            </TableCell>
                            <TableCell>
                                {editingId === l._id ? (
                                    <Input
                                        value={formData.region}
                                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                                    />
                                ) : (
                                    l.region
                                )}
                            </TableCell>
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={editingId === l._id ? formData.closedSaturday : l.closedSaturday}
                                    onChange={(e) =>
                                        setFormData({ ...formData, closedSaturday: e.target.checked })
                                    }
                                    disabled={editingId !== l._id}
                                />
                            </TableCell>
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={editingId === l._id ? formData.closedSunday : l.closedSunday}
                                    onChange={(e) =>
                                        setFormData({ ...formData, closedSunday: e.target.checked })
                                    }
                                    disabled={editingId !== l._id}
                                />
                            </TableCell>
                            <TableCell>
                                {editingId === l._id ? (
                                    <Button size="sm" onClick={handleSave}>
                                        Save
                                    </Button>
                                ) : (
                                    <Button size="sm" variant="outline" onClick={() => handleEdit(l)}>
                                        Edit
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
