import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvaliacaoModel } from '../models/avaliacao.model'


@Injectable({
  providedIn: 'root'
})

export class AvaliacaoService {
  private apiUrl = 'http://localhost:8082/avaliacao'; 


  constructor(private http: HttpClient) { }

  getAllAvaliacoes(): Observable<AvaliacaoModel[]> {
    return this.http.get<AvaliacaoModel[]>(this.apiUrl);
  }

  salvarAvaliacao(usuarioId: number, nota: number, comentarios: string) {
    const body = {
      nota,
      comentarios,
      usuario: {
        id: usuarioId
      }
    };
    return this.http.post<AvaliacaoModel>(`${this.apiUrl}`, body);
  }
  
  getAvaliacaoById(id: number): Observable<AvaliacaoModel> {
    return this.http.get<AvaliacaoModel>(`${this.apiUrl}/${id}`);
  }

  
  deleteAvaliacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
