import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http';
import {GetTable,GetTables, Table} from '../../models/table.model';
import {AlertService} from '../alert.service';
import {finalize} from 'rxjs'
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private url = `${environment.API_URL}/table`;

  constructor(
    private http: HttpClient,
    private loadingService: AlertService
  ) { }

  createTable(dto: FormData){
    this.loadingService.showLoading();
    return this.http.post<GetTable>(`${this.url}`, dto).pipe(
      finalize(()=>{
        this.loadingService.hideLoading()
      })
    );
  };

  getTable(){
    this.loadingService.showLoading();
    return this.http.get<GetTables>(`${this.url}`).pipe(
      finalize(()=>{
        this.loadingService.hideLoading()
      })
    );
  };

  getTableById(id:number){
    this.loadingService.showLoading();
    return this.http.get<GetTable>(`${this.url}/${id}`).pipe(
      finalize(()=>{
        this.loadingService.hideLoading();
      })
    );
  };

  patchTable(dto: Table, id: number){
    this.loadingService.showLoading();
    return this.http.patch(`${this.url}/${id}`, dto).pipe(
      finalize(()=>{
        this.loadingService.hideLoading();
      })
    );
  };


  deleteTable(id: number){
    this.loadingService.showLoading();
    return this.http.delete(`${this.url}/${id}`).pipe(
      finalize(()=>{
        return this.loadingService.hideLoading();
      })
    );
  };



}
