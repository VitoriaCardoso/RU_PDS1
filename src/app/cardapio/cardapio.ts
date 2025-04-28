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
  detalhesAtivo: boolean = false;
  cardapio: CardapioModel[] = [];
  cardapioAgrupado: any[] = [];
  diaSelecionado: any = null;
  horarioSelecionado: any = { almoco: null, jantar: null };
  alunoId: number = 1; // Exemplo: Aluno logado com ID 123
  dataFrequencia: string = new Date().toISOString().split('T')[0]; // Data atual no formato YYYY-MM-DD

  constructor(private router: Router, private authService: AuthService, private cardapioService: CardapioService){
    this.cardapioService.getCardapio().subscribe(
      (data) => {
        this.cardapio = data;
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
    const dias: { [key: string]: { diaSemana: string; almoco: string | null; jantar: string | null } } = {};

    cardapio.forEach((item) => {
      if (!dias[item.diaSemana]) {
        dias[item.diaSemana] = { diaSemana: item.diaSemana, almoco: null, jantar: null };
      }
      if (item.tipoRefeicao === 'Almoço') {
        dias[item.diaSemana].almoco = item.descricao;
      } else if (item.tipoRefeicao === 'Jantar') {
        dias[item.diaSemana].jantar = item.descricao;
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
      this.diaSelecionado = this.cardapioAgrupado[index]; // <<< Aqui: pega da lista agrupada
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
    if (this.diaSelecionado && (this.horarioSelecionado.almoco || this.horarioSelecionado.jantar)) {
      const frequencia: FrequenciaModel = {
        aluno: 1,
        dia_semana: this.diaSelecionado.diaSemana, // Supondo que diaSemana seja um número (ex. 1 = Segunda-feira)
        horario: this.horarioSelecionado.almoco || this.horarioSelecionado.jantar, // Considera o horário de almoço ou jantar
        data_frequencia: this.dataFrequencia, // Data atual
      };

      this.cardapioService.salvarFrequencia(frequencia).subscribe(
        (response) => {
          console.log('Frequência salva com sucesso:', response);
          this.toggleDetalhes(null);
        },
        (error) => {
          console.error(error);
          console.error(this.alunoId)
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
