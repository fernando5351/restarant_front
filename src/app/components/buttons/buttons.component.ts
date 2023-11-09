import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Delete } from 'src/app/models/delete.model';
import { DeleteService } from 'src/app/services/delete/delete.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  @Input() id:number = 0;
  @Input() url: string | null = null;
  @Input() apiUrl: string = '';
  @Output() clickEvent: EventEmitter<number> = new EventEmitter<number>();

  data: Delete = {
    statusCode: 0,
    message: '',
    data: 0
  }

  constructor(
    private router: Router,
    private deleteService: DeleteService
  ) {}

  update(id: number) {
    console.log(id);

    if (this.url !== null) {
      this.router.navigate([this.url]);
    } else {
      this.clickEvent.emit(id);
    }
  }

  delete(id: number) {
    console.log(id);
    Swal.fire({
      title: '¿Estas seguro de eliminar este registro?',
      text: "¡No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteService.delete(this.apiUrl).subscribe({
          next: (response) => {
            this.data = response;
            console.log(this.data);
            if (this.data.statusCode === 202) {
              Swal.fire({
                title: 'Eliminado!',
                text: 'Tu registro fue eliminado.',
                icon: 'success',
                timer: 2500
              });
              window.location.reload();
            }
          },
          error: (error) => {
            console.log(error);
          }
        })
      } else {
        Swal.fire({
          title: 'Cancelado',
          text: 'Tu registro esta a salvo :)',
          icon:'error',
          timer: 2500
        });
      }
    })
  }
}
