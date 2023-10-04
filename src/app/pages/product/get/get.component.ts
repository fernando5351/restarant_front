import { Component, OnInit } from '@angular/core';
import { GetProducts, Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class GetProductComponent implements OnInit {

  products: GetProducts = {
    statusCode: 0,
    message: '',
    data: [
      {
        id: 0,
        name: '',
        price: 0,
        status: '',
        description: '',
        imgUrl: '',
        quantity: 0,
        categoryId: 0
      }
    ]
  }

  constructor(
    private productService: ProductService
  ){}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      console.log('Get Products : ', this.products.data);
    })
  }

}
