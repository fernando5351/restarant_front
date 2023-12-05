import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../alert.service';
import { GetSales, GetSale } from 'src/app/models/report.model';
import { finalize } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private url = `${environment.API_URL}/report`

  constructor(
    private http: HttpClient,
    private loadingService: AlertService
  ) { }

  getReports(){
    this.loadingService.showLoading()
    return this.http.get<GetSales>(`${this.url}`).pipe(
      finalize(()=>{
        this.loadingService.hideLoading();
      })
    )
  }

  getReportById(id:number){
    this.loadingService.showLoading();
    return this.http.get<GetSale>(`${this.url}/${id}`).pipe(
      finalize(()=>{
        this.loadingService.hideLoading();
      })
    )
  }

  getSalesByDate(startDate: string, endDate: string) {
    this.loadingService.showLoading();
    return this.http.get<GetSales>(`${this.url}/date?start=${startDate}&end=${endDate}`).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }
}


