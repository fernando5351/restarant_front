import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { GetCategory } from 'src/app/models/category.models';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { GetProducts } from 'src/app/models/product.model';
import { GetIdService } from 'src/app/services/get-id.service';

@Component({
  selector: 'app-get-by-id',
  templateUrl: './get-by-id.component.html',
  styleUrls: ['./get-by-id.component.scss']
})
export class GetByIdComponent {
  url: string = '/product-create';
  placeholder: string = 'Buscar producto...';
  btn: string = 'Crear Producto';
  apiUrl: string = '/product'
  categoryId: number = 0;
  category: GetCategory = {
    statusCode: 0,
    message: '',
    data: {
      id: 0,
      name: '',
      imgUrl: '',
      status: '',
      Product: [
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
  }

  products: GetProducts = {
    statusCode: 0,
    message: '',
    data: [{
      id: 0,
      name: '',
      price: 0,
      status: '',
      description: '',
      imgUrl: null,
      quantity: 0,
      categoryId: 0
    }]
  }

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private getId: GetIdService,
    private router: Router
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.categoryId = parseInt(id);
      this.getProducts(this.categoryId);
    } else {
      console.error("No se proporcionó un valor válido para 'id'.");
    }

    this.getId.setId(this.categoryId);

  }

  getProducts(id: number){
    this.categoryService.getCategoryById(id).subscribe((data) => {
      this.category = data;
      console.log(this.category);

    })
  }

  getRequestSearch(search: string) {
    if (search.length > 0) {
      this.productService.search(search).subscribe((finded)=> {
        this.products = finded;
        this.category.data.Product = this.products.data;
      });
    } else {
      this.getProducts(this.category.data.id);
    }
  }

}
