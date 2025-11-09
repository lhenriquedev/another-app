import { User } from "@app/contexts/AuthContext";
import { httpClient } from "@app/services/httpClient";
import { useQuery } from "@tanstack/react-query";

interface IUseProfileParams {
  enabled?: boolean;
}

export function useProfile(params?: IUseProfileParams) {
  const { data, refetch } = useQuery({
    enabled: params?.enabled ?? true,
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await httpClient.get<{ user: User }>("/me");
      return data;
    },
    staleTime: Infinity,
  });

  return { user: data?.user, loadProfile: refetch };
}
