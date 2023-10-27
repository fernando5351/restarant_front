import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
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
    imgUrl: null,
    quantity: 0,
    categoryId: 0
  };
  ProductId: number = 0;

  constructor(private router: Router) {}
  request(id: number) {
    return `${this.apiUrl}/${id}`;
  }

  update(id: number) {
    this.ProductId = id;
    this.router.navigate([`/update-product/${this.product.id}`])
  }

}
