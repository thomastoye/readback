import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

type CrewModel = {
  name: string
  description: string | null
}

@Component({
  selector: 'readback-crew-edit',
  templateUrl: './crew-edit.component.html',
  styleUrls: ['./crew-edit.component.scss'],
})
export class CrewEditComponent implements OnInit {
  @Output() submitCrew = new EventEmitter<CrewModel>()

  model = {
    name: null,
    description: null
  }

  constructor() {}

  ngOnInit(): void {}

  submit(form: NgForm) {
    if (this.model.name != null) {
      this.submitCrew.emit({
        name: this.model.name,
        description: this.model.description
      })

      form.reset()
    }
  }
}
