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
    return this.http.post<FrequenciaModel>(this.apiUrl, frequencia);
  }

  salvarFrequencia2(frequencia: FrequenciaModel): Observable<FrequenciaModel> {
    return this.http.post<FrequenciaModel>(this.apiUrl, frequencia);
  }

  verificarFrequenciaExistente(alunoId: number, diaSemana: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verificar/${alunoId}/${diaSemana}`);
  }

  atualizarFrequencia(frequencia: FrequenciaModel): Observable<FrequenciaModel> {
    return this.http.put<FrequenciaModel>(`${this.apiUrl}`, frequencia);
  }
}
