import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {GetCategory,GetCategories} from 'src/app/models/category.models';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = `${environment.API_URL}/category`;

  constructor(
    private http: HttpClient,
  ) { }

  createCategory(dto: FormData){
    return this.http.post<GetCategory>(`${this.url}`,dto);
  }

  getCategories(){
    return 	this.http.get<GetCategories>(`${this.url}`);
  }

  patchCategory(dto: FormData, id: number){
    return this.http.patch(`${this.url}/${id}`,dto);
  }

  deleteCategory(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
