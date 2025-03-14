import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import { Chart, ChartConfiguration, ChartData, ChartEvent, registerables } from 'chart.js/auto';

@Component({
  selector: 'app-grafico',
  imports: [],
  templateUrl: './grafico.html',
  styleUrl: './grafico.css'
})
export class ConsultaGraficoComponent implements AfterViewInit {
  @ViewChild('chart1') chart1!: ElementRef;
  @ViewChild('chart2') chart2!: ElementRef;

  ngAfterViewInit() {
    this.criarGraficoDia(this.chart2.nativeElement);
    this.criarGraficoSemana(this.chart1.nativeElement);
  }

  criarGraficoDia(canvas: HTMLCanvasElement) {
    new Chart(canvas, {
    type: 'line',
      data: {
        labels: ['Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
        datasets: [
          {
            label: 'Quantidade de Alunos',
            data: [10, 12, 15, 18, 22, 25],
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
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Segunda-Feira'],
        datasets: [{
          label: 'Quantidade de Alunos',
          data: [30],
          backgroundColor: '#b1e6d1',
          borderColor: '#005f6b',
          borderWidth: 2.5 ,
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