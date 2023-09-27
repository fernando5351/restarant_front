import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string | undefined) {
    console.log('Token recibido:', token);
    if (token) {
      localStorage.setItem('token', token);
    } else {
      console.error('El token es undefined');
    }
  }

  saveUser(user: User | undefined) {
    console.log('user recibido:', user);
    if (user) {
      const User = JSON.stringify(user)
      sessionStorage.setItem('user', User);
    } else {
      console.error('El token es undefined');
    }
  }


  getToken(){
    return localStorage.getItem('token');
  }

  getUser(){
    return <User>JSON.parse(<string>(sessionStorage.getItem("user")));
  }

  removeToken(){
    localStorage.removeItem('token');
    sessionStorage.removeItem('user')
  }

}
