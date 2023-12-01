import { Component, Input } from '@angular/core';
import {Combo} from '../../models/combo.model'
import {Router} from '@angular/router'

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.scss']
})
export class ComboComponent {

  apiUrl = '/combs'
  url = '/combs'
  comboId: number =  0

  @Input() combo: Combo = {
    id: 0,
    name: '',
    price: 0,
    status: '',
    Product:[{
      id: 0,
      name: '',
      description: '',
      price: 0,
      status: '',
      imgUrl: null,
      quantity: 0,
      categoryId: 0
    }]
  }

  constructor(private router: Router){}

  request(id:number){
    return `${this.apiUrl}/${id}`
  }

 update(){
  this.comboId = this.combo.id;
  console.log('el id recibido es: ' + this.comboId);
  const update = `${this.url}/${this.comboId}`;
  this.router.navigate([update])

 }


}
