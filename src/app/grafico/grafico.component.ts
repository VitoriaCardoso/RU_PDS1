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
        this.valores = data
        console.log(data)
        this.criarGraficoDia(this.chart2.nativeElement);
        this.criarGraficoSemana(this.chart1.nativeElement);
      },
      (error) => {
        console.error('Erro ao buscar dados:', error);
      }
    )
  }

  criarGraficoDia(canvas: HTMLCanvasElement) {
    const labels = this.valores.map((item: any) => item.nome);
    const data = this.valores.map((item: any) => item.valor);
  
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
  
    const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];
  
    const nomeHoje = dias[diaSemanaHoje];
  
    const hojeData = this.valores.find((item: any) => item.nome === nomeHoje);
  
    const valorHoje = hojeData ? hojeData.valor : 0;
  
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
}