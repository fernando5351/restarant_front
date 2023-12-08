import { Component, OnInit } from '@angular/core';
import {GetTables, GetTable} from '../../../models/table.model';
import {TableService} from '../../../services/table/table.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-table',
  templateUrl: './get-table.component.html',
  styleUrls: ['./get-table.component.scss']
})
export class GetTableComponent implements OnInit  {

  placeholder = 'Buscar mesa...';
  btn = 'Crear mesa';
  url = '/create-table';

   tables: GetTables = {
    statusCode: 0,
    message: '',
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
    message: '',
    data: {
      id: 0,
      quantity: 0,
      status: '',
      number: 0,
    }
  };
  constructor (
    private tableService: TableService
    ){};

  ngOnInit(): void {
    this.getTables()
  }


  getTables() {
    this.tableService.getTable().subscribe(
      (data) => {
        this.tables = data;
        // console.log(this.tables.data);
      },
      (error) => {
        console.error('Error al obtener las mesas:', error);
        // Aquí puedes manejar el error de acuerdo a tus necesidades, por ejemplo, mostrando un mensaje de error al usuario.
        if (error.status === 409) {

        }
      }
    );
  }


  searchByNumber(search: string ) {
    let number: number = parseInt(search);
    if ( !isNaN(number) && number > 0) {
      this.tableService.search(number).subscribe((response) => {
        this.tables.data = response.data;

      })
    } else  {
      this.getTables()
    }
    // console.log(number);
  }



}
