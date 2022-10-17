import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Crew = {
  readonly name: string
  readonly description: string | null
}

const INITIAL_CREWS: readonly Crew[] = [
{ name: 'India 10', description: null },
  { name: 'India 20', description: null },
  { name: 'Foxtrot 10', description: 'Fietsploeg' }
]

@Injectable({
  providedIn: 'root'
})
export class CrewService {
  #crews = new BehaviorSubject([] as readonly Crew[])

  constructor() {
    this.#crews.next(INITIAL_CREWS)
  }

  addCrew(crew: Crew) {
    this.#crews.next([...this.#crews.getValue(), crew])
  }

  getAllCrews(): Observable<readonly Crew[]> {
    return this.#crews.asObservable()
  }
}
