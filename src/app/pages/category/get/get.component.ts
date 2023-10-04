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

  categories: GetCategories;


  constructor(private categoryService: CategoryService )  {
    this.categories = { statusCode: 0, message: '', data: [] };
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(data => {
        this.categories = data;
        console.log(this.categories);
        console.log(this.categories)
      });
  }
}
