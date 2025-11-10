import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const label = await prisma.labels.findUnique({ where: { id } });

  if (!label)
    return NextResponse.json(
      { message: "Label not found or invalid id passed" },
      { status: 404 }
    );

  await prisma.labels.delete({ where: { id } });

  return NextResponse.json(
    { message: "Label deleted successfully" },
    { status: 200 }
  );
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { label } = await req.json();

    if (!label)
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    const db = await prisma.labels.findUnique({ where: { id } });

    if (!db)
      return NextResponse.json({ message: "Label not found" }, { status: 404 });

    const data = await prisma.labels.update({
      where: { id },
      data: { name: label },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(
      { message: "Label updated successfully", data: data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
