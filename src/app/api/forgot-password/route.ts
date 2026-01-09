import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { email, mobile, method } = await req.json();

        // Check if user exists based on method
        let user;
        if (method === 'email') {
            if (!email) {
                return NextResponse.json({ message: 'Email is required' }, { status: 400 });
            }
            user = await prisma.user.findUnique({ where: { email } });
        } else if (method === 'mobile') {
            // In a real app, you'd check mobile number. For now, we mock.
            if (!mobile) {
                return NextResponse.json({ message: 'Mobile number is required' }, { status: 400 });
            }
            // Mock user found for mobile
            user = true;
        }

        if (!user) {
            // For security, often better to return success even if user not found, 
            // but for this demo we'll return error or success.
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Mock sending email/OTP
        console.log(`[Forgot Password] Sending reset to ${method === 'email' ? email : mobile}`);

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return NextResponse.json({ message: 'Reset instruction sent' }, { status: 200 });

    } catch (error) {
        console.error('Forgot Password error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
