// import { NextResponse } from "next/server";
// import { UTApi } from "uploadthing/server";

// const utapi = new UTApi();

// async function uploadServerSideFile(file: File) {
//   try {
//     const response = await utapi.uploadFiles(file);
//     return response.data;
//   } catch (error) {
//     console.error("Upload failed:", error);
//     throw error;
//   }
// }

// export async function POST(request: Request) {
//   const formData = await request.formData();
//   const file = formData.get("image") as File;
//   const result = await uploadServerSideFile(file);
//   return NextResponse.json(result, { status: 200 });
// }
