import ClothingItemCard from "@/components/ClothingItemCard";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function WardrobePage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect('/login');
    }

    const items = await prisma.clothingItem.findMany({
        where: {
            user: {
                email: session.user.email
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">My Wardrobe</h1>
                    <p className="text-neutral-400">Manage and organize your collection.</p>
                </div>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Search items..."
                        className="bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-white"
                    />
                    <Link href="/dashboard/upload" className="px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-neutral-200 transition-colors flex items-center">
                        + Add Item
                    </Link>
                </div>
            </header>

            {items.length === 0 ? (
                <div className="text-center py-20 text-neutral-500">
                    <p className="text-xl">Your wardrobe is empty.</p>
                    <Link href="/dashboard/upload" className="text-indigo-400 hover:text-indigo-300 mt-2 inline-block">
                        Upload your first item
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <ClothingItemCard
                            key={item.id}
                            item={{
                                ...item,
                                name: item.category, // Fallback name
                                color: item.color || "#000000" // Fallback color
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
