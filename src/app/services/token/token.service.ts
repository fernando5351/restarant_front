import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string | undefined) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      console.error('El token es undefined');
    }
  }

  saveUser(user: User | undefined) {
    if (user) {
      const User = JSON.stringify(user)
      localStorage.setItem('user', User);
    } else {
      console.error('El token es undefined');
    }
  }


  getToken(){
    return localStorage.getItem('token');
  }

  getUser(){
    return <User>JSON.parse(<string>(localStorage.getItem("user")));
  }

  removeToken(){
    localStorage.removeItem('token');
    localStorage.removeItem('user')
  }

}
