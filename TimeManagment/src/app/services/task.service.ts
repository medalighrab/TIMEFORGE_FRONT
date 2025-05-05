// task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8089/tasks';

  constructor(private http: HttpClient) {}

  addTask(task: Task, id: number,idemp:number,lead:number): Observable<Task> {
  
    return this.http.post<Task>(`${this.apiUrl}?id=${id}&employeeid=${idemp}&lead=${lead}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`);
  }

  updateTask(id: number, updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, updatedTask);
  }
  updateTaskstatus(id: number, updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/status/${id}`, updatedTask,{responseType:'text' as 'json'});
  }
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }
  getallTaskByuser(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasksbyuser/${id}`);
  }
  getallprojetByuser(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projetsbyuser/${id}`);
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/all`);
  }
  getAllprojetc(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/allproject`);
  }
  getallUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/allUsers`);
  }





  ///////////////  oun function////////
  // New methods for task assignment and status filtering
  affectTaskToUserAndProject(taskId: number, userId: number, projectId: number): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/affect/${taskId}/user/${userId}/project/${projectId}`, null);
  }

  reassignTaskToUserAndProject(taskId: number, userId: number, projectId: number): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/reassign/${taskId}/user/${userId}/project/${projectId}`, null);
  }

  getBacklogTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/backlog`);
  }

  getTodoTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/todo`);
  }

  getInProgressTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/inprogress`);
  }

  getDoneTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/done`);
  }
  getTaskCountByProject(projectId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/project/${projectId}`);
  }
  
  getTaskCountByUser(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/user/${userId}`);
  }

  
addAndAssignTask(task: Task, userId: number, projectId: number): Observable<Task> {
  const url = `${this.apiUrl}/add-with-assign/${userId}/${projectId}`;
  return this.http.post<Task>(url, task);
}
}