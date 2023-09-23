import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  password: string = '';
  passwordVisible: boolean = false;
  categories :string[] = ['salsas', 'arroz', 'comida'];

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
