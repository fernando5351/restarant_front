import { Component,Input } from '@angular/core';
import {Role} from '../../models/role.model'
import {RoleService} from '../../services/role/role.service'

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {

  @Input() role: Role = {
        id: 0,
        name: '' ,
        status: ''
  }

  // constructor(private roleService: RoleService){};

  // ngOnInit(): void{
  //   this.getRoles()
  // }

  // getRoles(){
  //   this.roleService.getRoles().subscribe((data)=>{
  //     this.roles = data;
  //     console.log(this.roles.data);

  //   })
  // }

}
