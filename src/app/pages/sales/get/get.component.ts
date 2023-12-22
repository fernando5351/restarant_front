import { Component, OnInit, Output } from '@angular/core';
import { GetSales, GetSale } from 'src/app/models/sale.model';
import { SaleService } from 'src/app/services/sale/sale.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class GetSaleComponent implements OnInit{
  getSalesResponse: GetSales = {
    statusCode: 0,
    message: '',
    data: [{
      id: 0,
      waiter: '',
      client: '',
      code: 0,
      total: 0,
      subTotal: 0,
      idMesa: 0,
      discount: 0,
      productIds: [],
      cellphone: 0,
      comboIds: [],
      quantity: [],
      comboQuantity: [],
      status: false,
      createdAt: '',
      SaleCombo: [{
        id: 0,
        name: '',
        price: 0,
        status: '',
        imgUrl: null,
        Product: [{
          id: 0,
          name: '',
          description: '',
          price: 0,
          quantity: 0,
          imgUrl: null,
          status: '',
          categoryId: 0,
          SaleProduct: {
            saleId: 0,
            productId: 0,
            comboId: 0,
            quantity: 0,
          },
        }],
      }],
      SaleProducts: [{
        id: 0,
        name: '',
        description: '',
        imgUrl: null,
        price: 0,
        quantity: 0,
        status: '',
        categoryId: 0,
        SaleProduct: {
          saleId: 0,
          productId: 0,
          comboId: 0,
          quantity: 0,
        },
      }],
    }],
  }

  selectedStatus: boolean | null = null;


  constructor(
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    this.getSales();
  }


  getSales() {
    this.saleService.GetSale().subscribe((data) => {
      this.getSalesResponse = data;
      this.filterSales();
    });
  }

  onStatusChange(): void {
    this.filterSales();
  }

  filterSales(): void {
    if (this.selectedStatus !== null) {
      this.saleService.getSalesByStatus(this.selectedStatus).subscribe(
        (data) => {
        this.getSalesResponse = data;
      },(error)=>{
        if (error.status === 404) {
          Swal.fire({
            icon: 'warning',
            title: 'Estado de venta no encontrado',
            showConfirmButton: false,
            timer: 2000
          })
        }else{
          console.error(error);

        }
      });
    }
  }


  onDateChange(): void {
    this.filterSalesByDate();
  }

  startDate: string | null = this.getCurrentDate();
  endDate: string | null = null;

  getCurrentDate(): string {
    const today = new Date();
    return formatDate(today, 'yyyy-MM-dd', 'en-US');
  }

  filterSalesByDate(): void {
    if (this.startDate !== null && this.endDate !== null) {
      this.saleService.getSalesByDate(this.startDate, this.endDate).subscribe(
        (data) => {
          this.getSalesResponse = data;
        },
        (error) => {
          if (error.status === 404) {
            Swal.fire({
              icon: 'warning',
              title: 'No hay ventas en las fechas brindadas',
              showConfirmButton: false,
              timer: 2000,
            });
          } else {

            console.error('Error:', error);
          }
        }
      );
    }
  }

  deleteSaleConfirmation(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta venta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteSale(id);
      }
    });
  }

  deleteSale(id: number): void {
    this.saleService.deleteSale(id).pipe(
      finalize(() => {
        // Actualizar las ventas después de la eliminación
        this.getSales();
      })
    ).subscribe(
      () => {
        // Mostrar una alerta de éxito si es necesario
        Swal.fire({
          icon: 'success',
          title: 'Venta eliminada con éxito :)',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        console.error('Error al eliminar la venta:', error);

        if (error.status === 403) {
          // El usuario no tiene permisos para borrar las ventas
          Swal.fire({
            icon: 'error',
            title: 'Acceso denegado :[',
            text: 'El usuario no puede borrar las ventas',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          // Mostrar una alerta de error genérica
          Swal.fire({
            icon: 'error',
            title: 'Error al eliminar la venta',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    );
  }
}
