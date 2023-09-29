import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AlertService } from '../alert.service';

@Injectable({
  providedIn: 'root'
})

export class RecoveryService {
  private apiUrl = `${environment.API_URL}`;

  constructor(
    private http: HttpClient,
    private loadingService: AlertService,
  ) { }

  recoveryAccount(email: string | undefined) {
    this.loadingService.showLoading();
    return this.http.post<unknown>(`${this.apiUrl}/auth/recovery`, {email}, { observe: 'response' })
    .pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    )
  }

  recoveryPassword(password: string, token: string){
    this.loadingService.showLoading();
    console.log(token);
    return this.http.post(`${this.apiUrl}/auth/recovery-password?token=${token}`, { password }).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    )
  }
}
