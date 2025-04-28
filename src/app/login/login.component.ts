import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { LoginService } from '../../app/login/service/login.service';
import { LoginModel } from '../login/models/login.model';
import { AuthService } from '../services/auth.service';  // Importe o AuthService

@Component({
  selector: 'app-login',
  imports: [
    LogoComponent,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: string = '';
  email: string = '';
  senha: string = '';
  erroEmail: string = '';
  erroSenha: string = '';

  constructor(private loginService: LoginService, private router: Router, private authService: AuthService) { }

  onLogin(): void {
    this.erroEmail = '';
    this.erroSenha = '';


    this.loginService.autenticar(this.email, this.senha).subscribe({
      next: (res: LoginModel) => {
        console.log(res)
        localStorage.setItem('usuario', JSON.stringify(res));
        this.router.navigate(['/grafico']);
        this.authService.setLoginStatus(true);
        const loginSucesso = this.authService.login(this.usuario, this.senha);

      },
      error: (err) => {
        console.log(err)
        if (err.error == 'Senha incorreta.') {
          this.erroSenha = 'Senha incorreta.';
        } else if (err.error == 'Usuário não encontrado.') {
          this.erroEmail = 'Usuário não encontrado.';
        } else {
          this.erroEmail = 'Credenciais inválidas ou usuário não encontrado';
        }
      }
    });
  }

}
