import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-pagina-not-found',
  imports: [],
  templateUrl: './pagina-not-found.component.html',
  styleUrl: './pagina-not-found.component.css'
})
export class PaginaNotFoundComponent {
  data: any;

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.http.getData().subscribe({
      next: (response) => {
        console.log('API Response:', response.symbol + 'Valor: ' + response.price);
        this.data = response;
      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });
  }
}
