import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartEvent, registerables } from 'chart.js/auto';
import { FrequenciaService } from './service/grafico.service'; 

@Component({
  selector: 'app-grafico',
  imports: [],
  templateUrl: './grafico.html',
  styleUrl: './grafico.css'
})
export class ConsultaGraficoComponent implements AfterViewInit {
  @ViewChild('chart1') chart1!: ElementRef;
  @ViewChild('chart2') chart2!: ElementRef;
  valores: any;

  constructor(private frequenciaService: FrequenciaService) {
    Chart.register(...registerables);

  }

  ngAfterViewInit() {
    this.frequenciaService.graficoPorSemana().subscribe(
      (data) => {
        this.valores = data;
        console.log("Estrutura dos dados:", this.valores);
        this.criarGraficoDia(this.chart2.nativeElement);
      },
      (error) => {
        console.error('Erro ao buscar dados:', error);
      }
    )
    this.frequenciaService.contarFrequenciasPorDiaSemanaEHorario().subscribe(
      (data) => {
        this.valores = data;
        console.log("Estrutura dos dados:", this.valores);
        this.criarGraficoSemanaJantaAlmoco(this.chart1.nativeElement)
      },
      (error) => {
        console.error('Erro ao buscar dados:', error);
      }
    )
  }

  criarGraficoDia(canvas: HTMLCanvasElement) {
  const labels = this.valores.map((item: any) => item[0]);
  const data = this.valores.map((item: any) => item[1]);
  
  console.log(labels);
  console.log(data);
  
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Quantidade de Alunos',
            data: data,
            borderColor: '#008c9e',
            fill: false
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });
  }  

  criarGraficoSemana(canvas: HTMLCanvasElement) {
    const diaSemanaHoje = new Date().getDay(); 
    const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const nomeHoje = dias[diaSemanaHoje];
  
    const hojeData = this.valores.find((item: any) => item[0] === nomeHoje);  
  
    console.log(hojeData);
  
    const valorHoje = hojeData ? hojeData[1] : 0; 
  
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: [nomeHoje],
        datasets: [{
          label: 'Quantidade de Alunos',
          data: [valorHoje],
          backgroundColor: '#b1e6d1',
          borderColor: '#005f6b',
          borderWidth: 2.5,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });
  }

  criarGraficoSemanaJantaAlmoco(canvas: HTMLCanvasElement) {
    const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const diaSemanaHoje = new Date().getDay();
  const nomeHoje = dias[diaSemanaHoje];

  console.log('Hoje é', nomeHoje, `(número: ${diaSemanaHoje})`);

  const almocoData = this.valores.find((item: any) => item[0] === 'Almoço' && Number(item[1]) === diaSemanaHoje);
  const jantarData = this.valores.find((item: any) => item[0] === 'Jantar' && Number(item[1]) === diaSemanaHoje);

  const valorAlmoco = almocoData ? Math.round(Number(almocoData[3])) : 0;
  const valorJantar = jantarData ? Math.round(Number(jantarData[3])) : 0;

  console.log('Valor almoço hoje:', valorAlmoco);
  console.log('Valor jantar hoje:', valorJantar);

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['Almoço', 'Jantar'],
      datasets: [{
        label: `Quantidade de Alunos (${nomeHoje})`,
        data: [valorAlmoco, valorJantar],
        backgroundColor: ['#b1e6d1', '#f7c59f'],
        borderColor: ['#005f6b', '#c97c5d'],
        borderWidth: 2.5,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        y: {
          ticks: {
            callback: function(value: any) {
              if (Number.isInteger(value)) {
                return value;
              }
              return null;
            }
          }
        }
      }
    }
  });
}
}