// ✅ Nouveau service complet pour toutes les fonctions IA Projet

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectEstimationService {

  private baseUrl = 'http://localhost:8089/projects';

  constructor(private http: HttpClient) { }

  // 🔥 Estimer la date de fin d'un projet
  estimateEndDate(projectId: number): Observable<{ estimated_end_date: string }> {
    return this.http.post<{ estimated_end_date: string }>(
      `${this.baseUrl}/${projectId}/estimate-end-date`,
      {}  // body vide car projectId est dans l'URL
    );
  }

  // 🔥 Suggérer une solution IA pour un projet
  suggestSolution(projectId: number): Observable<{ solution: string }> {
    return this.http.get<{ solution: string }>(
      `${this.baseUrl}/suggest-solution/${projectId}`
    );
  }

  // 🔥 Appliquer la solution IA si utilisateur accepte
  applySolution(projectId: number, apply: boolean): Observable<any> {
    return this.http.post(`${this.baseUrl}/apply-solution/${projectId}?apply=${apply}`, {});
  }
  
}