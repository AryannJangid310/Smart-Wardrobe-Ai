import Link from 'next/link';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect('/login');
    }

    // specific query to get the user ID first since relations rely on it
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true, name: true }
    });

    if (!user) {
        // Handle edge case where session exists but user DB record might be missing
        redirect('/login');
    }

    const itemCount = await prisma.clothingItem.count({
        where: { userId: user.id }
    });

    const outfitCount = await prisma.outfit.count({
        where: { userId: user.id }
    });

    const latestOutfit = await prisma.outfit.findFirst({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        include: { items: true }
    });

    const getUserGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{getUserGreeting()}, {user.name?.split(' ')[0] || 'User'}</h1>
                    <p className="text-neutral-400">Here's your style summary for today.</p>
                </div>
                <Link href="/dashboard/upload" className="px-6 py-3 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform inline-block">
                    + Upload New Item
                </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
                    <p className="text-neutral-400 text-sm">Total Items</p>
                    <p className="text-4xl font-bold mt-2">{itemCount}</p>
                    <p className="text-sm text-green-400 mt-2">In your wardrobe</p>
                </div>
                <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
                    <p className="text-neutral-400 text-sm">Outfits Created</p>
                    <p className="text-4xl font-bold mt-2">{outfitCount}</p>
                    <p className="text-sm text-purple-400 mt-2">Combinations generated</p>
                </div>
                <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
                    <p className="text-neutral-400 text-sm">Style Score</p>
                    <p className="text-4xl font-bold mt-2">94</p>
                    <p className="text-sm text-yellow-400 mt-2">Based on variety</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 rounded-2xl bg-neutral-900 border border-neutral-800 p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg">Latest Outfit</h3>
                        {latestOutfit && <span className="text-xs text-neutral-500">{new Date(latestOutfit.createdAt).toLocaleDateString()}</span>}
                    </div>

                    {latestOutfit ? (
                        <div className="flex-1 flex gap-2 overflow-hidden">
                            {latestOutfit.items.slice(0, 3).map((item) => (
                                <div key={item.id} className="flex-1 bg-neutral-800 rounded-lg overflow-hidden relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={item.imageUrl} alt={item.category} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-neutral-500 border-2 border-dashed border-neutral-800 rounded-lg">
                            <div className="text-center">
                                <p>No outfits generated yet</p>
                                <Link href="/dashboard/outfits" className="text-indigo-400 text-sm hover:underline mt-1 block">Generate one now</Link>
                            </div>
                        </div>
                    )}
                </div>

                <div className="h-64 rounded-2xl bg-neutral-900 border border-neutral-800 p-6">
                    <h3 className="font-bold text-lg">Quick Actions</h3>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <Link href="/dashboard/outfits" className="bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2">
                            <span className="text-2xl">✨</span>
                            <span className="font-medium text-sm">Generate Outfit</span>
                        </Link>
                        <Link href="/dashboard/wardrobe" className="bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2">
                            <span className="text-2xl">👕</span>
                            <span className="font-medium text-sm">View Wardrobe</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
