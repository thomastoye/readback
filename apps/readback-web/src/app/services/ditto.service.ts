import { Injectable, OnDestroy } from '@angular/core';
import { Ditto } from '@dittolive/ditto';

@Injectable({
  providedIn: 'root',
})
export class DittoService implements OnDestroy {
  #ditto: Ditto;

  constructor() {
    console.log('DittoService - constructor');

    this.#ditto = new Ditto();
    this.#ditto.startSync();
  }

  ngOnDestroy(): void {
    console.log('DittoService - ngOnDestroy');
    this.#ditto.stopSync();
  }
}
