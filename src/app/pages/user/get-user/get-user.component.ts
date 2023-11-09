import { Component,OnInit } from '@angular/core';
import {getUsers} from '../../../models/user.model';
import {GetRoles} from  '../../../models/role.model';
import {RoleService} from '../../../services/role/role.service';
import {UserService} from '../../../services/user/user.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.scss']
})
export class GetUserComponent {

  placeholder = 'Buscar Usuario...';
  btn = 'Crear usuario';
  url = '/create-user'

  users: getUsers = {
    statusCode: 0,
    message: '',
    data: [{
      id:0,
      name: '',
      lastname: '',
      idRole: 0,
      email: '',
      status: '',
      createdAt: '',
      password: '',
      role: {
        id: 0,
        name: '',
        status: '',
      }
    }]
  }

  roles: GetRoles = {
    statusCode: 0,
    message: '',
    data: [{
      id: 0,
      name: '',
      status: ''
    }]
  }

  constructor(
    private userService:UserService,
    private roleService:RoleService
    ){}

  ngOnInit(){
    this.getRoles()
    this.getUser()
  }


  getRoles() {
    this.roleService.getRoles().subscribe(
      (data) => {
        this.roles = data;
        console.log(this.roles.data);

      },
      (error) => {
        console.log('Error fetching roles', error);
      }
    );
  }

  getUser() {
    this.userService.getUsers().pipe(
      map((userData) => {
        // Map the user roles based on idRole
        userData.data.forEach((user) => {
          const correspondingRole = this.roles.data.find((role) => role.id === user.idRole);
          if (correspondingRole) {
            user.role = correspondingRole;
          }
        });
        return userData;
      })
    ).subscribe(
      (data) => {
        this.users = data;
        console.log(this.users.data);
      },
      (error) => {
        console.log('Error fetching users', error);
      }
    );
  }


  search(name: string) {
    if (name.length > 0) {
      const usuariosTemporales = this.users.data;

      this.userService.search(name).subscribe((response) => {
        this.users.data = response.data;
        this.users.data.forEach((user) => {
          const correspondingRole = this.roles.data.find((role) => role.id === user.idRole);
          if (correspondingRole) {
            user.role = correspondingRole;
          }
        });
      });
    } else {
      this.getUser();
    }
  }






}
