import { Component, Input, OnInit } from '@angular/core';
import { GetCategories } from '../../../app/models/category.models';
import { CategoryService } from '../../../app/services/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  @Input() categories: GetCategories = {
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


  constructor(private categoryService: CategoryService ) {};

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((data)=>{
      this.categories = data
      console.log(this.categories.data)
    })
  }


}


