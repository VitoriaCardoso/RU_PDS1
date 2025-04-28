import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { LogoComponent } from '../logo/logo.component'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { CadastroService } from '../cadastro/service/cadastro.service'; 

@Component({
  selector: 'app-usuario',
  imports: [CommonModule, LogoComponent, FormsModule, RouterModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario = {
    id: 0,
    nome: '',
    email: '',
    senha: '',
    matric: '',
    curso: '',
  }
  id!: number;
  msgSuccess: string = '';
  msgFail: string = ''

  constructor(private router: Router,private route: ActivatedRoute, private authService: AuthService, private cadastroService: CadastroService) {
    if (!this.authService.checkLoginStatus()) {
      this.router.navigate(['/index']);
    }
  }

  ngOnInit(): void {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      this.usuario = JSON.parse(usuarioSalvo);
      this.id = this.usuario.id
    }
  }

  editarUsuario(): void {
    this.msgSuccess = '';
    this.cadastroService.editarUsuario(this.id, this.usuario).subscribe(
      (response) => {
        // console.log('Usuário atualizado com sucesso:', response);
        localStorage.setItem('usuario', JSON.stringify(response));
        this.router.navigate(['/cadastro/editar_usuario']);
        this.msgSuccess = 'Usuário editado com sucesso!';
      },
      (error) => {
        this.msgFail = 'Erro ao atualizao usuário';
        // console.error('Erro ao atualizar usuário:', error);
      }
    );
  }
}
