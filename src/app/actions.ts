'use server';

import { analyzeImage } from "@/lib/ai/analysis";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function analyzeImageAction(base64Image: string) {
    try {
        const result = await analyzeImage(base64Image);
        return { success: true, data: result };
    } catch (error) {
        console.error("Analysis Action Failed:", error);
        return { success: false, error: "Failed to analyze image" };
    }
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function uploadItem(formData: FormData) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return { success: false, error: "Not authenticated" };
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return { success: false, error: "User not found" };
        }

        const file = formData.get('file') as File;
        if (!file) {
            return { success: false, error: "No file provided" };
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
        const uploadDir = join(process.cwd(), "public/uploads");

        await mkdir(uploadDir, { recursive: true });
        await writeFile(join(uploadDir, filename), buffer);

        const imageUrl = `/uploads/${filename}`;

        // In a real app, we'd pass the image URL or buffer to the AI service
        // For now, we mock the analysis based on the filename or just random
        const analysis = await analyzeImage("mock-base64");

        const item = await prisma.clothingItem.create({
            data: {
                userId: user.id,
                imageUrl: imageUrl,
                category: analysis.category,
                color: analysis.color,
                attributes: analysis.tags, // Storing tags as Json or we could check schema
            }
        });

        revalidatePath('/dashboard/wardrobe');
        return { success: true, item };

    } catch (error) {
        console.error("Upload Failed:", error);
        return { success: false, error: "Failed to upload item" };
    }
}
