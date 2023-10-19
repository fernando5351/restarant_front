import { Component, Input } from '@angular/core';
import { Category } from '../../../app/models/category.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent {
  @Input() category: Category = {
    id: 0,
    name:'',
    status: '',
    imgUrl: ''
  }

  constructor( private router: Router) {};

  navigateTo(e: Event){
    e.preventDefault();
    const url: string = `/products-category/${this.category.id}`;
    this.router.navigate([url]);
  }
}


