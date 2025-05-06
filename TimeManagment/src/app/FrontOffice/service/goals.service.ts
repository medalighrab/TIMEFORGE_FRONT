import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, of } from 'rxjs';  // Ajoute ces imports


@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  private apiUrl            = 'http://localhost:8089/api/goals';
  private translationApiUrl = 'http://localhost:8089/api/translate';

  constructor(private http: HttpClient) { }

  // Récupérer tous les objectifs
  getAllGoals(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Supprimer un objectif
  deleteGoal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Récupérer les objectifs par tâche
  getgoalbytaskid(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/taksbygoals`);
  }

  // Activer/désactiver le mode chronique
  GoalActivChronics(id: any, active: boolean): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8089/api/health-reminders/${id}/chronic/${active}`,
      null
    );
  }

  // —————— PARTIE TRADUCTION ——————
/**
 * Envoie le texte à traduire, extrait la chaîne traduite et la renvoie.
 */
translateGoalText(text: string, fromLang: string = 'en', toLang: string = 'fr'): Observable<string> {
  const body = { text, from: fromLang, to: toLang };
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http
    .post<any>(this.translationApiUrl, body, { headers })
    .pipe(
      map(response => {
        console.log('Réponse brute traduction ▶', response);

        // Cas standard { translatedText: "..." }
        if (typeof response === 'object' && response.translatedText) {
          return response.translatedText;
        }

        // Cas Microsoft-style: [{ translations: [{ text: "..." }] }]
        if (
          Array.isArray(response) &&
          response.length > 0 &&
          response[0]?.translations?.[0]?.text
        ) {
          return response[0].translations[0].text;
        }

        // Cas { text: "Bonjour" }
        if (typeof response === 'object' && response.text) {
          return response.text;
        }

        // Par défaut, renvoyer une erreur lisible
        throw new Error('Format de réponse inconnu : ' + JSON.stringify(response));
      }),
      catchError(error => {
        console.error('Erreur dans la traduction :', error);
        return of('Erreur lors de la traduction.');
      })
    );
}
}
