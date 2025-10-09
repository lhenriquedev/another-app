// types/class.types.ts

export interface IInstructor {
  id: string;
  name: string;
}

export interface ICategory {
  id: string;
  type: string;
}

export interface ICheckinsSummary {
  total: number;
  available: number;
}

export type ClassStatus = 'not-started' | 'finished' | 'in-progress';

export interface IClass {
  id: string;
  title: string;
  description: string | null;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  status: ClassStatus;
  instructor: IInstructor;
  category: ICategory;
  checkinsSummary: ICheckinsSummary;
}

export interface IPagination {
  hasMore: boolean;
  nextCursor: string | null;
  total: number;
}

export interface IClassesResponse {
  classes: IClass[];
  pagination: IPagination;
}

// Estrutura para agrupar por faixa horária
export interface IHourRangeGroup {
  hourRange: string;
  classes: IClass[];
}
