import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
import { Subscription } from 'rxjs';
import { Finance } from '../finances/finances.component';
import { DataService } from '../services/date.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.scss'
})
export class MonitorComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') chart: ElementRef

  dataPerYear: { [key: number]: number[] } = {};
  selectedYear: number
  years: number[] = []

  private finances: Finance[]
  private canva: Chart
  private subscription: Subscription

  constructor(
    private dataService: DataService
  ) {
    Chart.register(LinearScale, CategoryScale, BarController, BarElement)
  }

  ngOnInit(): void {
    this.initChartData()
  }
  
  ngAfterViewInit(): void {
    this.renderChart()
  }
  
  public renderChart() {
    const ctx = this.chart.nativeElement.getContext('2d')
    this.refreshCanva()
    this.canva = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
          data: this.dataPerYear[this.selectedYear],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }

  private initChartData() {
    this.selectedYear = new Date().getFullYear()
    this.getData()
    this.years = this.getYearsFromData()
  }

  private getData(): void {
    this.finances = JSON.parse(localStorage.getItem('finances')) ?? []
    this.finances?.forEach(finance => {
      const year = new Date(finance.date).getFullYear()
      const month = new Date(finance.date).getMonth() + 1
      if (!this.dataPerYear[year]) {
        this.dataPerYear[year] = new Array(12).fill(0)
      }
      this.dataPerYear[year][month - 1] = finance.type === 'expense' ? this.dataPerYear[year][month - 1] + finance.amount : this.dataPerYear[year][month - 1] - finance.amount
    })
  }

  private getYearsFromData(): number[] {
    return Object.keys(this.dataPerYear).map(item => +item)
  }

  private refreshCanva() {
    if (this.canva) {
      this.canva.destroy()
    }
  }
}
