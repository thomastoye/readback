import { Component } from '@angular/core';
import { DittoService } from '../../services/ditto.service';

@Component({
  selector: 'readback-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'readback-web';

  constructor(private ditto: DittoService) {}
}
