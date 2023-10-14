import { Component, OnInit } from '@angular/core';
import {GetRoles} from '../../../models/role.model';
import {RoleService} from '../../../services/role/role.service';

@Component({
  selector: 'app-get-role',
  templateUrl: './get-role.component.html',
  styleUrls: ['./get-role.component.scss']
})
export class GetRoleComponent implements OnInit {

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
    this.roleService.getRoles().subscribe((data)=>{
      this.roles = data;
      console.log(this.roles.data);

    })
  }


}
