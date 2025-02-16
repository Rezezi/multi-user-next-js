import { PrismaClient } from "@prisma/client";

import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.user.create({
        data: {
            name: "Admin",
            email: "admin@example.com",
            password: hashedPassword,
            role: "ADMIN", // Pastikan role benar
        },
    });

    console.log("✅ Admin berhasil dibuat!");
}

main()
    .catch((e) => {
        console.error("❌ Error saat seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
