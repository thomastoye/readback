import { Component, OnDestroy, OnInit } from '@angular/core';
import { Crew, CrewService } from '../../services/crew.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'readback-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss'],
})
export class CrewComponent implements OnInit, OnDestroy {
  crews$: Observable<readonly Crew[]> | null = null
  destroy$ = new Subject<void>()

  constructor(
    private crewService: CrewService
  ) {
  }

  ngOnInit(): void {
    this.crews$ = this.crewService.getAllCrews().pipe(takeUntil(this.destroy$))
  }

  ngOnDestroy(): void {
      this.destroy$.next()
  }

  submitCrew(ev: Crew): void {
    this.crewService.addCrew({ ...ev })
  }
}
