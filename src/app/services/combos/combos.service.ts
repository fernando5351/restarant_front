import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AlertService } from '../alert.service';
import { GetProducts } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs';
import { GetCombo } from 'src/app/models/combo.model';

@Injectable({
  providedIn: 'root'
})
export class CombosService {
  private url = `${environment.API_URL}/combs`;

  constructor(
    private http:HttpClient,
    private loadingService: AlertService,
  ) { }

  createCombo(dto: FormData) {
    this.loadingService.showLoading();
    return this.http.post<GetCombo>(`${this.url}`, dto).pipe(
      finalize(()=> {
        this.loadingService.hideLoading();
      })
    )
  };

  getCombos(){
    this.loadingService.showLoading();
    return this.http.get<GetProducts>(`${this.url}`).pipe(
      finalize( ()=> {
        this.loadingService.hideLoading();
      })
    )
  }

  getCombo(id: number) {
    this.loadingService.showLoading();
    return this.http.get<GetCombo>(`${this.url}/${id}`).pipe(
      finalize(()=> {
        this.loadingService.hideLoading();
      })
    )
  }

  updateCombo(dto: FormData, id: number) {
    this.loadingService.showLoading();
    return this.http.patch<GetCombo>(`${this.url}/${id}`, dto).pipe(
      finalize(()=> {
        this.loadingService.hideLoading();
      })
    )
  }

}
