import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { userAuthSchema } from '@/lib/validations/auth';
import { z } from 'zod';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate input
        const { email, password, name } = userAuthSchema.parse(body);

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                name: name || '',
                email,
                password: hashedPassword,
            }
        });

        return NextResponse.json({
            message: 'User created successfully',
            userId: user.id
        }, { status: 201 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: 'Invalid input', errors: error.format() }, { status: 422 });
        }

        console.error('Registration error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
