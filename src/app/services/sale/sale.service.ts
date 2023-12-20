import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service'
import { finalize } from 'rxjs';
import { GetSales, GetSearch, SaleGet, SaleInsert, SaleInsertResponse, SaleModel } from 'src/app/models/sale.model';
import { SaleResponse } from 'src/app/models/saleUpdate.Model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private url = environment.API_URL;
  constructor(
    private loading: AlertService,
    private httpClient: HttpClient
  ) { }

  search(name: string, status: boolean) {
    this.loading.showLoading();
    return this.httpClient.post<GetSearch>(`${this.url}/combs/search-all`,{status, name}).pipe(
      finalize(()=> {
        this.loading.hideLoading();
      })
    );
  }

  GetSale(){
    this.loading.showLoading();
    return this.httpClient.get<GetSales>(`${this.url}/sale`).pipe(
      finalize(()=> {
        this.loading.hideLoading();
      })
    );
  }

  GetSaleById(id: number){
    this.loading.showLoading();
    return this.httpClient.get<SaleResponse>(`${this.url}/sale/${id}`).pipe(
      finalize(()=> {
        this.loading.hideLoading();
      })
    );
  }


  create(data: SaleInsert){
    this.loading.showLoading();
    return this.httpClient.post<SaleInsertResponse>(`${this.url}/sale`, data).pipe(
      finalize(()=> {
        this.loading.hideLoading();
      })
    );
  }

  updateSale(dto: SaleInsert, id: number ){
    this.loading.showLoading();
    return this.httpClient.patch<SaleInsertResponse>(`${this.url}/sale/${id}`, dto).pipe(
      finalize(()=> {
        this.loading.hideLoading();
      })
    );
  }

  getSalesByStatus(status: boolean) {
    this.loading.showLoading();
    return this.httpClient.get<GetSales>(`${this.url}/sale`, { params: { status: status.toString() } }).pipe(
      finalize(() => {
        this.loading.hideLoading();
      })
    );
  }

  // Asegúrate de tener un método en tu servicio que maneje las fechas
  getSalesByDate(startDate: string, endDate: string) {
    this.loading.showLoading();
    return this.httpClient.get<GetSales>(`${this.url}/sale/date`, { params: { start: startDate, end: endDate } }).pipe(
      finalize(() => {
        this.loading.hideLoading();
      })
    );
}

}

