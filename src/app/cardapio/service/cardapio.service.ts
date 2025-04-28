import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardapioModel } from '../models/cardapio.model'; 
import { FrequenciaModel } from '../models/frequencia.model'; 

@Injectable({
  providedIn: 'root'
})
export class CardapioService {
  private apiUrl = 'http://localhost:8082/cardapio';

  constructor(private http: HttpClient) {}

  getCardapio(): Observable<CardapioModel[]> {
    return this.http.get<CardapioModel[]>(this.apiUrl); 
  }
  
  salvarFrequencia(frequencia: FrequenciaModel): Observable<FrequenciaModel> {
    const params = new HttpParams()
      .set('aluno', frequencia.aluno.toString())
      .set('dia_semana', frequencia.dia_semana.toString())
      .set('horario', frequencia.horario)
      .set('data_frequencia', frequencia.data_frequencia);

    return this.http.post<FrequenciaModel>(`${this.apiUrl}`, { params });

    
  }
}
