import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avaliacao',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './avaliacao.html',
  styleUrl: './avaliacao.css'
})
export class ConsultaAvaliacaoComponent {
  nota: number = 1;
  comentarios: string = '';
  mensagem: string = '';
  erro: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const usuarioId = localStorage.getItem('usuarioId'); // Assumindo que o ID do usuário está armazenado no localStorage após o login
    
    if (!usuarioId) {
      this.erro = 'Usuário não está logado';
      return;
    }

    this.http.post('http://localhost:8080/avaliacao', null, {
      params: {
        usuarioId: usuarioId,
        nota: this.nota.toString(),
        comentarios: this.comentarios
      }
    }).subscribe({
      next: () => {
        this.mensagem = 'Avaliação enviada com sucesso!';
        this.erro = '';
        this.nota = 1;
        this.comentarios = '';
      },
      error: (error) => {
        this.erro = 'Erro ao enviar avaliação: ' + error.message;
        this.mensagem = '';
      }
    });
  }
}
