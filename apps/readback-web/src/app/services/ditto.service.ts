import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DittoService implements OnDestroy {

  constructor() {
    console.log('DittoService - constructor')
  }

  ngOnDestroy(): void {
      console.log('DittoService - ngOnDestroy')
  }
}
