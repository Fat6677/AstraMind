import { NextResponse } from "next/server";
import prisma from "@/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Email tidak ditemukan" },
      { status: 404 }
    );
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return NextResponse.json(
      { error: "Password salah" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message: "Login berhasil",
    user: { id: user.id, email: user.email },
  });
}
