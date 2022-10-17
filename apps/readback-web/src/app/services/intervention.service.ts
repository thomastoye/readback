import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Intervention = {
  readonly name: string
  readonly description: string | null
}

const INITIAL_INTERVENTIONS: readonly Intervention[] = []

@Injectable({
  providedIn: 'root'
})
export class InterventionService {
  #interventions = new BehaviorSubject([] as readonly Intervention[])

  constructor() {
    this.#interventions.next(INITIAL_INTERVENTIONS)
  }

  addIntervention(intervention: Intervention) {
    this.#interventions.next([...this.#interventions.getValue(), intervention])
  }

  getAllInterventions(): Observable<readonly Intervention[]> {
    return this.#interventions.asObservable()
  }
}
