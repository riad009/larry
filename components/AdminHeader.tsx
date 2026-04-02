"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, Users, Utensils, Grape, LayoutDashboard, Menu, X, Wine } from 'lucide-react';

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
        <header className="bg-wine-900 border-b border-wine-800 sticky top-0 z-[100]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2 font-bold text-white text-lg">
                        <div className="p-1.5 rounded-lg bg-wine-700">
                            <Wine className="w-5 h-5 text-gold-400" />
                        </div>
                        <span className="tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>SmartRoute <span className="text-gold-400 text-sm font-normal">Admin</span></span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                                        isActive
                                            ? 'bg-wine-700 text-white'
                                            : 'text-wine-200 hover:bg-wine-800 hover:text-white'
                                    }`}
                                >
                                    <Icon size={16} />
                                    {item.name}
                                    {isActive && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-wine-200 hover:text-white transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isOpen && (
                <nav className="md:hidden bg-wine-900/95 backdrop-blur-xl border-t border-wine-800 p-4 space-y-1 animate-fade-in">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 p-3 rounded-xl text-base font-medium transition-all ${
                                    isActive
                                        ? 'bg-wine-700 text-white'
                                        : 'text-wine-200 hover:bg-wine-800 hover:text-white'
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