import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CrewLocationService } from '../crew-location.service';
import { NameDialogComponent } from '../name-dialog/name-dialog.component';

@Component({
  selector: 'app-crew-management',
  templateUrl: './crew-management.component.html',
  styleUrls: ['./crew-management.component.scss']
})
export class CrewManagementComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>()

  knownDmrIds$: Observable<readonly {
    dmrId: string;
    crewName: string;
  }[]> | null = null

  unknownDmrIds$: Observable<readonly {
    dmrId: string;
    lastHeard: number
  }[]> | null = null

  constructor(
    private crewService: CrewLocationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.knownDmrIds$ = this.crewService.getKnownDmrIds$().pipe(takeUntil(this.onDestroy$))
    this.unknownDmrIds$ = this.crewService.getUnknownDmrIds$().pipe(takeUntil(this.onDestroy$))
  }

  ngOnDestroy(): void {
    this.onDestroy$.next()
  }

  rename(dmrId: string) {
    this.dialog.open<NameDialogComponent, null, { name: string }>(NameDialogComponent).afterClosed().subscribe((data) => {
      if (data != null) {
        this.crewService.setCrewName(dmrId, data.name)
      }
    })
  }
}
