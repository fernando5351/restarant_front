import { Component } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    private tokenService: TokenService,
    private router: Router
    ) {}

  logOut(){
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }

}
