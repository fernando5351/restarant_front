import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {GetCategory,GetCategorys} from 'src/app/models/cat.models';
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

  getCategorys(){
    return 	this.http.get<GetCategorys>(`${this.url}`);
  }

  patchCategory(dto: FormData, id: number){
    return this.http.patch(`${this.url}/${id}`,dto);
  }

  deleteCategory(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
