import { Component, Input } from '@angular/core';
import {User} from '../../models/user.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  apiUrl = '/user';
  url = '/user';
  idUser: number = 0;

  @Input() user: User = {
    id: 0,
    idRole: 0,
    name: '',
    lastname: '',
    email: '',
    status: '',
    password: '',
    createdAt: '',
    role: {
      id: 0,
      name: '',
      status: ''
    }

  }

  //ELIMINAR
  request(id:number){
    return `${this.apiUrl}/${id}`
  }


  //ACTUALIZAR DATOS DE USUARIO


}
