import { httpClient } from "@app/services/httpClient";
import { useQuery } from "@tanstack/react-query";

export type Summary = {
  totalCheckins: number;
  checkinsThisMonth: number;
  currentBelt: "white" | "blue" | "purple" | "brown" | "black";
};

export const useSummary = () => {
  return useQuery({
    queryKey: ["summary"],
    queryFn: async () => {
      const { data } = await httpClient.get<{ summary: Summary }>("/summary");
      return data.summary;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
