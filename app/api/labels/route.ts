import prisma from "@/lib/prisma";
import { getUserId } from "@/utils/getUserId";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const userId = await getUserId(req);
    const labels = await prisma.labels.findMany({
      where: { user_id: userId },
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(
      { labels, length: labels.length },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 401 });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserId(req);
    const { label } = await req.json();

    const labelDoesExist = await prisma.labels.findFirst({
      where: {
        name: label,
        user_id: userId,
      },
    });

    if (labelDoesExist) {
      return NextResponse.json(
        { error: "Label already exists" },
        { status: 409 }
      );
    }

    const dbLabel = await prisma.labels.create({
      data: {
        name: label,
        user_id: userId,
      },
    });

    return NextResponse.json(
      { message: "Label created", data: dbLabel },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
