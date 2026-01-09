
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const url = process.env.DATABASE_URL;

console.log("Checking DATABASE_URL...");

if (!url) {
    console.error("❌ DATABASE_URL is missing from .env");
    process.exit(1);
}

if (url.startsWith("file:")) {
    console.error("❌ URL is still set to SQLite: " + url);
    console.error("Please update .env with your MongoDB connection string.");
    process.exit(1);
}

if (!url.startsWith("mongodb")) {
    console.error("❌ URL does not look like a MongoDB URL.");
    console.error("Current prefix: " + url.substring(0, 10) + "...");
    process.exit(1);
}

console.log("✅ URL format looks correct (starts with mongodb).");
console.log("Attempting to connect via Prisma...");

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.$connect();
        console.log("✅ Successfully connected to MongoDB via Prisma!");

        // Optional: Check if we can find any users (just to verify read access)
        const userCount = await prisma.user.count();
        console.log(`info: Found ${userCount} users in the database.`);

    } catch (e) {
        console.error("❌ Failed to connect to MongoDB:");
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
