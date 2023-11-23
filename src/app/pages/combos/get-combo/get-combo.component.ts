import { Component } from '@angular/core';

@Component({
  selector: 'app-get-combo',
  templateUrl: './get-combo.component.html',
  styleUrls: ['./get-combo.component.scss']
})
export class GetComboComponent {
  url: string = '/create-combo';
  placeholder: string = 'Buscar combo ...';
  btn: string = 'Crear un combo'

}
