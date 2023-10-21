import { Component,Input, } from '@angular/core';
import {GetTables, GetTable} from '../../models/table.model';
import {TableService} from '../../services/table/table.service'
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {



   tables: GetTables = {
    statusCode: 0,
    messsage: '',
    data: [
      {
        id: 0,
        quantity: 0,
        status: '',
        number: 0,
      }
    ]
  }

  selectedTable: GetTable = {
    statusCode: 0,
    messsage: '',
    data: {
      id: 0,
      quantity: 0,
      status: '',
      number: 0,
    }
  };
  constructor (
    private tableService: TableService,
    private formBuilder: FormBuilder
    ){};

  ngOnInit(): void {
    this.getTables()
  }

  getTables(){
    this.tableService.getTable().subscribe((data)=>{
      this.tables = data;
      console.log(this.tables.data);
    })
  }

  request(e: Event) {
    e.preventDefault();
    console.log(e);

    for (const item of this.tables.data) {
      console.log('id',item.id );
    }

  }

  eliminarElemento(id: number) {
    // Mostrar una alerta SweetAlert2 de confirmación
    Swal.fire({
      title: '¿Estás seguro de eliminar esta mesa?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Realizar una solicitud HTTP DELETE al servidor
        // Asegúrate de ajustar la URL de la API según tus necesidades
        fetch(`http://localhost:3000/api/v1/table/${id}`, {
          method: 'DELETE',
        })
        .then(response => {
          if (response.status === 200) {
            // Eliminar la mesa del arreglo en tu componente
            this.tables.data = this.tables.data.filter(table => table.id !== id);
            Swal.fire('Eliminado', 'La mesa ha sido eliminada.', 'success');
          } else {
            Swal.fire('Error', 'No se pudo eliminar la mesa.', 'error');
          }
        })
        .catch(error => {
          console.error(error);
          Swal.fire('Error', 'No se pudo conectar al servidor.', 'error');
        });
      }
    });
  }



    actualizarMesa(id: number) {
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

              if (response === 200) {
                Swal.fire('Actualizado', 'Los cambios han sido guardados.', 'success');
              } else {
                Swal.fire('Error', 'No se pudo actualizar la mesa.', 'error');
              }
            });
          }
        });
      });
  }







}
