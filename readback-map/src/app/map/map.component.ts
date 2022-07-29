import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LatLngBounds, LeafletMouseEvent, MapComponent as YagaMapComponent, OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2'
import { Icon } from 'leaflet';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { CrewLocationService } from '../crew-location.service';

const PDF_TILE_LAYER_URL = '/assets/map.png'
const DEFAULT_ZOOM_LEVEL = 17

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MyMapComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(YagaMapComponent) yagaMap!: YagaMapComponent

  public locations$: Observable<readonly {
    crewName: string;
    dmrId: string;
    position: {
        lat: number;
        lng: number;
    };
    howLongAgoSeconds: number
    howLongAgoFormat: string
  }[]> | null = null

  public SUIKERROCK_POS = { lat: 50.79880, lng: 4.94704 }

  public zoom: number = 17
  public tileLayerUrl: string = OSM_TILE_LAYER_URL
  public overlayUrl: string = PDF_TILE_LAYER_URL
  public overlayBounds: LatLngBounds = new LatLngBounds({ lat: 50.79619, lng: 4.94072 }, { lat: 50.80277, lng: 4.95771 })

  public blueIcon = new Icon({
    iconUrl: '/assets/marker-icon.png',
    iconRetinaUrl: '/assets/marker-icon-2x.png',
    shadowUrl: '/assets/marker-shadow.png',
    // iconAnchor: [22, 94],
    popupAnchor: [0, -35]
  })

  public greyIcon = new Icon({
    iconUrl: '/assets/marker-icon-grey.png',
    iconRetinaUrl: '/assets/marker-icon-2x-grey.png',
    shadowUrl: '/assets/marker-shadow.png',
    // iconAnchor: [22, 94],
    popupAnchor: [0, -35]
  })

  onDestroy$ = new Subject<void>()

  constructor(private crewLocationService: CrewLocationService) {

  }

  ngOnInit(): void {
    this.locations$ = this.crewLocationService.getPositions$().pipe(takeUntil(this.onDestroy$))
  }

  ngOnDestroy(): void {
    this.onDestroy$.next()
  }

  ngAfterViewInit(): void {
    this.yagaMap.setView(this.SUIKERROCK_POS, DEFAULT_ZOOM_LEVEL)
  }

  trackByDmrId(idx: number, { dmrId }: { readonly dmrId: string }): string {
    return dmrId
  }

}
