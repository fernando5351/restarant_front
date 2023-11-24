import { Component,OnInit } from '@angular/core';
import {GetCombos} from '../../../models/combo.model';
import {CombosService} from '../../../services/combos/combos.service';



@Component({
  selector: 'app-get-combo',
  templateUrl: './get-combo.component.html',
  styleUrls: ['./get-combo.component.scss']
})
export class GetComboComponent {
  url: string = '/create-combo';
  placeholder: string = 'Buscar combo ...';
  btn: string = 'Crear un combo'

  combos: GetCombos = {
    statusCode: 0,
    message: '',
    data:[{
      id: 0,
      name: '',
      price: 0,
      status: '',
      Product:[{
        id: 0,
        name: '',
        price: 0,
        status: true,
        quantity: 0,
        categoryId: 0,
        description: ''
      }]
    }]
  }


  constructor(private comboService:CombosService){}

  ngOnInit():void{
    this.getCombos()
  }

  getCombos(){
    this.comboService.getCombos().subscribe(
      (data)=>{
        this.combos = data;
        console.log(this.combos.data);

      }
    )
  }

}
