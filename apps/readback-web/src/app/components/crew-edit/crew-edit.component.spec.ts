import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CrewEditComponent } from './crew-edit.component';

describe('CrewEditComponent', () => {
  let component: CrewEditComponent;
  let fixture: ComponentFixture<CrewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrewEditComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CrewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
