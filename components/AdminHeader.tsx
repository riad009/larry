"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, Users, Utensils, Grape, LayoutDashboard, Menu, X } from 'lucide-react';

const navItems = [
    { name: 'Vineyards', href: '/admin/vineyard', icon: Grape },
    { name: 'Lunch', href: '/admin/lunch', icon: Utensils },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-[100]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2 font-bold text-white text-lg">
                        <LayoutDashboard className="text-green-500" />
                        <span className="tracking-tight">Admin</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-8">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                                        isActive ? 'text-green-500' : 'text-zinc-400 hover:text-white'
                                    }`}
                                >
                                    <Icon size={16} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-zinc-400 hover:text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isOpen && (
                <nav className="md:hidden bg-zinc-900 border-t border-zinc-800 p-4 space-y-2 animate-in slide-in-from-top duration-200">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)} // Close menu on click
                                className={`flex items-center gap-3 p-3 rounded-lg text-base font-medium transition-colors ${
                                    isActive ? 'bg-green-500/10 text-green-500' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                }`}
                            >
                                <Icon size={20} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            )}
        </header>
    );
}