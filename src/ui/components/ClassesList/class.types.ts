// Tipos base
export type ClassStatus = 'not-started' | 'finished' | 'in-progress';
export type CheckinStatus = 'done' | 'cancelled';
export type Belt = 'white' | 'blue' | 'purple' | 'brown' | 'black';

// Instrutor
export interface IInstructor {
  id: string;
  name: string;
  belt?: Belt;
}

// Categoria
export interface ICategory {
  id: string;
  type: string;
}

// Checkin
export interface ICheckin {
  id: string;
  status: CheckinStatus;
  createdAt: string;
  completedAt: string | null;
}

// Estudante/Aluno
export interface IStudent {
  id: string;
  name: string;
  email: string;
  belt: Belt;
  checkin?: ICheckin;
}

// Estatísticas da aula
export interface IClassStatistics {
  totalCheckins: number;
  completedCheckins: number;
  cancelledCheckins: number;
  availableSpots: number;
  occupancyRate: number;
}

// Resumo de checkins (para listagem)
export interface ICheckinsSummary {
  total: number;
  available: number;
}

// Aula básica (para listagem)
export interface IClass {
  id: string;
  title: string | null;
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

// Aula com detalhes completos (para modal/detalhes)
export interface IClassDetails extends Omit<IClass, 'checkinsSummary'> {
  students: IStudent[];
  statistics: IClassStatistics;
}

// Response da API de listagem
export interface IPagination {
  hasMore: boolean;
  nextCursor: string | null;
  total: number;
}

export interface IClassesResponse {
  classes: IClass[];
  pagination: IPagination;
}

// Response da API de detalhes
export interface IClassDetailsResponse {
  class: IClassDetails;
}

// Para agrupar por faixa horária
export interface IHourRangeGroup {
  hourRange: string;
  classes: IClass[];
}
