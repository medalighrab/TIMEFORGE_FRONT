// task.model.ts
export interface Task {
    id?: number;
    name: string;
    description: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE'; 
    priority: number;
    startDate: Date;
    employee11:any[];
    deadline: Date;
  }
  