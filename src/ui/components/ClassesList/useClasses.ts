import { httpClient } from '@app/services/httpClient';
import { useQuery } from '@tanstack/react-query';
import { IClass } from './class.types';

interface IClassesParams {
  date?: string
  categoryId?: string
  status?: 'not-started' | 'in-progress' | 'finished'
  limit?: number
  order?: 'asc' | 'desc'
}

export const useClasses = (params: IClassesParams = {}) => {
  const { date, categoryId, status, limit = 20, order = 'asc' } = params;

  return useQuery({
    queryKey: ['classes', date, categoryId, status, limit, order],
    queryFn: async () => {
      const { data } = await httpClient.get<{ classes: IClass[] }>('/classes', {
        params: {
          ...(date && { date }),
          ...(categoryId && { categoryId }),
          ...(status && { status }),
          limit,
          order,
        },
      });

      return data.classes;
    },
    enabled: !!date,
  });
};
