import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({});
  passwordVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  sendRequest(e: Event) {
    e.preventDefault();
    if (this.form) {
      const password = this.form.get('password')?.value;
      const email = this.form.get('email')?.value;

      this.authService.loginAndGet(email, password).subscribe({
        next: (response) => {
          if (response.statusCode == 200) {
            this.router.navigate(['/home']);
          } else {
             console.log(response);
          }
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
