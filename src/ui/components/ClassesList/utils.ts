import { IClass, IHourRangeGroup } from './class.types';

export const getHourRange = (dateString: string): string => {
  const date = new Date(dateString);
  const hour = date.getHours();
  const nextHour = hour + 1;

  return `${hour.toString().padStart(2, '0')}-${nextHour.toString().padStart(2, '0')}`;
};

export const groupClassesByHourRange = (classes: IClass[]): IHourRangeGroup[] => {
  const byHourRange = classes.reduce<Record<string, IClass[]>>((acc, classItem) => {
    const hourRange = getHourRange(classItem.startTime);
    if (!acc[hourRange]) {
      acc[hourRange] = [];
    }
    acc[hourRange].push(classItem);
    return acc;
  }, {});

  return Object.entries(byHourRange)
    .map(([hourRange, classes]) => ({
      hourRange,
      classes: classes.sort((a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
      ),
    }))
    .sort((a, b) => {
      const hourA = parseInt(a.hourRange.split('-')[0]);
      const hourB = parseInt(b.hourRange.split('-')[0]);
      return hourA - hourB;
    });
};

export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
  });
};

export const getStatusLabel = (status: IClass['status']): string => {
  const labels: Record<IClass['status'], string> = {
    'in-progress': 'Em progresso',
    finished: 'Finalizada',
    'not-started': 'Não iniciou',
  };
  return labels[status];
};
