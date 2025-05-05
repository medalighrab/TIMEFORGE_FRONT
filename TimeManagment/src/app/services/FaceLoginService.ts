import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaceLoginService {

  private API_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  registerFace(username: string, imageBase64: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register-face`, {
      username: username,
      image: imageBase64
    });
  }

  extractPassword(imageBase64: string): Observable<any> {
    return this.http.post(`${this.API_URL}/extract-password`, {
      image: imageBase64
    });
  }
}
