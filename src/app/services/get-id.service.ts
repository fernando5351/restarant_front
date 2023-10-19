import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GetIdService {
  id: number = 0;

  setId(id: number) {
    this.id = id;
    sessionStorage.setItem('id', this.id.toString())
  }

  getId() {
    const id = sessionStorage.getItem('id');
    if (id !== null) {
      this.id = parseInt(id, 10);
    }
    return this.id;
  }

  deleteValue(){
    sessionStorage.removeItem('id');
  }
}
