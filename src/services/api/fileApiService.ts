import { ApiResponse } from "@/types/apiReponse";
import api from "./apiService";

export interface FileUpload {
  created_at: string;
  file_path: string;
  id: string;
  link: string;
  size: number;
  type: string;
  updated_at: string;
}

export const uploadFile = async (
  fileUri: string,
  folder: string = "profile"
): Promise<ApiResponse<FileUpload>> => {
  const formData = new FormData();

  // Extract filename from URI
  const filename = fileUri.split("/").pop() || "photo.jpg";
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : "image/jpeg";

  // Append file to FormData
  formData.append("file", {
    uri: fileUri,
    name: filename,
    type: type,
  } as any);

  formData.append("folder", folder);

  const response = await api.post<ApiResponse<FileUpload>>(
    "/file/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
