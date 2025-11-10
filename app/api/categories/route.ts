import prisma from "@/lib/prisma";
import { getUserId } from "@/utils/getUserId";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const userId = await getUserId(req);
    const categories = await prisma.category.findMany({ where: { userId } });
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get categories: " + (error as Error).message },
      { status: 400 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserId(req);
    const { name } = await req.json();
    const category = await prisma.category.create({ data: { name, userId } });
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category: " + (error as Error).message },
      { status: 400 }
    );
  }
}
