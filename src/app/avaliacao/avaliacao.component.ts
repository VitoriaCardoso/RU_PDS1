import { Component, OnInit } from '@angular/core';
import { AvaliacaoService } from '../avaliacao/service/avaliacao.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-avaliacao',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './avaliacao.html',
  styleUrls: ['./avaliacao.css']
})
export class ConsultaAvaliacaoComponent implements OnInit {

  usuario = {
    nome: '',
    matric: '',
    curso: ''
  };

  nota: number = 1;
  comentarios: string = '';
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(
    private avaliacaoService: AvaliacaoService,
    private router: Router,
    private authService: AuthService
  ) {
    // Se o usuário não estiver logado, redireciona para login
    if (!this.authService.checkLoginStatus()) {
      this.router.navigate(['/index']);
    }
  }

  ngOnInit(): void {
    // Recupera o usuário do localStorage
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      this.usuario = JSON.parse(usuarioSalvo);
      console.log('Usuário carregado:', this.usuario);
    }
  }

  onSubmit(): void {
    const matricula = this.usuario.matric; // Coleta a matrícula do usuário

    // Verifica se nota e comentário foram preenchidos corretamente
    if (!this.nota || this.comentarios.trim() === '') {
      this.mensagemErro = 'Campos obrigatórios não preenchidos.';
      this.mensagemSucesso = '';
      return;
    }

    // Chama o serviço para salvar a avaliação
    this.avaliacaoService
      .salvarAvaliacao(matricula, this.nota, this.comentarios)
      .subscribe({
        next: () => {
          this.mensagemSucesso = 'Avaliação enviada com sucesso!';
          this.mensagemErro = '';
          // Limpa o formulário
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
