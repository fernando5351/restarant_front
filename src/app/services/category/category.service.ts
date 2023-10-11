import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetCategory, GetCategories, CategoryDetail } from 'src/app/models/category.models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = `${environment.API_URL}/category`;

  constructor(
    private http: HttpClient,
  ) { }

  createCategory(dto: FormData): Observable<GetCategory> {
    return this.http.post<GetCategory>(`${this.url}`, dto);
  }

  getCategories(): Observable<GetCategories> {
    return this.http.get<GetCategories>(`${this.url}`);
  }

  getCategoryById(id: number): Observable<CategoryDetail> {
    return this.http.get<CategoryDetail>(`${this.url}/${id}`);
  }

  patchCategory(dto: FormData, id: number): Observable<any> {
    return this.http.patch(`${this.url}/${id}`, dto);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
