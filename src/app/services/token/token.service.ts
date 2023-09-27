import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string | undefined) {
    console.log('Token recibido:', token); // Agrega esta línea para depurar
    if (token) {
      localStorage.setItem('token', token);
    } else {
      console.error('El token es undefined');
    }
  }


  getToken(){
    return localStorage.getItem('token');
  }

  removeToken(){
    localStorage.removeItem('token');
  }

}
