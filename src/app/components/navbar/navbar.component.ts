import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$().subscribe((isAuthenticated) => {
      // console.log("init status: " + isAuthenticated);
      this.isAuthenticated = isAuthenticated;
    });
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
