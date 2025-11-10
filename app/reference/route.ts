// app/reference/route.ts
import { ApiReference } from "@scalar/nextjs-api-reference";

export const GET = ApiReference({
  spec: {
    url: "/api/spec",
  },
} as any);
