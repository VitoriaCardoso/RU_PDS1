import { Component} from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { CadastroService } from '../cadastro/service/cadastro.service'; 
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  // Importando o CommonModule
import { AuthService} from '../services/auth.service'

@Component({
  selector: 'app-cadastro',
  imports: [LogoComponent, FormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent{
  nome: string = '';
  email: string = '';
  senha: string = '';
  matric: string = '';
  curso: string = '';
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  nomeError: string = '';
  emailError: string = '';
  senhaError: string = '';
  matricError: string = '';
  cursoError: string = '';

  constructor(private usuarioService: CadastroService, private router: Router, private authService: AuthService) {
    console.log('Acessou a pagina')
  }

  onSubmit(): void {
    if (this.nome && this.email && this.senha && this.matric && this.curso) {
      const usuario = {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        matric: this.matric,
        curso: this.curso
      };

      this.usuarioService.criarUsuario(usuario).subscribe({
        next: (response) => {
          console.log('Usuário criado com sucesso!', response);
          this.router.navigate(['/login']); 
        },
        error: (error) => {
          console.error('Erro ao criar usuário:', error);
        }
      });
    } else {
      this.validateFields(); 
    }
  }

  validateFields(): void {
    this.nomeError = !this.nome ? 'Nome é obrigatório' : '';
    this.emailError = !this.email ? 'E-mail é obrigatório' : '';
    this.senhaError = !this.senha ? 'Senha é obrigatória' : '';
    this.matricError = !this.matric ? 'Matrícula é obrigatória' : '';
    this.cursoError = !this.matric ? 'Curso é obrigatório' : '';
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

}
