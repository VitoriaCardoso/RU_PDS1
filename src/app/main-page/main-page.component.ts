import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterModule, LogoComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  usuario = {
    nome: '',
    matric: '',
    curso: ''
  };

  constructor(private authService: AuthService, private router: Router) {} // Injetar AuthService e Router

  ngOnInit(): void {
    if (!this.authService.checkLoginStatus()) {
      this.router.navigate(['/grafico']);
    }

    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      this.usuario = JSON.parse(usuarioSalvo);
    }
  }
}
