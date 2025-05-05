export interface ProjectComment {
    id: number;
    projectId: number;
    user?: {         // ⚡ user peut être optionnel au début
      id: number;
      username: string;
    };
    comment: string;
    createdAt: string; // ou Date
  }