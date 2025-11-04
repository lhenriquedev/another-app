import { httpClient } from "@app/services/httpClient";
import { useQuery } from "@tanstack/react-query";

export type Ranking = {
  userId: string;
  userName: string;
  totalCheckins: number;
  position: number;
  avatar: string;
};

export const useRanking = () => {
  return useQuery({
    queryKey: ["ranking"],
    queryFn: async () => {
      const { data } = await httpClient.get<{ ranking: Ranking[] }>("/ranking");
      return data.ranking;
    },
  });
};
