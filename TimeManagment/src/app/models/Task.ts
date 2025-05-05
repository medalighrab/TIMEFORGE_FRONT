// task.model.ts
export interface Task {
  id?: number;
  name: string;
  description: string;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'BLOCKED';  
  startDate: string; // format: 'YYYY-MM-DD'
  deadline: string;  // format: 'YYYY-MM-DD'
  durationInDays: number;
  updatedAt: string; // format: 'YYYY-MM-DDTHH:mm:ss'
  estimatedHours: number;

  // Ajout de ces deux lignes :
  project?: {
    id: number;
    name?: string;
  };

  employee11?: {
    id: number;
    name: string;
  };
  
}

