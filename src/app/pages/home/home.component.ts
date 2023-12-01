// home.component.ts

import { Component } from '@angular/core';
import { ReportService } from '../../services/report/report.service';
import { GetSales } from 'src/app/models/report.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  sales: GetSales = {
    statusCode: 0,
    message: '',
    data: []
  };

  selectedDate: string = '';
  totalAmount: number = 0;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getSales();
  }

  getSales() {
    this.reportService.getReports().subscribe(
      (data) => {
        this.sales = data;
        this.calculateTotalAmount();
        console.log(this.sales.data);
      },
      (error) => {
        console.error('Error al obtener las ventas', error);
        // Manejar el error según sea necesario
      }
    );
  }

  filterSalesByDate() {
    console.log('Fecha seleccionada:', this.selectedDate);

    if (this.selectedDate) {
      this.reportService.getSalesByDate(this.selectedDate).subscribe(
        (data) => {
          console.log('Ventas filtradas por fecha:', data);
          this.sales = data;
          this.calculateTotalAmount();

          // Mostrar SweetAlert si no hay ventas
          if (this.sales.data.length === 0) {
            Swal.fire({
              icon: 'info',
              title: 'No hay ventas en la fecha seleccionada',
              text: 'Intenta con otra fecha',
            });
          }
        },
        (error) => {
          console.error('Error al obtener las ventas por fecha', error);
          // Manejar el error según sea necesario
        }
      );
    } else {
      console.log('No hay fecha seleccionada. Obtener todas las ventas.');
      // Si no se selecciona una fecha, obtener todas las ventas
      this.getSales();
    }
  }


  calculateTotalAmount() {
    this.totalAmount = this.sales.data.reduce((total, sale) => total + sale.total, 0);
  }
}
