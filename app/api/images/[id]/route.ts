import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const isExist = await prisma.label_images.findUnique({
      where: { id },
    });

    if (!isExist) {
      return NextResponse.json(
        { error: "Image does not exists or invalid id passed" },
        { status: 400 }
      );
    }

    const dbRes = await prisma.label_images.delete({
      where: {
        id: id,
      },
    });

    if (!dbRes) {
      return NextResponse.json(
        { error: "Image couldn't be deleted" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Image delete successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
