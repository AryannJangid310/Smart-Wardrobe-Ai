import { NextResponse } from 'next/server';
import { generateOutfitSuggestion } from '@/lib/ai/analysis';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch user's clothing items
        const userItems = await prisma.clothingItem.findMany({
            where: {
                user: { email: session.user.email }
            },
            take: 50
        });

        // If no items found, return error
        if (userItems.length < 2) {
            return NextResponse.json({
                success: false,
                error: 'Not enough items. Please upload at least 2 clothing items.'
            }, { status: 400 });
        }

        const wardrobeIds = userItems.map(item => item.id);

        // Simple shuffle to pick random items for "AI" outfits
        const shuffled = [...wardrobeIds].sort(() => 0.5 - Math.random());
        const outfit1Items = shuffled.slice(0, 2);
        const outfit2Items = shuffled.slice(2, 4);

        // Fallback if not enough for 2 distinct outfits
        if (outfit2Items.length === 0) {
            outfit2Items.push(shuffled[0]);
        }

        // Helper to get full item details
        const getItems = (ids: string[]) => ids.map(id => {
            const item = userItems.find(i => i.id === id);
            return { id: item?.id, imageUrl: item?.imageUrl };
        });

        const outfit1Full = getItems(outfit1Items);
        const outfit2Full = getItems(outfit2Items);

        const suggestion = await generateOutfitSuggestion(wardrobeIds);

        return NextResponse.json({
            success: true,
            outfits: [
                { id: '101', name: 'Smart Casual Mix', items: outfit1Full, matchScore: 95, description: "Perfect for a relaxed day out." },
                { id: '102', name: 'Weekend Vibes', items: outfit2Full, matchScore: 88, description: "Comfortable and stylish." }
            ],
            ...suggestion
        });
    } catch (error) {
        console.error("Outfit generation error:", error);
        return NextResponse.json({ success: false, error: 'Failed to generate outfit' }, { status: 500 });
    }
}
