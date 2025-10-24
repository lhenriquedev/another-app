import { httpClient } from "@app/services/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateProfileBody = {
  name?: string;
  birthDate?: string;
  email?: string;
  phone?: string;
  gender?: "male" | "female";
};

export const useProfileUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: UpdateProfileBody) => {
      await httpClient.patch(`/update-profile`, body);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
