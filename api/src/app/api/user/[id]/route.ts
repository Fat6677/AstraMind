import { prisma } from "@/app/api/lib/prisma";
import { NextRequest } from "next/server";

// GET user by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id }
    });

    if (!user) {
      return Response.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    return Response.json(user);
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// UPDATE
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updated = await prisma.user.update({
      where: { id: params.id },
      data: {
        username: body.username,
        email: body.email,
        birthdate: body.birthdate ? new Date(body.birthdate) : undefined,
      }
    });

    return Response.json({
      message: "User updated",
      user: updated
    });
  } catch (error) {
    return Response.json({ error: "Update gagal" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.delete({
      where: { id: params.id }
    });

    return Response.json({ message: "User dihapus" });
  } catch (error) {
    return Response.json({ error: "Gagal menghapus user" }, { status: 500 });
  }
}
