import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ReportService } from '../../services/report/report.service';
import { GetSales } from 'src/app/models/report.model';
import Swal from 'sweetalert2';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexDataLabels, ApexYAxis, ApexTitleSubtitle, ApexLegend, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle
}

export type ChartOption = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnChanges{

  sales: GetSales = {
    statusCode: 0,
    message: '',
    data: {
      totalSales: 0,
      totalDiscounts: 0,
      totalProductsSale: 0,
      productsSoldByNameAndCategory: [{ product: {
        id: 0,
        name: '',
        price: 0,
        status: '',
        description: '',
        imgUrl: null,
        quantity: 0,
        categoryId: 0
      }
        , quantity: 0, categoryName: '' }],
      salesByDay: [{ date: '', totalSales: 0, totalDiscounts:0}]
    },
  };

  maxDate: Date = new Date();
  minDate = '2023-12-01';
  selectedDatePicker!: string;

  selectedStartDate!: string | null;
  selectedEndDate!: string | null;

  salesLabel: string[] = [];
  salesByDateLabel: string[] = []
  seriesByDate: number[] = []
  seriesLabel: number[] = [];
  selectedDate: string = '';
  totalAmount: number = 0;

  constructor(private reportService: ReportService) { }

  chartOptions!: ChartOptions;
  chartOption!: ChartOption;

  ngOnInit(): void {
    // console.log('Fecha seleccionada:', this.selectedDate);
    const date = new Date();
    const nowDay = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const yesterDay = nowDay - 3;

    const startDate = `${year}-${month}-${yesterDay}`;
    const endDate = `${year}-${month}-${nowDay}`;
    this.filterSalesByDate(startDate, endDate);
    this.actualizarGraficos();
    //this.getSales();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['salesLabel'] && changes['salesLabel'].currentValue) {
      // Actualiza el gráfico cuando salesLabel cambia
      this.actualizarGraficos();
      // console.log('changes efectued');

    }
  }

  actualizarGraficos() {
    this.chartOption = {
      series: this.seriesLabel,
      chart: {
        width: 380,
        type: "pie"
      },
      labels: this.salesLabel,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.chartOptions = {
        series: [{
        name: `Venta del dia`,
        data: this.seriesByDate
      }],
        chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },

      title: {
        text: 'Ventas Diarias',
        align: 'left'
      },
      subtitle: {
        text: 'Movimientos de ventas',
        align: 'left'
      },
      labels: this.salesByDateLabel,
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
    };
  }

  getSales() {
    this.reportService.getReports().subscribe({
      next: (data) => {
        this.sales = data;
        // console.log(this.sales.data);
      },
      error: (error) => {
        console.error('Error al obtener las ventas', error);
      }
    });
  }

  private formatDate(date: Date): string | null {
    if (date instanceof Date && !isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return null;
  }

  startDateChanged(event: MatDatepickerInputEvent<any>): void {
    this.selectedStartDate = this.formatDate(event.value);
    this.filterSales();
  }

  endDateChanged(event: MatDatepickerInputEvent<any>): void {
    this.selectedEndDate = this.formatDate(event.value);
    this.filterSales();
  }

  private filterSales(): void {
    if (this.selectedStartDate && this.selectedEndDate) {
      this.filterSalesByDate(this.selectedStartDate, this.selectedEndDate);
    }
  }

  filterSalesByDate(startDate: string, endDate: string) {

    this.reportService.getSalesByDate(startDate, endDate).subscribe({
      next: (response) => {
        // console.log(response);

        this.salesLabel = [];
        this.seriesLabel = [];
        this.salesByDateLabel = [];
        this.seriesByDate = [];

        // console.log('Ventas filtradas por fecha:', response);
        this.sales = response;
        for (let i = 0; i < response.data.productsSoldByNameAndCategory.length; i++) {
          const element = response.data.productsSoldByNameAndCategory[i];
          console.log(element);

          this.salesLabel.push(element.product.name);
          this.seriesLabel.push(element.quantity);
        }
        // console.log(this.salesLabel);

        for (let i = 0; i < response.data.salesByDay.length; i++) {
          const saleDay = response.data.salesByDay[i];
          // console.log(saleDay);

          this.salesByDateLabel.push(saleDay.date);
          const totalSalesNumber = parseFloat(saleDay.totalSales.toFixed(2));
          this.seriesByDate.push(totalSalesNumber);
        }
        // console.log(this.salesByDateLabel);
        // console.log(this.seriesByDate);
        this.actualizarGraficos();

        // // Mostrar SweetAlert si no hay ventas
        // if (this.sales.data.totalProductsSale === 0) {
        //   Swal.fire({
        //     icon: 'info',
        //     title: 'No hay ventas en la fecha seleccionada',
        //     text: 'Intenta con otra fecha',
        //   });
        // }
      },
      error: (error) => {
        console.error('Error al obtener las ventas por fecha', error);
        // Manejar el error según sea necesario
      }
    });
  }

}
