import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CardapioModel } from '../cardapio/models/cardapio.model'; 
import { CardapioService } from '../cardapio/service/cardapio.service';
import { FrequenciaModel } from '../cardapio/models/frequencia.model';

@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-cardapio',
  templateUrl: './cardapio.html',
  styleUrl: './cardapio.css'
})
export class ConsultaCardapioComponent {
  usuario = {
    id: 0,
    nome: '',
    email: '',
    senha: '',
    matric: '',
    curso: '',
  }
  votoFeito: boolean = false;
  detalhesAtivo: boolean = false;
  cardapio: CardapioModel[] = [];
  cardapioAgrupado: any[] = [];
  diaSelecionado: any = null;
  horarioSelecionado: any = { almoco: null, jantar: null };
  alunoId: number = 0;
  dataFrequencia: string = new Date().toISOString().split('T')[0]; 
  erroSalvar: string = '';


  constructor(private router: Router, private authService: AuthService, private cardapioService: CardapioService){
    const votoStatus = localStorage.getItem('votoFeito');
    if (votoStatus === 'true') {
      this.votoFeito = true;
    }
    
    if (!this.authService.checkLoginStatus()) {
      this.router.navigate(['/index']);
    }

    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      this.usuario = JSON.parse(usuarioSalvo);
      this.alunoId = this.usuario.id
      console.log(this.alunoId)
    }

    
    this.cardapioService.getCardapio().subscribe(
      (data) => {
        this.cardapio = data;
        console.log(data)
        this.cardapioAgrupado = this.agruparPorDia(data);
        console.log(this.cardapioAgrupado);
      },
      (error) => {
        console.error('Erro ao carregar o cardápio:', error);
      }
    );

    if (!this.authService.checkLoginStatus()) {
      this.router.navigate(['/index']);
    }
  }

  agruparPorDia(cardapio: CardapioModel[]): any[] {
    const dias: { [key: number]: { diaSemana: number; almoco: string | null; jantar: string | null } } = {};

    console.log(dias)
  
    const diasDaSemana: { [key: string]: number } = {
      'Segunda': 1,
      'Terça': 2,
      'Quarta': 3,
      'Quinta': 4,
      'Sexta': 5,
      'Sábado': 6,
      'Domingo': 7,
    };
  
    cardapio.forEach((item) => {
      const diaSemana = diasDaSemana[item.diaSemana]; // Mapear o nome para o número
      const nomeDia = Object.keys(diasDaSemana).find(key => diasDaSemana[key] === item.diaSemana); // Mapeia o número para o nome do dia

      console.log(diasDaSemana)
  
      if (!dias[diaSemana]) {
        dias[diaSemana] = { diaSemana, almoco: null, jantar: null };
      }
  
      if (item.tipoRefeicao === 'Almoço') {
        dias[diaSemana].almoco = item.descricao;
      } else if (item.tipoRefeicao === 'Jantar') {
        dias[diaSemana].jantar = item.descricao;
      }
    });
  
    return Object.values(dias);
  }
  

  toggleDetalhes(index: number | null): void {
    if (index === null) {
      this.detalhesAtivo = false;
      this.diaSelecionado = null;
    } else {
      this.detalhesAtivo = true;
      this.diaSelecionado = this.cardapioAgrupado[index];
    }
  }

  getHorariosAlmoco(): string[] {
    return ['12:00', '12:30', '13:00', '13:30', 'Não irei Almoçar!'];
  }

  getHorariosJantar(): string[] {
    return ['18:00', '18:30', '19:00', '19:30', 'Não irei Jantar!']; 
  }

  selecionarHorario(tipo: string, horario: string): void {
    this.horarioSelecionado[tipo] = horario;
  }

  confirmarHorarios(): void {
    this.erroSalvar = '';
    console.log('Aluno ID:', this.alunoId); 
  
    if (!this.alunoId) {
      alert('ID do aluno não encontrado.');
      return;
    }
    
    if (this.diaSelecionado && (this.horarioSelecionado.almoco || this.horarioSelecionado.jantar)) {
      const frequencia: FrequenciaModel = {
        aluno: this.alunoId ,
        dia_semana: this.diaSelecionado.diaSemana,
        horario: this.horarioSelecionado.almoco || this.horarioSelecionado.jantar,
        data_frequencia: this.dataFrequencia,
      };
  
      this.cardapioService.salvarFrequencia(frequencia).subscribe(
        (response) => {
          console.log('Frequência salva com sucesso:', response);
          this.toggleDetalhes(null);
          this.votoFeito = true;
          localStorage.setItem('votoFeito', 'true');
        },
        (error) => {
          console.error('Erro ao salvar a frequência:', error);
          if (error.status === 400 || error.status === 409) {
            const mensagem = typeof error.error === 'string' ? error.error : error.error.message;
            alert(mensagem || 'Você já votou esse dia!');
          } else {
            alert('Você já votou esse dia!');
          }
        }        
      );
    } else {
      alert('Selecione ao menos um horário de almoço ou jantar.');
    }
  }

  isDetalheAtivo(): boolean {
    return this.detalhesAtivo;
  }
}
