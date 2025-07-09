import api from "@/lib/axios";
import { toast } from "sonner";
import { useState } from "react";

export function useUploadAttachment() {
  const [uploading, setUploading] = useState(false);

  const upload = async (
    assignmentId: number,
    file: File,
    onProgress?: (progress: number) => void
  ) => {
    const formData = new FormData();
    formData.append("file", file);

    const toastId = toast.loading("Uploading...");

    try {
      setUploading(true);

      await api.post(`/assignments/${assignmentId}/attachment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          if (onProgress) onProgress(progress);
        },
      });

      toast.success("Upload completed", { id: toastId });
    } catch (err) {
      toast.error("Upload failed", { id: toastId });
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading };
}
