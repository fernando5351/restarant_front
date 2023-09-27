import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User, AuthUser, getUser } from '../../models/user.model';
import { TokenService } from '../token/token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}`;
  private user = new BehaviorSubject<User | null | undefined >(null);
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  // login(email: string, password: string){
  //   return this.http.post<AuthUser>(`${this.apiUrl}/auth/login`, { email, password })
  //   .pipe(
  //     tap(response => this.tokenService.saveToken(response.token))
  //   );
  // }
  login(email: string, password: string) {
    return this.http.post<AuthUser>(`${this.apiUrl}/auth/login`,
      { email, password },
      { observe: 'response' }
    ).pipe(
      tap(response => this.tokenService.saveToken(response.body?.token)),
      tap(response => this.user.next(response.body?.data))
    );
  }

  valorUser() {
    return this.user$
  }

  getProfile(id: number | undefined) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.tokenService.getToken()
      })
    };
    return this.http.get<getUser>(`${this.apiUrl}/user/${id}`, httpOptions)
    .pipe(
      tap(user => this.user.next(user.data))
    )
  }

  loginAndGet(email: string, password: string): Observable<getUser> {
    return this.login(email, password)
      .pipe(
        switchMap(response => this.getProfile(response.body?.data.id))
      );
  }

  logout() {
    this.tokenService.removeToken();
    this.user.next(null);
  }
}
