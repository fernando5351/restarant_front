import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateProduct, GetProduct, GetProducts } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = `${environment.API_URL}/product`;

  constructor(
    private http: HttpClient,
  ) { }

  createProduct(dto: FormData) {
    return this.http.post<GetProduct>(`${this.url}`, dto);
  }

  getProducts() {
    return  this.http.get<GetProducts>(`${this.url}`);
  }

  patchProduct(dto: FormData, id: number) {
    return this.http.patch(`${this.url}/${id}`, dto);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
