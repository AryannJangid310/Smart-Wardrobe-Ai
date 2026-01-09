import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        const entries = await prisma.calendarEntry.findMany({
            where: { userId: user.id },
            include: {
                outfit: {
                    include: { items: true }
                }
            },
            orderBy: { date: 'asc' }
        });

        return NextResponse.json({ success: true, entries });
    } catch (error) {
        console.error("Calendar Fetch Error:", error);
        return NextResponse.json({ success: false, error: 'Failed to fetch calendar' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { outfitId, date } = await req.json();

        if (!outfitId || !date) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        const entry = await prisma.calendarEntry.create({
            data: {
                userId: user.id,
                outfitId: outfitId,
                date: new Date(date),
            }
        });

        return NextResponse.json({ success: true, entry });
    } catch (error) {
        console.error("Calendar Save Error:", error);
        return NextResponse.json({ success: false, error: 'Failed to save to calendar' }, { status: 500 });
    }
}
