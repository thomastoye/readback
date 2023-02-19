import { Component } from '@angular/core'
import { map, Observable, shareReplay } from 'rxjs'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

@Component({
  selector: 'readback-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'readback-web'

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    )

  constructor(private breakpointObserver: BreakpointObserver) {}
}
