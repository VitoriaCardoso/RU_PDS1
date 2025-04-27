import { Component } from '@angular/core';
import { AvaliacaoService } from '../avaliacao/service/avaliacao.service';
import { AvaliacaoModel } from '../avaliacao/models/avaliacao.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avaliacao',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './avaliacao.html',
  styleUrl: './avaliacao.css'
})
export class ConsultaAvaliacaoComponent {

  nota: number = 1;
  comentarios: string = '';
  usuarioId: number;
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(private avaliacaoService: AvaliacaoService) {
    const id = localStorage.getItem('usuarioId');
    this.usuarioId = id ? parseInt(id, 10) : 0; 
  }

  onSubmit(): void {
    if (!this.usuarioId) {
      this.mensagemErro = 'Usuário não identificado. Faça login.';
      return;
    }
  
    this.avaliacaoService
    .salvarAvaliacao(this.usuarioId, this.nota, this.comentarios)
      .subscribe({
        next: (res) => {
          this.mensagemSucesso = 'Avaliação enviada com sucesso!';
          this.mensagemErro = '';
          this.nota = 1;
          this.comentarios = '';
        },
        error: (err) => {
          console.log(this.usuarioId, this.nota);
          console.error(err);
          this.mensagemErro = 'Erro ao enviar avaliação.';
          this.mensagemSucesso = '';
        },
      });
    }
}
