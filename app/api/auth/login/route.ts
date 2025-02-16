import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Pastikan JWT_SECRET ada
  if (!process.env.JWT_SECRET) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  // Buat token JWT dengan role
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const response = NextResponse.json({
    message: "Login successful",
    role: user.role, // Kirim role ke frontend agar bisa redirect
  });

  // Simpan token ke cookies
  response.headers.set(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`
  );

  return response;
}
