import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartEvent, registerables } from 'chart.js/auto';
import { FrequenciaService } from './service/grafico.service'; // ajuste o caminho conforme seu projeto

@Component({
  selector: 'app-grafico',
  imports: [],
  templateUrl: './grafico.html',
  styleUrl: './grafico.css'
})
export class ConsultaGraficoComponent implements AfterViewInit {
  @ViewChild('chart1') chart1!: ElementRef;
  @ViewChild('chart2') chart2!: ElementRef;

  constructor(private frequenciaService: FrequenciaService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.criarGraficoDia('segunda');
    this.criarGraficoSemana();
  }

  criarGraficoDia(diaSemana: string): void {
    this.frequenciaService.graficoPorDia(diaSemana).subscribe(data => {
      const labels = data.map(item => item.horario); // ajuste conforme seu backend
      const values = data.map(item => item.quantidade);

      new Chart(this.chart1.nativeElement, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: `Frequência na ${diaSemana}`,
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    });
  }

  criarGraficoSemana() {
    this.frequenciaService.graficoPorSemana().subscribe(data => {
      const labels = data.map(item => item.diaSemana); // ajuste conforme seu backend
      const values = data.map(item => item.quantidadeTotal);
    new Chart(this.chart2.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Frequência na Semana',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  });
}}