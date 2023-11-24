import { Component, Input } from '@angular/core';
import {Combo} from '../../models/combo.model'

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.scss']
})
export class ComboComponent {

  apiUrl = '/combs'
  url = '/combs'
  idUser = 0

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
      status: true,
      quantity: 0,
      categoryId: 0
    }]
  }

  request(id:number){
    return `${this.apiUrl}/${id}`
  }


}
