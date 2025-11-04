import { httpClient } from "@app/services/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCheckin = (selectedClassId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await httpClient.post("/create-checkin", {
        classId: selectedClassId,
      });

      return data;
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["classe-by-id", selectedClassId],
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["recent-classes"] });
      queryClient.invalidateQueries({ queryKey: ["upcoming-classes"] });
    },
  });
};
