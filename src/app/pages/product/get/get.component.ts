import { Component, OnInit } from '@angular/core';
import { GetProducts } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class GetProductComponent implements OnInit {
  url: string = '/product-create';
  placeholder: string = 'Buscar producto...';
  btn: string = 'Crear Producto';

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
        imgUrl: null,
        quantity: 0,
        categoryId: 0
      }
    ]
  }

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe((data) => {
      // console.log(data);
      this.products = data;
      // console.log(this.products);
      // console.log('Get Products : ', this.products.data);
    })
  }

  getRequestSearch(search: string) {
    // console.log('texto a buscar: ' + search);
  }

}
