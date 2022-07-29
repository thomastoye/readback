import { Injectable } from '@angular/core';
import { collection, setDoc, doc, CollectionReference, Firestore, collectionSnapshots, GeoPoint } from '@angular/fire/firestore';
import { deleteDoc } from '@firebase/firestore';
import { differenceInSeconds, formatDistance } from 'date-fns';
import nlBE from 'date-fns/locale/nl-BE';
import { Observable, map, combineLatest, switchMap, catchError, interval, startWith } from 'rxjs';
import { UserService } from './user.service';

export type TrackDoc = {
  position: GeoPoint
  received: number
}

export type TraceDoc = {
  dmrId: string
  position: GeoPoint
  received: number
}

export type DmrIdDoc = {
  crewName: string
}

@Injectable({
  providedIn: 'root'
})
export class CrewLocationService {
  private trackColl: CollectionReference<TrackDoc>
  private traceColl: CollectionReference<TraceDoc>
  private dmrIdColl: CollectionReference<DmrIdDoc>

  constructor(
    private firestore: Firestore,
    private user: UserService
  ) {
    this.trackColl = collection(firestore, 'track') as CollectionReference<TrackDoc>
    this.traceColl = collection(firestore, 'trace') as CollectionReference<TraceDoc>
    this.dmrIdColl = collection(firestore, 'dmr-id') as CollectionReference<DmrIdDoc>
  }

  getKnownDmrIds$(): Observable<readonly {
    dmrId: string,
    crewName: string
    lastHeard: number | null
  }[]> {
    return this.user.user$.pipe(switchMap(_ => combineLatest([ collectionSnapshots(this.dmrIdColl), collectionSnapshots(this.trackColl) ])), map(([dmrIdSnaps, trackSnaps]) => {
      const list: {
        dmrId: string
        crewName: string
        lastHeard: number | null
      }[] = dmrIdSnaps.map(snap => {
        return {
          dmrId: snap.id,
          crewName: snap.data().crewName,
          lastHeard: trackSnaps.find(trackSnap => trackSnap.id === snap.id)?.data().received || null
        };
      });

      return list.sort((a, b) => a.crewName.localeCompare(b.crewName))
    }, catchError((err) => {
      console.log(err)
      return []
    })))
  }

  getUnknownDmrIds$(): Observable<readonly {
    dmrId: string
    lastHeard: number
  }[]> {
    return this.user.user$.pipe(switchMap(_ => combineLatest([ collectionSnapshots(this.dmrIdColl), collectionSnapshots(this.trackColl) ])), map(([dmrIdSnaps, trackSnaps]) => {
      return trackSnaps.filter(trackSnap => !dmrIdSnaps.map(dmrIdSnap => dmrIdSnap.id).includes(trackSnap.id)).map(trackSnap => {
        return {
          dmrId: trackSnap.id,
          lastHeard: trackSnap.data().received
        }
      })
    }), catchError((err) => {
      console.error(err)
      return []
    }))
  }

  getPositions$(): Observable<readonly {
    crewName: string
    dmrId: string
    position: {
      lat: number
      lng: number
    }
    received: Date
    howLongAgoSeconds: number
    howLongAgoFormat: string
  }[]> {
    return combineLatest([collectionSnapshots(this.dmrIdColl), collectionSnapshots(this.trackColl), interval(5000).pipe(startWith(new Date()), map(_ => new Date()))]
    ).pipe(
      map(([dmrIdDocs, trackDocs, now]) => {
        return trackDocs.map(trackDoc => {
          const dmrId = trackDoc.id
          const dmrIdData = dmrIdDocs.find(dmrIdDoc => dmrIdDoc.id === dmrId)
          const crewName = dmrIdData?.data().crewName || `<DMR:${dmrId}>`
          const trackDocData = trackDoc.data()

          const received = new Date(trackDocData.received)

          return {
            crewName,
            dmrId,
            received,
            howLongAgoSeconds: differenceInSeconds(now, received),
            howLongAgoFormat: formatDistance(now, received, { locale: nlBE }),
            position: {
              lat: trackDocData.position.latitude,
              lng: trackDocData.position.longitude
            }
          }
        })
      })
    )
  }

  removeCrew(dmrId: string): Promise<void> {
    return deleteDoc(doc(this.dmrIdColl, dmrId))
  }

  setCrewName(dmrId: string, crewName: string): Promise<void> {
    return setDoc(doc(this.dmrIdColl, dmrId), { crewName }, { merge: true })
  }
}
