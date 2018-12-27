import { Component, ElementRef, ViewChild, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';

import { MapHostService } from '../../providers/map-host-service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    MapHostService
  ]
})
export class MapPage implements OnInit, OnDestroy {

  fromPort: Microsoft.Maps.Location;
  toPort: Microsoft.Maps.Location;
  currentFreightLocation: Microsoft.Maps.Location;

  readonly pinIconDimensions = { // TODO: Provide multiple icons for different screen sizes.
    x: 25,
    y: 32
  };
  readonly circleIconDimensions = {
    x: 32,
    y: 32
  };

  @ViewChild('map') mapElement: ElementRef;

  private _mapHostInitialisedSource = new BehaviorSubject<boolean>(false);
  mapHostInitialised$ = this._mapHostInitialisedSource.asObservable(); // Observable stream; subscribers will automatically receive updated values.

  constructor(
    public platform: Platform,
    private mapHostService: MapHostService
  ) { }
  
  ngOnInit() {
    this.mapHostService
    .initialize(this.mapElement.nativeElement)
    .then((success) => {
      this._mapHostInitialisedSource.next(true);
    }, (error) => {
      this._mapHostInitialisedSource.next(false);
    });
    
    // this.mapHostInitialized = true;
  }
  ngOnDestroy() {

    if (this._mapHostInitialisedSource.value === true) {
      this.mapHostService.uninitialize();
    }
  }

  ionViewDidEnter() {

    // Wait for map to be ready:
    if (this._mapHostInitialisedSource.value === false) {

      const mapHostInitialisedSubscription = this.mapHostInitialised$
        .subscribe((isMapHostInitialised: boolean) => {

          if (!isMapHostInitialised) {
            return;
          }

          mapHostInitialisedSubscription.unsubscribe();
          
          // Map is ready to use! Can now use Microsoft.Maps Api.
          console.log('Map is ready!');

          this.onMapReady();

        }

      );
    } else {

      this.onMapReady();
    }


    // this.confData.getMap().subscribe((mapData: any) => {
    //   const mapEle = this.mapElement.nativeElement;

    //   const map = new google.maps.Map(mapEle, {
    //     center: mapData.find((d: any) => d.center),
    //     zoom: 16
    //   });

    //   mapData.forEach((markerData: any) => {
    //     const infoWindow = new google.maps.InfoWindow({
    //       content: `<h5>${markerData.name}</h5>`
    //     });

    //     const marker = new google.maps.Marker({
    //       position: markerData,
    //       map,
    //       title: markerData.name
    //     });

    //     marker.addListener('click', () => {
    //       infoWindow.open(map, marker);
    //     });
    //   });

    //   google.maps.event.addListenerOnce(map, 'idle', () => {
    //     mapEle.classList.add('show-map');
    //   });

    // });

  }

  onMapReady() {

    this.fromPort = new Microsoft.Maps.Location(22, 114);

    this.toPort = new Microsoft.Maps.Location(51, 5);

    this.currentFreightLocation =  new Microsoft.Maps.Location(-33.9561, 18.4825);

    this.mapHostService.clearAllPushpins();

    this.mapHostService.addIconPushpin(
      this.fromPort,
      'Port of Loading',
      'assets/img/Sm-Booked.png',
      new Microsoft.Maps.Point(Math.ceil(this.circleIconDimensions.x / 2), this.circleIconDimensions.y)
    );

    this.mapHostService.addIconPushpin(
      this.toPort,
      'Port of Discharge',
      'assets/img/Sm-ATA.png',
      new Microsoft.Maps.Point(Math.ceil(this.circleIconDimensions.x / 2), this.circleIconDimensions.y)
    );

    this.mapHostService.addIconPushpin(
      this.currentFreightLocation,
      'Current Location',
      'assets/img/Pin-Blue-Sea.png',
      new Microsoft.Maps.Point(Math.ceil(this.pinIconDimensions.x / 2), this.pinIconDimensions.y)
    );

    this.mapHostService.setViewToIncludeLocations([this.fromPort, this.toPort, this.currentFreightLocation]);
    
  }
}
