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
        <header className="bg-white border-b border-black sticky top-0 z-[100]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2 font-bold text-black text-lg">
                        <LayoutDashboard className="text-black" />
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
                                        isActive ? 'text-black font-semibold' : 'text-[#424242] hover:text-black'
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
                        className="md:hidden p-2 text-[#424242] hover:text-black"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isOpen && (
                <nav className="md:hidden bg-white border-t border-[#E0E0E0] p-4 space-y-2 animate-in slide-in-from-top duration-200">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 p-3 rounded-lg text-base font-medium transition-colors ${
                                    isActive ? 'bg-[#F5F5F5] text-black font-semibold' : 'text-[#424242] hover:bg-[#F5F5F5] hover:text-black'
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