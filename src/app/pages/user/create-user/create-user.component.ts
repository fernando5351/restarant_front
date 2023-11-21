import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUser } from  '../../../models/user.model';
import {GetRoles} from '../../../models/role.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Importa tu servicio de roles
import { RoleService } from '../../../services/role/role.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  form: FormGroup = new FormGroup({});
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
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private roleService: RoleService // Agrega tu servicio de roles
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      status: ['Estado', [Validators.required]],
      password: ['', [Validators.required]],
      idRole: ['', [Validators.required]] // Nuevo campo para el id del rol
    });

    // Obtén la lista de roles
    this.roleService.getRoles().subscribe((data)=>{
      this.roles = data
    })
  }

  sendRequest(event: Event) {
    event.preventDefault();

    const dto: CreateUser = {
      name: this.form.get('name')?.value,
      lastname: this.form.get('lastname')?.value,
      email: this.form.get('email')?.value,
      status: this.form.get('status')?.value,
      password: this.form.get('password')?.value,
      idRole: this.form.get('idRole')?.value,
      role: {  // Incluir el campo 'role' completo
        id: this.form.get('idRole')?.value,
        name: '',  // Reemplaza con el valor correcto
        status: '',  // Reemplaza con el valor correcto
      },
    };


    const formData = new FormData();
    formData.append('name',dto.name);
    formData.append('lastname',dto.lastname);
    formData.append('email',dto.email);
    formData.append('status',dto.status.toString());
    formData.append('password',dto.password);
    formData.append('idRole',dto.idRole.toString());
    this.userService.createUser(formData).subscribe({
      next:(response) =>{
        console.log(response);
        if (response.statusCode === 201) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario creado correctamente',
            showConfirmButton: true,
          })
        }
        this.router.navigate(['/user'])
      },
      error:(error)=>{
        console.log('error', error);
        if (error.status == 400) {
          Swal.fire({
            position:'top-end',
            icon: 'error',
            title: 'Algo salio mal, verfica que envias los datos correctamente',
            timer: 2000
          })
        } else if( error.status == 409){
          Swal.fire({
            position:'top-end',
            icon:'error',
            title: 'El usuario ya existe en la base de datos',
            timer:2000
          })
        }
      }
    })
  }
}
