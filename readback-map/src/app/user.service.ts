import { Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { distinct, interval, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user$: Observable<User | null>

  constructor(private auth: Auth) {
    this._user$ = interval(300).pipe(map(_ => this.auth.currentUser), distinct((user) => (user?.uid)), tap(user => {
      console.log('User update', user?.uid)
    }))
  }

  get user$() {
    return this._user$
  }
}
