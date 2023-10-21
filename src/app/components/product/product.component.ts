import { Component, Input, Output } from '@angular/core';
import { Products } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() url: string | null = null;
  @Input() apiUrl: string = '';
  @Input() product: Products = {
    id: 0,
    name: '',
    price: 0,
    status: '',
    description: '',
    imgUrl: '',
    quantity: 0,
    categoryId: 0
  };
  ProductId: number = 0;

  request(id: number) {
    return `${this.apiUrl}/${id}`;
  }

  update(id: number) {
    this.ProductId = id;
    console.log(this.ProductId + ' valor del id a actualizar');
  }

}
