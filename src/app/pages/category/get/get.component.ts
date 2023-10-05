import { Component, OnInit } from '@angular/core';
import { GetCategories } from '../../../models/category.models';
import { CategoryService } from '../../../services/category/category.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class GetComponent implements OnInit {

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
