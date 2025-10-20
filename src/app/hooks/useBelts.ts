import { httpClient } from '@app/services/httpClient';
import { useQuery } from '@tanstack/react-query';

export const BELTS = {
  white: 'Branca',
  blue: 'Azul',
  purple: 'Roxa',
  brown: 'Marrom',
  black: 'Preta',
} as const;

export type BeltType = keyof typeof BELTS;

type Belt = {
  id: string
  belt: BeltType
}

export const useBelts = () => {
  return useQuery({
    queryKey: ['belts'],
    queryFn: async () => {
      const { data } = await httpClient.get<{ belts: Belt[] }>('/belts');
      return data.belts;
    },
  });
};
