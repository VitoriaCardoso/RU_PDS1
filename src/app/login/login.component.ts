import { Component } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LogoComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  mensagem: string = '';
  erro: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log('Tentando fazer login com:', { email: this.email, senha: this.senha });
    
    this.http.post('http://localhost:8080/login/auth', {
      email: this.email,
      senha: this.senha
    }).subscribe({
      next: (response: any) => {
        console.log('Login bem sucedido:', response);
        localStorage.setItem('usuarioId', response.id);
        localStorage.setItem('usuarioNome', response.nome);
        this.router.navigate(['/avaliacao']);
      },
      error: (error) => {
        console.error('Erro no login:', error);
        this.erro = 'Email ou senha incorretos';
      }
    });
  }
}
