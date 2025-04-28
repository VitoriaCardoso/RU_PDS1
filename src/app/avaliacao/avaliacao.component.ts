import { Component } from '@angular/core';
import { AvaliacaoService } from '../avaliacao/service/avaliacao.service';
import { AvaliacaoModel } from '../avaliacao/models/avaliacao.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { UsuarioComponent } from '../usuario/usuario.component';

@Component({
  selector: 'app-avaliacao',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './avaliacao.html',
  styleUrl: './avaliacao.css'
})
export class ConsultaAvaliacaoComponent {

  avaliacao = {
    id: 0,
    nota: 0,
    comentario: '',
    usuario: 0
  }

  nota: number = 1;
  comentarios: string = '';
  usuarioId: any;
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor( private avaliacaoService: AvaliacaoService, private router: Router,private authService: AuthService) {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.usuarioId = JSON.parse(usuario);
      console.log(this.usuarioId);
    }

    if (!this.authService.checkLoginStatus()) {
      this.router.navigate(['/grafico']);
    }
    
  }

  onSubmit(): void {
    if (!this.usuarioId) {
      this.mensagemErro = 'Usuário não identificado. Faça login.';
      return;
    }

    const avaliacao: AvaliacaoModel = {
      id: 0, // Deixa 0, o backend vai gerar o ID
      nota: this.nota,
      comentarios: this.comentarios,
      usuario: this.usuarioId
    };

    this.avaliacaoService.salvarAvaliacaocerto(avaliacao).subscribe({
      next: (res) => {
        this.mensagemSucesso = 'Avaliação enviada com sucesso!';
        this.mensagemErro = '';
        this.nota = 1;
        this.comentarios = '';
      },
      error: (err) => {
        console.error(err);
        this.mensagemErro = 'Erro ao enviar avaliação.';
        this.mensagemSucesso = '';
      }
    });
  }
}