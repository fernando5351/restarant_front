import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { RecoveryService } from 'src/app/services/recovery/recovery.service';


@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent {
  form: FormGroup = new FormGroup({});
  passwordVisible: boolean = false;
  token: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private recovery: RecoveryService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required]],
    });

    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  sendRequest(e: Event) {
    e.preventDefault();
    if (this.form) {
      const password = this.form.get('password')?.value;

      this.recovery.recoveryPassword(password, this.token).subscribe({
        next: (response) => {
            console.log(response);
            this.router.navigate(['/login']);
        },
        error: (error) => {
          if (error.status == 401) {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: error.error.message,
              showConfirmButton: false,
              timer: 1500
            })
          }
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
