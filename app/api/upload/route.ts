import prisma from "@/lib/prisma";
import { uploadServerSideFile } from "@/utils/uploadServerSideFile";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Access fields
    const label_id = formData.get("label_id") as string;
    const image = formData.get("image") as File | null;
    const name = formData.get("name") as string;

    if (!label_id || !image || !name) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const fileUpload = await uploadServerSideFile(image);

    if (!fileUpload) {
      return NextResponse.json(
        { message: "Failed to upload image" },
        { status: 400 }
      );
    }

    const dbRes = await prisma.label_images.create({
      data: {
        name,
        url: fileUpload.ufsUrl,
        label_id,
      },
    });

    return NextResponse.json(
      { message: "Image uploaded successfully", data: dbRes },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
