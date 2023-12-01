import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sale-component',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponentApi {
  @Input() sale: any = {
    id: 0,
    client: '',
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
  }

  constructor(
    private router: Router
  ){}

  click(){
    this.router.navigate([`venta/continuar/${this.sale.id}`])
  }

}
