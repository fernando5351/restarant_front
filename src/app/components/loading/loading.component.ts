import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  isLoading: boolean = false;

  constructor(
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.alertService.isLoading$().subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
}
