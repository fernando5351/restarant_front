import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateProduct, GetProduct, GetProducts } from 'src/app/models/product.model';
import { AlertService } from '../alert.service';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = `${environment.API_URL}/product`;

  constructor(
    private http: HttpClient,
    private loadingService: AlertService,
    private alertService: AlertService,
  ) { }

  createProduct(dto: FormData) {
    this.loadingService.showLoading();
    return this.http.post<GetProduct>(`${this.url}`, dto).pipe(
      finalize(()=> {
        this.loadingService.hideLoading();
      })
    );
  }

  getProducts() {
    this.loadingService.showLoading();
    return  this.http.get<GetProducts>(`${this.url}`).pipe(
      finalize(()=> {
        this.loadingService.hideLoading();
      })
    );
  }

  search(name: string) {
    return this.http.get<GetProducts>(`${this.url}/searchbyname/${name}`);
  }

  patchProduct(dto: FormData, id: number) {
    this.loadingService.showLoading();
    return this.http.patch(`${this.url}/${id}`, dto).pipe(
      finalize(()=> {
        this.loadingService.hideLoading();
      })
    );
  }

  deleteProduct(id: number) {
    this.loadingService.showLoading();
    return this.http.delete(`${this.url}/${id}`).pipe(
      finalize(()=> {
        this.loadingService.hideLoading();
      })
    );
  }

}
