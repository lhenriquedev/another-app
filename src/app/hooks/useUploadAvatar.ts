import { httpClient } from "@app/services/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type UploadAvatarParams = {
  uri: string;
  fileName: string;
  type: string;
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: async ({ uri, fileName, type }: UploadAvatarParams) => {
      const formData = new FormData();

      formData.append("avatar", {
        uri,
        name: fileName,
        type,
      } as unknown as Blob);

      const response = await httpClient.post("/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          }
        },
      });

      return response.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setUploadProgress(0);
    },
    onError() {
      setUploadProgress(0);
    },
  });

  return {
    ...mutation,
    uploadProgress,
  };
};
