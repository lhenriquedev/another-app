import { httpClient } from '@app/services/httpClient';
import { useQuery } from '@tanstack/react-query';
type RecentClass = {
  id: string
  date: string
  startTime: string
  categoryType: string
}

export const useRecentClasses = () => {
  return useQuery({
    queryKey: ['recent-classes'],
    queryFn: async () => {
      const { data } = await httpClient.get<{ classes: RecentClass[] }>(
        '/get-recent-classes',
      );
      return data.classes;
    },
  });
};
