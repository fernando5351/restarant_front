import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../alert.service';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs';
import { Delete } from 'src/app/models/delete.model';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  private url = `${environment.API_URL}`;

  constructor(
    private http: HttpClient,
    private loadingService: AlertService,
  ) { }

  delete(url: string) {
    console.log(url);
    this.loadingService.showLoading();
    return this.http.delete<Delete>(`${this.url}${url}`).pipe(
      finalize(()=> {
        this.loadingService.hideLoading();
      })
    )
  }
}
