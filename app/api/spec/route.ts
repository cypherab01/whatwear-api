import { NextResponse } from "next/server";
import openapiJson from "@/constants/openapi.json";

export async function GET() {
  return NextResponse.json(openapiJson, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
