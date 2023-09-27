import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { AuthUser, User } from 'src/app/models/user.model';

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
          console.log(this.authService.user$);
          if (response.statusCode === 302) {
            console.info(response)
          } else {
            console.log("Soy el usuario: " + response.data.email);
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          console.log("Soy el error");
          const user = error;
          console.error(user);
          this.router.navigate(['/login']);
        }
      });
    }
  }


}
