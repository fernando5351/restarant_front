import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrintsaleService {
  private printSaleSubject = new Subject<any>();
  public miVariable$ = new BehaviorSubject<boolean>(false);

  printSale$ = this.printSaleSubject.asObservable();

  sendPrintData(data: any) {
    this.printSaleSubject.next(data);
  }
}
