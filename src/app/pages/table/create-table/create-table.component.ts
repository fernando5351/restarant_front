import { Component,OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {CreateTable} from  '../../../models/table.model';
import {TableService} from '../../../services/table/table.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.scss']
})
export class CreateTableComponent {
    form: FormGroup = new FormGroup({});


    constructor(
      private formBuilder: FormBuilder,
      private tableService: TableService,
      private router: Router
    ){}

    ngOnInit(){
      this.form=this.formBuilder.group({
        number:['',[Validators.required]],
        quantity:['',[Validators.required]],
        status: ['Estado',[Validators.required]]
      });
    };

    sendRequest(event: Event){
      event.preventDefault();


      const dto: CreateTable = {
        number: this.form.get('number')?.value,
        quantity: this.form.get('quantity')?.value,
        status: this.form.get('status')?.value
      };

      // if(dto.number >= 0 || dto.quantity ){
      //   Swal.fire({
      //     position: 'top-end',
      //     icon: 'error',
      //     title: 'No puedes guardar una mesa con valor de cero o menor ',
      //     showConfirmButton: false,
      //     timer: 1600
      //   });
      //   return
      // }

      const formData = new FormData();
      formData.append('number',dto.number.toString());
      formData.append('quantity',dto.quantity.toString());
      formData.append('status',dto.status);

      this.tableService.createTable(formData).subscribe({
        next:(response)=>{
          console.log(response);
          if (response.statusCode == 201) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Mesa creada exitosamente',
              showConfirmButton: true,
            })
          }
          this.router.navigate(['/table'])
        },
        error:(error)=>{
          console.log("Error",error)
          if (error.status == 400) {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Algo salio mal verifica que envias los datos correctamente',
              timer: 2000
            })
          } else if(error.status == 409){
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'el numero de la mesa ya existe',
              timer: 3000
            })
          }
        }
      });

    };

}
