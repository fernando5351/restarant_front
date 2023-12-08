import { Component, Input } from '@angular/core';
import { Role,GetRole,GetRoles,UpdateRole } from '../../models/role.model';
import {RoleService} from '../../services/role/role.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {
  apiUrl: string = '/rol';
  url: string = '/rol';
  roleId: number = 0;
  @Input() role: Role = {
    id: 0,
    name: '',
    status: ''
  }

  roles: GetRoles = {
    statusCode: 0,
    message: '',
    data: [
      {
        id: 0,
        name: '',
        status: ''
      }
    ]
  }

  selectedRole: GetRole ={
    statusCode: 0,
    message: '',
    data:{
      id: 0,
      name: '',
      status: ''
    }
  }
  constructor(
    private roleService: RoleService,
    private router: Router
  ) {};

  refrescarPagina() {
    window.location.reload();
  }

  request(id: number){
    return `${this.apiUrl}/${id}`;
  }

  update(id: number) {
    this.roleService.getRoleById(id).subscribe((rol) => {
      this.selectedRole = rol;
      // console.log(rol);

      const roleEditable = { ...this.selectedRole };
      // console.log(roleEditable);

      Swal.fire({
        title: 'Editar Rol',
        html: `
          <form>
            <div class="form-group">
              <label for="name">Nombre:</label>
              <input type="text" id="name" class="swal2-input" value="${roleEditable.data.name}">
            </div>
            <div class="form-group">
              <label for="status">Estado:</label>
              <select id="status" class="swal2-input">
                <option value="Activo" ${
                  roleEditable.data.status === 'Activo' ? 'selected' : ''
                }>Activo</option>
                <option value="Inactivo" ${
                  roleEditable.data.status === 'Inactivo' ? 'selected' : ''
                }>Inactivo</option>
              </select>
            </div>
          </form>
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar Cambios',
        preConfirm: () => {
          // Captura los valores de los campos en el formulario antes de confirmar
          const updatedRole: UpdateRole = {
            name: (document.getElementById('name') as HTMLInputElement).value,
            status: (document.getElementById('status') as HTMLSelectElement).value
          };

          return updatedRole;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Realizar una solicitud HTTP PATCH para actualizar el rol en el servidor
          this.roleService.pathcRole(result.value, id).subscribe(
            (response) => {
              // console.log(roleEditable.data);

              if (response = 200) {
                Swal.fire('Actualizado', 'Los cambios han sido guardados.', 'success').then(() => {
                  this.refrescarPagina(); // Redirige a la página después de la actualización.
                });
              } else {
                Swal.fire('Error', 'No se pudo actualizar el rol.', 'error');
              }
            },
            (error) => {
              if (error.status === 409) {
                Swal.fire('Error', 'El rol que quieres actualizar ya existe.', 'error');
              } else if (error.status === 400) {
                Swal.fire('Error', 'Ocurrió un error, verifica que envías los datos correctamente.', 'error');
              }
            }
          );
        }
      });
    });
  }
}
