import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-name-dialog',
  templateUrl: './name-dialog.component.html',
  styleUrls: ['./name-dialog.component.scss']
})
export class NameDialogComponent implements OnInit {

  constructor(
    private dialog: MatDialogRef<NameDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  submitName(name: string) {
    this.dialog.close({ name })
  }
}
