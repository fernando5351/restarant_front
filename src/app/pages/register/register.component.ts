import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {


  hola = "hola";
  onClick = false;

  async saludar() {
    this.onClick = !this.onClick;
    if (this.onClick) {
      alert("hola mundo");
    }
  }

}
