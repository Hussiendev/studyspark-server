// config.js
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL (Neon) successfully!");
  } catch (err) {
    console.error("❌ Failed to connect to PostgreSQL:", err);
  }
};
