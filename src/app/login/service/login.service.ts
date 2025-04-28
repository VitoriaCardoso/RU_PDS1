import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl + '/login'; 

  constructor(private http: HttpClient) {}
  
  autenticar(email: string, senha: string): Observable<LoginModel> {
      return this.http.post<LoginModel>(this.apiUrl, { email, senha });
  }
}
 