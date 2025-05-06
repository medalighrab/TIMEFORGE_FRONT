import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 🔥 Ignorer /api/ai/recommend
    if (req.url.includes('/api/ai/recommend')) {
      return next.handle(req);
    }

    // 🔥 Ajouter Authorization pour les autres requêtes
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
