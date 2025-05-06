export interface TimeTracker {
  id?: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  completed: boolean;
  user?: any; // selon ton projet
  technique?: any; // selon ton projet
  startTime?: string; // ou LocalTime -> string ici
  creationDate?: string; // LocalDate -> string
  priority?: string; // 👈 AJOUTER ICI
}
