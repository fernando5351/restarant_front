import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service'
import { finalize } from 'rxjs';
import { GetSales, GetSearch, SaleInsert, SaleInsertResponse, SaleResponse } from 'src/app/models/sale.model';
import { Combo, GetCombos } from 'src/app/models/combo.model';
import { GetProducts, Products } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  url = environment.API_URL;
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

  create(data: SaleInsert){
    this.loading.showLoading();
    return this.httpClient.post<SaleInsertResponse>(`${this.url}/sale`, data).pipe(
      finalize(()=> {
        this.loading.hideLoading();
      })
    );
  }

}
