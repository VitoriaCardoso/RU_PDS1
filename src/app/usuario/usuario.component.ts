import { Component, OnInit } from '@angular/core';
import { LogoComponent } from '../logo/logo.component'
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-usuario',
  imports: [FormsModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario = {
    nome: '',
    email: '',
    senha: '',
    matricula: ''
  }

  constructor() { }

  ngOnInit(): void {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      this.usuario = JSON.parse(usuarioSalvo);
      console.log(this.usuario)
    }
  }
}
