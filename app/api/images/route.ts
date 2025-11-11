import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { label_id } = await req.json();

    const images = await prisma.label_images.findMany({
      where: {
        label_id,
      },
      select: {
        id: true,
        url: true,
        name: true,
      },
    });

    return NextResponse.json(
      { images, length: images.length, label_id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
