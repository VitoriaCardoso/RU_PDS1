import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-cardapio',
  templateUrl: './cardapio.html',
  styleUrl: './cardapio.css'
})
export class ConsultaCardapioComponent {
  detalhesAtivo: boolean = false;
  diaSelecionado: any = null;
  horarioSelecionado: { almoco: string | null, jantar: string | null } = { almoco: null, jantar: null };

  cardapio = [
    { dia: 'Segunda', almoco: 'Arroz, Feijão, Frango Grelhado', jantar: 'Sopa de Legumes, Pão' },
    { dia: 'Terça', almoco: 'Macarrão ao Molho, Salada', jantar: 'Estrogonofe, Arroz' },
    { dia: 'Quarta', almoco: 'Risoto de Frango, Legumes', jantar: 'Pasta com Molho de Tomate' },
    { dia: 'Quinta', almoco: 'Feijoada, Arroz, Couve', jantar: 'Pizza' },
    { dia: 'Sexta', almoco: 'Peixe Grelhado, Purê de Batata', jantar: 'Sanduíche Natural' },
    { dia: 'Sábado', almoco: 'Frango à Parmegiana, Salada', jantar: 'Macarrão ao Molho Branco' },
    { dia: 'Domingo', almoco: 'Feijão Tropeiro, Arroz', jantar: 'Churrasco, Pão de Alho' }
  ];

  horarios = [
    { 
      dia: 'Segunda', 
      almoco: ['11:30 - 12:30', '12:30 - 13:30', '13:30 - 14:30'], 
      jantar: ['18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00'] 
    },
    { 
      dia: 'Terça', 
      almoco: ['11:30 - 12:30', '12:30 - 13:30', '13:30 - 14:30'], 
      jantar: ['18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00'] 
    },{ 
      dia: 'Quarta', 
      almoco: ['11:30 - 12:30', '12:30 - 13:30', '13:30 - 14:30'], 
      jantar: ['18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00'] 
    },
    { 
      dia: 'Quinta', 
      almoco: ['11:30 - 12:30', '12:30 - 13:30', '13:30 - 14:30'], 
      jantar: ['18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00'] 
    },{ 
      dia: 'Sexta', 
      almoco: ['11:30 - 12:30', '12:30 - 13:30', '13:30 - 14:30'], 
      jantar: ['18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00'] 
    },
    { 
      dia: 'Sabado', 
      almoco: ['11:30 - 12:30', '12:30 - 13:30', '13:30 - 14:30'], 
      jantar: ['18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00'] 
    },
    { 
      dia: 'Domingo', 
      almoco: ['11:30 - 12:30', '12:30 - 13:30', '13:30 - 14:30'], 
      jantar: ['18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00'] 
    },
  ];

  toggleDetalhes(index: number | null) {
    if (index !== null) {
      this.diaSelecionado = this.horarios[index];
      this.horarioSelecionado = { almoco: null, jantar: null }; // Resetar seleção
      this.detalhesAtivo = true;
    } else {
      this.detalhesAtivo = false;
      this.diaSelecionado = null;
    }
  }

  getHorariosAlmoco(): string[] {
    return this.diaSelecionado?.almoco || [];
  }

  getHorariosJantar(): string[] {
    return this.diaSelecionado?.jantar || [];
  }

  selecionarHorario(tipo: 'almoco' | 'jantar', horario: string) {
    this.horarioSelecionado[tipo] = this.horarioSelecionado[tipo] === horario ? null : horario;
  }

  confirmarHorarios() {
    if (this.horarioSelecionado.almoco || this.horarioSelecionado.jantar) {
      alert(`Horários confirmados para ${this.diaSelecionado.dia}:
            ${this.horarioSelecionado.almoco ? '\nAlmoço: ' + this.horarioSelecionado.almoco : ''}
            ${this.horarioSelecionado.jantar ? '\nJantar: ' + this.horarioSelecionado.jantar : ''}`);
      // Aqui você pode adicionar lógica para salvar no banco de dados ou fazer outra ação
    }
  }

  isDetalheAtivo(): boolean {
    return this.detalhesAtivo;
  }
}
