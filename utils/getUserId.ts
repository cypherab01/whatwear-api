import jwt from "jsonwebtoken";

export const getUserId = async (req: Request): Promise<string> => {
  try {
    const auth = req.headers.get("authorization");

    if (!auth) throw new Error("Unauthorized");

    const token = auth.split(" ")[1];

    const { userId }: any = jwt.verify(token!, process.env.JWT_SECRET!);
    return userId as string;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong.");
    }
  }
};
