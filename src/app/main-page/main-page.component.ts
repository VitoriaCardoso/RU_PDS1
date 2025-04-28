import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  presencaConfirmada = false;

  ngOnInit(): void {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      this.usuario = JSON.parse(usuarioSalvo);
    }
  }

  confirmarPresenca() {
    this.presencaConfirmada = true;
    alert('Presença confirmada no refeitório com sucesso!');
  }
}
