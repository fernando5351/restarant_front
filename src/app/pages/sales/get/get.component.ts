import { Component, OnInit, Output } from '@angular/core';
import { GetSales, GetSale } from 'src/app/models/sale.model';
import { SaleService } from 'src/app/services/sale/sale.service';

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
      client: '',
      waiter: '',
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

  constructor(
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    this.getSales();
  }

  getSales(){
    this.saleService.GetSale().subscribe((data) =>{
      this.getSalesResponse = data;
    })
  }

}
