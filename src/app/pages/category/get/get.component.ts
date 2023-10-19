import { Component, OnInit } from '@angular/core';
import { GetCategories } from '../../../models/category.models';
import { CategoryService } from '../../../services/category/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class GetComponent implements OnInit {

  url: string = '/category-create';
  placeholder: string = 'Buscar categoria...';
  btn: string = 'Crear Categoria';

  categories: GetCategories = {
    statusCode: 0,
    message: '',
    data: [
      {
        id: 0,
        name:'',
        status: '',
        imgUrl: ''
      }
    ]
  }

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {};

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((data)=>{
      this.categories = data
      console.log(this.categories.data)
    })
  }

  onSearchChange(name: string) {
    console.log('Texto de búsqueda:', name);
    if (name.length > 0) {
      this.categoryService.search(name).subscribe((response) => {
        console.log(response);
        this.categories.data = response.data
      });
    } else {
      this.getCategories();
    }
  }

  createCategory(){
    this.router.navigate(['/product-create']);
  }
}
