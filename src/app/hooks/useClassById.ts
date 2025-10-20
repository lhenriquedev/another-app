import { httpClient } from '@app/services/httpClient';
import { useQuery } from '@tanstack/react-query';
import { IClassDetails } from '@ui/components/ClassesList/class.types';

export const useClassById = (selectedClassId: string) => {
  return useQuery({
    queryKey: ['classe-by-id', selectedClassId],
    queryFn: async () => {
      const { data } = await httpClient.get<IClassDetails>(
        `/classes/${selectedClassId}`,
      );
      return data;
    },
    enabled: !!selectedClassId,
  });
};
