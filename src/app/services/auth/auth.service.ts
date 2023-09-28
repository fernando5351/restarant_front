import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { AuthUser, getUser } from '../../models/user.model';
import { TokenService } from '../token/token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) { }

  isLoading$(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  private setLoading(isLoading: boolean) {
    this.isLoadingSubject.next(isLoading);
  }

  redirectToLogin(redirectUrl: string): boolean {
    this.router.navigate(['/login'], { queryParams: { returnUrl: redirectUrl } });
    return false;
  }

  login(email: string, password: string) {
    return this.http.post<AuthUser>(`${this.apiUrl}/auth/login`,
      { email, password },
      { observe: 'response' }
    ).pipe(
      tap(response => {
        this.tokenService.saveToken(response.body?.token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  getProfile(id: number | undefined) {
    return this.http.get<getUser>(`${this.apiUrl}/user/${id}`)
    .pipe(
      tap(user => {
        this.tokenService.saveUser(user.data);
      })
    )
  }

  loginAndGet(email: string, password: string): Observable<getUser> {
    this.setLoading(true);
    return this.login(email, password)
      .pipe(
        switchMap(response => this.getProfile(response.body?.data.id)),
        finalize(()=> {
          this.setLoading(false);
        })
      );
  }

  logout(): void {
    this.setLoading(true);
    this.tokenService.removeToken();
    this.isAuthenticatedSubject.next(false);
    this.setLoading(false);
  }

  isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
