"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, Users, Utensils, Grape, Menu, X, Wine, CalendarDays } from 'lucide-react';

const navItems = [
    { name: 'Vineyards', href: '/admin/vineyard', icon: Grape },
    { name: 'Lunch', href: '/admin/lunch', icon: Utensils },
    { name: 'Bookings', href: '/admin/bookings', icon: CalendarDays },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="bg-gradient-to-r from-wine-900 via-wine-900 to-wine-800 border-b border-wine-700/50 sticky top-0 z-[100] shadow-lg shadow-wine-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <Link href="/admin/vineyard" className="flex items-center gap-2.5 font-bold text-white text-lg group">
                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 shadow-md group-hover:shadow-gold-500/30 transition-shadow">
                            <Wine className="w-4 h-4 text-wine-900" />
                        </div>
                        <span className="tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                            SmartRoute <span className="text-gold-400 text-xs font-semibold ml-0.5 uppercase tracking-wider">Admin</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-0.5 bg-wine-800/50 rounded-xl p-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-lg transition-all duration-200 ${
                                        isActive
                                            ? 'bg-white/15 text-white shadow-sm'
                                            : 'text-wine-300 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <Icon size={14} />
                                    {item.name}
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-400" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-wine-200 hover:text-white transition-colors rounded-lg hover:bg-wine-800"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isOpen && (
                <nav className="md:hidden bg-wine-900/98 backdrop-blur-xl border-t border-wine-700/50 p-3 space-y-0.5 animate-fade-in">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                                    isActive
                                        ? 'bg-white/10 text-white border-l-2 border-gold-400'
                                        : 'text-wine-300 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <Icon size={18} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            )}
        </header>
    );
}