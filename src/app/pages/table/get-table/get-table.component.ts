import { Component,OnInit } from '@angular/core';
import {GetTables} from '../../../models/table.model';
import {TableService} from '../../../services/table/table.service';

@Component({
  selector: 'app-get-table',
  templateUrl: './get-table.component.html',
  styleUrls: ['./get-table.component.scss']
})
export class GetTableComponent implements OnInit {

  table: GetTables = {
    statusCode: 0,
    messsage: '',
    data: [
      {
        id: 0,
        quantity: 0,
        status: '',
        number: 0
      }
    ]
  }

  constructor (private tableService: TableService){};

  ngOnInit(): void {
    this.getTables()
  }

  getTables(){
    this.tableService.getTable().subscribe((data)=>{
      this.table = data;
      console.log(this.table.data);
    })
  }

}
