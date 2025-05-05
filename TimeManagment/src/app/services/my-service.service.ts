import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';
import { User } from '../models/User';
import { ProjectComment } from '../models/ProjectComment';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  private baseUrl = 'http://localhost:8089';

  constructor(private http: HttpClient) {}
// Authentication APIs

uploadFile(projectId: number, file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file, file.name);
  
  return this.http.post(`${this.baseUrl}/${projectId}/uploadFile`, formData);
}


// Project Management APIs
createProject(project: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/projects/create`, project);
}

getAllProjects(): Observable<any> {
  return this.http.get(`${this.baseUrl}/projects/list`);
}

getProjectById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/projects/${id}`);
}

updateProject(id: number, projectDetails: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/projects/update/${id}`, projectDetails);
}

deleteProject(projectid: number) {
  return this.http.delete('http://localhost:8089/projects/api/delete/' + projectid, { responseType: 'text' });
}


assignProjectToUser(userId: number, projectId: number): Observable<any> {
  return this.http.post(`${this.baseUrl}/projects/assign`, null, {
    params: { userId, projectId }
  });
}
// ✅ Récupérer les commentaires d'un projet
getCommentsByProject(projectId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/project/${projectId}`);
}
addCommentToProject(projectId: number, userId: number, commentText: string): Observable<any> {
  const params = { commentText };

  return this.http.post<any>(
    `http://localhost:8089/comments/affecter/${projectId}/${userId}`,
    null, // body null
    { params }
  );
}



addAndAssignTask(task: Task, userId: number, projectId: number): Observable<Task> {
  const url = `${this.baseUrl}/add-with-assign/${userId}/${projectId}`;
  return this.http.post<Task>(url, task);
}
  // ✅ Créer un commentaire
  createComment(projectId: number, commentData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/comments/${projectId}`, commentData);
  }
  getTasksByProjectId(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks/project/${projectId}`);
  }
  
  getUsersByProjectId(projectId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/projects/by-project/${projectId}`);
  }

getUpcomingDeadlines(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/projects/upcoming-deadlines`);
}

}