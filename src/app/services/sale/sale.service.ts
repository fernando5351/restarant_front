import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service'
import { Observable, finalize } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetSales, GetSearch, SaleInsert, SaleInsertResponse, SaleModel, SaleResponse } from 'src/app/models/sale.model';
import { Combo, GetCombos } from 'src/app/models/combo.model';
import { GetProducts, Products } from 'src/app/models/product.model';

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

  getSaleById(id: number){
    this.loading.showLoading();
    return this.httpClient.get<SaleModel>(`${this.url}/sale/${id}`).pipe(
      finalize(()=> {
        this.loading.hideLoading();
      })
    )
   }

   updateSale(saleId: number, data: SaleInsert): Observable<any> {
    this.loading.showLoading();
    return this.httpClient.put<SaleResponse>(`${this.url}/sale/${saleId}`, data).pipe(
      finalize(() => {
        this.loading.hideLoading();
      })
    );
  }



  create(data: SaleInsert){
    this.loading.showLoading();
    return this.httpClient.post<SaleInsertResponse>(`${this.url}/sale`, data).pipe(
      finalize(()=>  {
        this.loading.hideLoading();
      })
    );
  }

}
