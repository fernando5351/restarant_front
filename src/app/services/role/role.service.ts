import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {GetRole,GetRoles} from '../../models/role.model';
import {AlertService} from '../alert.service';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url = `${environment.API_URL}/role`;
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


    pathcRole(dto: FormData, id: number){
      this.loadingService.showLoading();
      return this.http.patch(`${this.url}/${id}`, dto ).pipe(
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
    };


    deleteRole(id: number){
      this.loadingService.showLoading();
      return this.http.delete(`${this.url}/${id}`).pipe(
        finalize(() => {
          this.loadingService.hideLoading();
        })
      )
      };


}
