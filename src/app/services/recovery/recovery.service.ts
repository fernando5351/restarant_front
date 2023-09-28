import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {
  private apiUrl = `${environment.API_URL}`;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getProfile(email: string | undefined) {
    return this.http.post<unknown>(`${this.apiUrl}/user`, {email}, { observe: 'response' })
    .pipe(
      tap(response => {
        console.log(response);
      })
    )
  }
}
