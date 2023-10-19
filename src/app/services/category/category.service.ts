import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { GetCategory, GetCategories, CategoryDetail, Category } from 'src/app/models/category.models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = `${environment.API_URL}/category`;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) { }

  createCategory(dto: FormData): Observable<GetCategory> {
    this.alertService.showLoading();
    return this.http.post<GetCategory>(`${this.url}`, dto).pipe(
      finalize(() => {
        this.alertService.hideLoading();
      })
    );
  }

  getCategories(): Observable<GetCategories> {
    this.alertService.showLoading();
    return this.http.get<GetCategories>(`${this.url}`).pipe(
      finalize(() => {
        this.alertService.hideLoading();
      })
    );
  }

  getCategoryById(id: number): Observable<GetCategory> {
    this.alertService.showLoading();
    return this.http.get<GetCategory>(`${this.url}/${id}`).pipe(
      finalize(() => {
        this.alertService.hideLoading();
      })
    );
  }

  search(name: string) {
    return this.http.get<GetCategories>(`${this.url}/search/${name}`);
  }

  patchCategory(dto: FormData, id: number): Observable<any> {
    this.alertService.showLoading();
    return this.http.patch(`${this.url}/${id}`, dto).pipe(
      finalize(()=> {
        this.alertService.hideLoading();
      })
    );
  }

  deleteCategory(id: number): Observable<any> {
    this.alertService.showLoading();
    return this.http.delete(`${this.url}/${id}`).pipe(
      finalize(()=>{
        this.alertService.hideLoading();
      })
    );
  }
}
