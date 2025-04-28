import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInStatusSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  loggedInStatus$ = this.loggedInStatusSubject.asObservable();

  constructor() {}

  checkLoginStatus(): boolean {
    return !!localStorage.getItem('id');
  }

  setLoginStatus(status: boolean): void {
    if (status) {
      localStorage.setItem('id', 'some-id');
    } else {
      localStorage.removeItem('id');
    }
    this.loggedInStatusSubject.next(status);
  }
}
