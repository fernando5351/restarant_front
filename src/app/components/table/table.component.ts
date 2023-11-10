import { Component,Input, } from '@angular/core';
import {Table,GetTable,GetTables} from '../../models/table.model';
import {TableService} from '../../services/table/table.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  apiUrl = '/table';
  url = '/table';
  tableId: Number = 0;
  @Input() table: Table = {
    id: 0,
    quantity: 0,
    number: 0,
    status: ''
  }

  tables: GetTables = {
    statusCode: 0,
    message: '',
    data: [
      {
        id: 0,
        quantity: 0,
        status: '',
        number: 0
      }
    ]
  }

  selectedTable: GetTable = {
    statusCode: 0,
    message: '',
    data: {
      id: 0,
      quantity: 0,
      status: '',
      number: 0,
    }
  };

  constructor(
    private tableService: TableService,
    private router: Router
  ){}

  refrescarPagina() {
    window.location.reload();
  }

  request(id: number){
    return `${this.apiUrl}/${id}`
  }


  update(id: number) {
    // Obtener los detalles de la mesa por su ID (puedes configurar tu servicio para hacer esto)
    this.tableService.getTableById(id).subscribe((mesa) => {
      this.selectedTable = mesa;
      console.log(mesa);

      // Crear una copia de selectedTable para que los cambios en el formulario no afecten directamente a la mesa original
      const mesaEditable = { ...this.selectedTable };
      console.log(mesaEditable);

      // Establecer los valores iniciales de los campos del formulario
      Swal.fire({
        title: 'Editar Mesa',
        html: `
          <form>
            <div class="form-group">
              <label for="number"> Mesa:</label>
              <input type="text" id="number" class="swal2-input" value="${mesaEditable.data.number}">
            </div>
            <div class="form-group">
              <label for="quantity">Cantidad:</label>
              <input type="text" id="quantity" class="swal2-input" value="${mesaEditable.data.quantity}">
            </div>
            <div class="form-group">
              <label for="status">Estado:</label>
              <select id="status" class="swal2-input">
                <option value="Activo" ${mesaEditable.data.status === 'Activo' ? 'selected' : ''}>Activo</option>
                <option value="Inactivo" ${mesaEditable.data.status === 'Inactivo' ? 'selected' : ''}>Inactivo</option>
              </select>
            </div>
          </form>
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar Cambios ',
        preConfirm: () => {
          // Captura los valores de los campos en el formulario antes de confirmar
          mesaEditable.data.number = parseInt((document.getElementById('number') as HTMLInputElement).value);
          mesaEditable.data.quantity = parseInt((document.getElementById('quantity') as HTMLInputElement).value);
          mesaEditable.data.status = (document.getElementById('status') as HTMLSelectElement).value;
        }
      }).then((result) => {
        if (result.isConfirmed) {
          // Realizar una solicitud HTTP PATCH para actualizar la mesa en el servidor
          this.tableService.patchTable(mesaEditable.data,id).subscribe((response) => {
            console.log(response);
            if (response = 200) {
              Swal.fire('Actualizado', 'Los cambios han sido guardados.', 'success').then(() => {
                    this.refrescarPagina()
              });
            } else {
              Swal.fire('Error', 'No se pudo actualizar la mesa.', 'error');
            }
          },
          (error) =>{
            if (error.status == 409) {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'el numero de mesa al que quieres actualizar ya existe',
                timer: 3000
              })
            }
          }
          );
        }
      });
    });
}

}
