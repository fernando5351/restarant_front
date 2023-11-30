import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {GetRole,GetRoles, Role} from '../../models/role.model';

import {AlertService} from '../alert.service';
import { Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url = `${environment.API_URL}/rol`;
  constructor(
    private http: HttpClient,
    private loadingService: AlertService
  ) { }

    createRole(dto: FormData){
      this.loadingService.showLoading();
      return this.http.post<GetRole>(`${this.url}`, dto).pipe(
        finalize(()=>{
          this.loadingService.hideLoading();
        })
      );
    }

    getRoles(){
      this.loadingService.showLoading();
      return this.http.get<GetRoles>(`${this.url}`).pipe(
        finalize(()=>{
          this.loadingService.hideLoading();
        })
      );
    };

    getRoleById(id: number){
      this.loadingService.showLoading();
      return this.http.get<GetRole>(`${this.url}/${id}`).pipe(
        finalize(()=>{
          this.loadingService.hideLoading();
        })
      );
    }

    search(name: string) {
      return this.http.get<GetRoles>(`${this.url}/search/${name}`);
    }

    pathcRole(dto: Role, id: number): Observable<any> {
      this.loadingService.showLoading();
      return this.http.patch(`${this.url}/${id}`, dto ).pipe(
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
    };


    deleteRole(id: number): Observable<any>{
      this.loadingService.showLoading();
      return this.http.delete(`${this.url}/${id}`).pipe(
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
      };


}
