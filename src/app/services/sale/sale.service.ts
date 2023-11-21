import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParamsOptions } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service'

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  url = environment.API_URL;
  constructor(
    private loading: AlertService,
    private httpClient: HttpClient
  ) { }

  search(name: string) {
    this.loading.showLoading();
    return this.httpClient
  }

}
