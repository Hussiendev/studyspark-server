import bcrypt from "bcryptjs";
import { prisma } from "../db/utils/prisma.config.js"; // ✅ file should export PrismaClient instance
import { validate } from "../functions/validate.js";
import logger from "../utils/logger.js";
import { generateToken } from "../utils/generateToken.js";
import { sendVerificationToken } from "../mailtrap/emaile.js";

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // ✅ 1. Validate input
    const { errors, isValid } = validate({ email, password, name });
    if (!isValid) {
      logger.error("Validation errors during signup", errors);
      return res.status(400).json({ errors });
    }

    // ✅ 2. Check if email exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      logger.error("Email already exists");
      return res.status(400).json({ errors: { email: "Email already exists" } });
    }

    // ✅ 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ 4. Generate verification token (6 digits)
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ 5. Create user in PostgreSQL
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verficationToken: verificationToken,
        verficationTocenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
      },
    });

    // ✅ 6. Generate JWT cookie
    generateToken(res, newUser.id); // Prisma uses "id", not "_id"

    // ✅ 7. Send verification email
    await sendVerificationToken(newUser.email, verificationToken);

    logger.info("User created successfully");

    // ✅ 8. Return response (omit password)
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isVerified: newUser.isVerified,
      },
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
