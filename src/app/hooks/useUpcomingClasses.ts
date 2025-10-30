import { httpClient } from '@app/services/httpClient';
import { useQuery } from '@tanstack/react-query';

export type IUpcomingClasses = {
  id: string
  title: string
  description?: string
  capacity: number
  date: string
  startTime: string
  endTIme: string
  instructor: string
  category: string
}

export const useUpcomingClasses = () => {
  return useQuery({
    queryKey: ['upcoming-classes'],
    queryFn: async () => {
      const { data } = await httpClient.get<{ upcomingClasses: IUpcomingClasses[] }>(
        '/upcoming-classes',
      );
      return data.upcomingClasses;
    },
  });
};
