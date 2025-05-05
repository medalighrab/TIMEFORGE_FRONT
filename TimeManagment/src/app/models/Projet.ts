import { Task } from "./Task";

export interface Project {
    projectid: number;
    name: string | null;
    description: string | null;
    deadline: Date | null;
    
    taskss: Task[];
  }