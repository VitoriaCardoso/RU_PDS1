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
    this.criarGrafico(this.chart1.nativeElement, 'Sétimo Ano');
    this.criarGrafico(this.chart2.nativeElement, 'Nono Ano');
  }

  criarGrafico(canvas: HTMLCanvasElement, titulo: string) {
    if (canvas) {
      new Chart(canvas, {
        type: 'line',
        data: {
          labels: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
          datasets: [
            {
              label: 'Sétimo ano',
              data: [10, 12, 15, 18, 22, 25, 24, 27, 30, 32],
              borderColor: 'blue',
              fill: false
            },
            {
              label: 'Oitavo ano',
              data: [12, 15, 18, 16, 20, 23, 25, 26, 30, 33, 35],
              borderColor: 'red',
              fill: false
            },
            {
              label: 'Nono ano',
              data: [20, 21, 19, 22, 25, 27, 28, 30, 33, 34, 35],
              borderColor: 'yellow',
              fill: false
            }
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
}}