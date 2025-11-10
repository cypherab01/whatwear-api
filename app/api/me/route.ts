import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const auth = req.headers.get("authorization");
    const token = auth?.split(" ")[1];
    const { userId }: any = jwt.verify(token!, process.env.JWT_SECRET!);

    const user = await prisma.user.findUnique({ where: { id: userId } });
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
