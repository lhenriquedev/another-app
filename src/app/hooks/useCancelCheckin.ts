import { httpClient } from '@app/services/httpClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCancelCheckin = (selectedClassId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!selectedClassId) { throw new Error('Classe inválida'); }

      const { data } = await httpClient.patch('/cancel-checkin', {
        classId: selectedClassId,
      });

      return data;
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['classe-by-id', selectedClassId],
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
