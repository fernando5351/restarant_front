import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecoveryService } from 'src/app/services/recovery/recovery.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent {

  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private recoveryService: RecoveryService,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  sendRequest(e: Event) {
    e.preventDefault();
    if (this.form) {
      const email = this.form.get('email')?.value;

      this.recoveryService.recoveryAccount(email).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        }
      })

    }
  }

}
