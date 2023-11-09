import { Component, OnInit} from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import {CreateRole} from '../../../models/role.model';
import {RoleService } from '../../../services/role/role.service';
import { Router } from '@angular/router';
import Swal from  'sweetalert2'

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private roleService : RoleService,
    private formBuilder: FormBuilder,
    private router:Router
  ){}

  ngOnInit(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      status: ['Estado', [Validators.required]]
    });
  }

  sendRequest(event: Event){
    event.preventDefault();


    const dto: CreateRole = {
      name:this.form.get('name')?.value ,
      status: this.form.get('status')?.value
    };

    const formData = new FormData();
    formData.append('name',dto.name);
    formData.append('status',dto.status);

    this.roleService.createRole(formData).subscribe({
      next:(response)=>{
        console.log(response);
        if (response.statusCode == 201) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Rol creado exitosamente',
            confirmButtonText:'Ok',
            timer: 3000
          })
        }
        this.router.navigate(['/rol']);
      },
       error:(error)=>{
        console.log("Error",error)
        if (error.status === 400) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Algo salio mal, verifica que envias los datos correctamente',
            timer: 3000
          });
        } else if (error.status === 409) {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'El rol ya existe en la base de datos',
          })
        } else if (error.status === 500){
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Ocurrio un error interno del servidor',
            timer: 3000
          })
        }
      }

    })

  }
}
