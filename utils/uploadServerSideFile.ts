import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

// should be check for auth when using this function
// we are checking in proxy in our case
export async function uploadServerSideFile(file: File) {
  try {
    const response = await utapi.uploadFiles(file);
    return response.data;
  } catch (error) {
    throw error;
  }
}
