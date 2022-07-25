import { Component, OnDestroy, OnInit } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup, Auth, User } from '@angular/fire/auth';
import { interval, map, Observable, Subject, takeUntil } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  user$: Observable<User | null> | null = null
  destroy$: Subject<void> = new Subject()

  constructor(private auth: Auth, private user: UserService) {
  }

  ngOnInit(): void {
    this.user$ = this.user.user$.pipe(takeUntil(this.destroy$))
  }

  ngOnDestroy(): void {
    this.destroy$.next()
  }

  async signIn() {
    try {
      const credential = await signInWithPopup(this.auth, new GoogleAuthProvider())
      console.log('Logged in', credential)
    } catch (err) {
      console.error('Error signing in', err)
    }
  }

  signOut() {
    this.auth.signOut()
  }

}
