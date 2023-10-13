import { Component, Input, Output } from '@angular/core';
import { Products } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
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

  request(e: Event) {
    e.preventDefault();
    console.log(e);

    console.log(this.product.id + " id");
  }

}
