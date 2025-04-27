import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CadastroModel } from '../models/cadastro.model';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private apiUrl = 'http://localhost:8082/cadastro'; 

  constructor(private http: HttpClient) {}
  
  criarUsuario(usuario: CadastroModel): Observable<CadastroModel> {
    return this.http.post<CadastroModel>(this.apiUrl, usuario);
  }
}