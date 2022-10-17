import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CrewEditComponent } from '../../components/crew-edit/crew-edit.component';
import { CrewComponent } from '../../components/crew/crew.component';

import { CrewPageComponent } from './crew-page.component';

describe('CrewPageComponent', () => {
  let component: CrewPageComponent;
  let fixture: ComponentFixture<CrewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrewPageComponent, CrewComponent, CrewEditComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CrewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
