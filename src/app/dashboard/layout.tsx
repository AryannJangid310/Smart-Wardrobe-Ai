'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

const sidebarItems = [
    { label: 'Overview', href: '/dashboard', icon: '🏠' },
    { label: 'My Wardrobe', href: '/dashboard/wardrobe', icon: '👕' },
    { label: 'Outfits', href: '/dashboard/outfits', icon: '✨' },
    { label: 'Calendar', href: '/dashboard/calendar', icon: '📅' },
    { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <div className="flex h-screen bg-black text-white overflow-hidden">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-64 border-r border-neutral-800 p-6 flex flex-col"
            >
                <Link href="/" className="flex items-center gap-2 mb-10 cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-200">
                    <div className="w-8 h-8 bg-white rounded-full" />
                    <span className="font-bold text-lg">SmartWardrobe</span>
                </Link>

                <nav className="space-y-2 flex-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-white text-black shadow-lg font-medium'
                                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                                    }`}>
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-neutral-800">
                    <div className="flex items-center gap-3">
                        {session?.user?.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={session.user.image} alt="User" className="w-10 h-10 rounded-full bg-neutral-800 object-cover" />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-bold">
                                {session?.user?.name?.[0] || 'U'}
                            </div>
                        )}
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{session?.user?.name || 'User'}</p>
                            <p className="text-xs text-neutral-500 truncate">{session?.user?.email || 'Free Plan'}</p>
                        </div>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 relative">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
