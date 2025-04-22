import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrequenciaService {
  private apiUrl = 'http://localhost:8082/frequencias'; // ajuste a URL conforme seu backend

  constructor(private http: HttpClient) {}

  graficoPorDia(diaSemana: string): Observable<any[]> {
    const params = new HttpParams().set('diaSemana', diaSemana);
    return this.http.get<any[]>(`${this.apiUrl}/grafico`, { params });
  }

  graficoPorSemana(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/grafico`);
  }
}
