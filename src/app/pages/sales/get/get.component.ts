import { Component, OnInit, Output } from '@angular/core';
import { GetSales, GetSale } from 'src/app/models/sale.model';
import { SaleService } from 'src/app/services/sale/sale.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

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
      this.saleService.getSalesByStatus(this.selectedStatus).subscribe((data) => {
        this.getSalesResponse = data;
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

}

