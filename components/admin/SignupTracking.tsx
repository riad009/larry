"use client";

import { useState, useEffect } from "react";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";

export default function SignupTracking() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/users");
            const data = await res.json();
            setUsers(data);
        })();
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4 text-green-700">Sign‑Up Tracking</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>User Type</TableCell>
                        <TableCell>Signup Date</TableCell>
                        <TableCell>Trial Days Remaining</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((u) => (
                        <TableRow key={u._id}>
                            <TableCell>{u.name}</TableCell>
                            <TableCell>{u.email}</TableCell>
                            <TableCell>{u.country}</TableCell>
                            <TableCell>{u.userType}</TableCell>
                            <TableCell>{new Date(u.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>{u.trialDaysRemaining ?? "—"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
