import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FrequenciaService {
  private apiUrl = environment.apiUrl + '/grafico'; // ajuste a URL conforme seu backend

  constructor(private http: HttpClient) {}

  graficoPorSemana(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
