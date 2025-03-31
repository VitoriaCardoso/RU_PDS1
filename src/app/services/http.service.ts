import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=CASH3&apikey=YY7U85B7IH776KIJ')
  }
}
