import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service'
import { finalize } from 'rxjs';
import { GetSales } from 'src/app/models/sale.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  url = environment.API_URL + '/combs';
  constructor(
    private loading: AlertService,
    private httpClient: HttpClient
  ) { }

  search(name: string, status: boolean) {
    this.loading.showLoading();
    return this.httpClient.post<GetSales>(`${this.url}/search-all`,{status, name}).pipe(
      finalize(()=> {
        this.loading.hideLoading();
      })
    );
  }

  create(data: any){

  }

}
