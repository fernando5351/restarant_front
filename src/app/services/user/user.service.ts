import { Injectable } from '@angular/core';
import {AlertService } from '../alert.service';
import {environment} from '../../../environments/environment'
import {HttpClient} from '@angular/common/http';
import {GetUser, getUsers,User} from '../../models/user.model';
import {GetRoles} from '../../models/role.model';
import { finalize } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url  = `${environment.API_URL}/user`;

  constructor(
    private http: HttpClient,
    private loadingServices: AlertService
  ) {};

  createUser(dto: FormData){
    this.loadingServices.showLoading();
    return this.http.post<GetUser>(`${this.url}/register`,dto).pipe(
      finalize(()=>{
        this.loadingServices.hideLoading();
      })
    );
  }

  getUsers(){
    this.loadingServices.showLoading();
    return this.http.get<getUsers>(`${this.url}`).pipe(
      finalize(()=>{
        this.loadingServices.hideLoading();
      })
    );
  }

  getUserById(id:number){
    this.loadingServices.showLoading();
    return this.http.get<GetUser>(`${this.url}/${id}`).pipe(
      finalize(()=>{
        this.loadingServices.hideLoading();
      })
    );
  }

  search(name:string){
    return this.http.get<getUsers> (`${this.url}/search/${name}`);
  }

  patchUser(dto: User,id: number){
    this.loadingServices.showLoading();
    return this.http.patch(`${this.url}/${id}`,dto).pipe(
      finalize(()=>{
        this.loadingServices.hideLoading();
      })
    )
  };

  deleteUser(id: number){
    this.loadingServices.showLoading();
    return this.http.delete(`${this.url}/${id}`).pipe(
      finalize(()=>{
        this.loadingServices.hideLoading();
      })
    );
  };
}
