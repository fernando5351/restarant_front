import { Component, Input } from '@angular/core';
import { Category } from '../../../app/models/category.models';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent {
  apiUrl: string = '/category';
  url = '/category';
  categoryId: number = 0;
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

  delete(id: number) {
    return `${this.apiUrl}/${id}`;
  }

  update() {
    this.categoryId = this.category.id;
    console.log('el id recibido es: ' + this.categoryId);
    // Swal.fire({
    //   icon: 'info',
    //   title: `actualizar el id: ${this.categoryId}`
    // })

    //return `${this.url}/${this.categoryId}`;

  }
}
