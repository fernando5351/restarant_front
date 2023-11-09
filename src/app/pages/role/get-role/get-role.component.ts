import { Component, OnInit } from '@angular/core';
import {GetRoles,} from '../../../models/role.model';
import {RoleService} from '../../../services/role/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-role',
  templateUrl: './get-role.component.html',
  styleUrls: ['./get-role.component.scss']
})
export class GetRoleComponent implements OnInit {

  placeholder = 'Buscar rol...';
  btn = 'Crear rol';
  url = '/create-rol';

  roles: GetRoles = {
    statusCode: 0,
    message: '',
    data: [
      {
        id: 0,
        name: '' ,
        status: ''
      }
    ]
  }

  constructor(private roleService: RoleService){};

  ngOnInit(): void{
    this.getRoles()
  }

  getRoles(){
    this.roleService.getRoles().subscribe(
      (data)=>{
        this.roles = data;
        console.log(this.roles.data);
      },
      (error)=>{
        console.error('error al obtener los roles', error);
        if (error.status == 409) {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'el rol ya existe',
            timer: 200
          })
        }

      }
    )
  }

  searchChange(name: string) {
    if (name.length > 0) {
      this.roleService.search(name).subscribe((response) => {
        this.roles.data = response.data
      });
    } else {
      this.getRoles();
    }

  }


}
