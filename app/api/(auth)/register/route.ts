import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password, username } = await req.json();

    if (!name || !email || !password || !username)
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );

    const existing = await prisma.users.findUnique({ where: { email } });
    if (existing)
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );

    const userNameExists = await prisma.users.findUnique({
      where: { username },
    });

    if (userNameExists)
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: { name, email, password: hashed, username },
    });

    return NextResponse.json(
      { user: { id: user.id, email: user.email } },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
