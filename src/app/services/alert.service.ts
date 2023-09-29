import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  isLoading$() {
    return this.loadingSubject.asObservable();
  }

  showLoading() {
    this.loadingSubject.next(true);
  }

  hideLoading() {
    this.loadingSubject.next(false);
  }
}
