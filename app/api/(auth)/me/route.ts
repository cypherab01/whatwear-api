import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUserId } from "@/utils/getUserId";

export async function GET(req: Request) {
  try {
    const userId = await getUserId(req);

    const user = await prisma.users.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { user: { id: user.id, email: user.email, username: user.username } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Token is invalid" }, { status: 401 });
  }
}
