// Adapted from: https://github.com/Microsoft/Bing-Maps-Fleet-Tracker
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

import { BingMapsService } from './bing-maps-service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MapHostService {

  private bingMapsKey = 'Av_ZYW1QE7oZPoRV_0Lgdmc93z6Km8TYzRRQI3RaoB5aRkT91oOsn7KTLo2TIcWQ';
  private mapElement: HTMLElement;
  private map: Microsoft.Maps.Map;
  private tracksLayer: Microsoft.Maps.Layer;

  constructor(
    private http: Http,
    private bingMapsService: BingMapsService) {  }

  initialize(mapElement: HTMLElement): Promise<void> {

    console.log(`Initialising map for element: ${mapElement.id} ...`);

    this.mapElement = mapElement;

    return this.createMap(this.bingMapsKey);
  }

  private createMap(credentials: string): Promise<void> {

    console.log(`Calling BingMapService to create map...`);

    return this.bingMapsService.createMap(this.mapElement, {
      credentials: credentials,
      showDashboard: false,
      showZoomButtons: true,
      enableClickableLogo: false,
      zoom: 0.5
    }).then((map) => {

      console.log(`Map returned by BingMapService.`);

      this.map = map;

      // this.tracksLayer = new Microsoft.Maps.Layer();
      // this.map.layers.insert(this.tracksLayer);
      // this.startListening();

    }).catch(() => {

      // this.logger.error('map creation request failed');

    });
  }

  uninitialize() {}

  centerViewOnLocation(location: Microsoft.Maps.Location) {
    this.map.setView({
        center: location
    });
  }

  setViewToIncludeLocations(locations: Microsoft.Maps.Location[]) {
    
    const rect = Microsoft.Maps.LocationRect.fromLocations(locations);
    
    this.map.setView({ bounds: rect, padding: 0 });
  }

  addStandardPushpin(location: Microsoft.Maps.Location, 
    theTitle: string, 
    colorName?: string): Microsoft.Maps.Pushpin {
  
    const pin = new Microsoft.Maps.Pushpin(location, {
          // title: theTitle,
          color: colorName
    });

    this.map.entities.push(pin);

    return pin;
  }

  addIconPushpin(location: Microsoft.Maps.Location, 
    theTitle: string,
    iconUrl: string,
    iconAnchor: Microsoft.Maps.Point): Microsoft.Maps.Pushpin {

      const pin = new Microsoft.Maps.Pushpin(location, {
        // title: theTitle,
        icon: iconUrl,
        anchor: iconAnchor
      });    

      this.map.entities.push(pin);

      return pin;
  }

  clearAllPushpins() {
    for (let i = this.map.entities.getLength() - 1; i >= 0; i--) {
      const pushpin = this.map.entities.get(i);
      if (pushpin instanceof Microsoft.Maps.Pushpin) {
          this.map.entities.removeAt(i);
      }
    }
  }

  drawLine(points: Microsoft.Maps.Location[]) {
    const line = new Microsoft.Maps.Polyline(points, {
      strokeColor: 'blue',
      strokeThickness: 1,
    });

    this.map.entities.push(line);  
  }

  // togglePins() {
  //   this.logger.info('toggle pins');

  //   if (this.tracksLayerActive) {
  //     this.map.layers.remove(this.tracksLayer);
  //   } else {
  //     this.map.layers.insert(this.tracksLayer);
  //   }

  //   this.tracksLayerActive = !this.tracksLayerActive;
  // }


  // private startListening() {
  //   this.backgroundTrackerService.locations.subscribe((location) => {

  //     // ok to execute location updates even if offline since the maps control seems to 
  //     // buffer it's operations for when it's back online

  //     if (!this.lastLocation) {
  //       this.map.setView({
  //         center: new Microsoft.Maps.Location(location.latitude, location.longitude)
  //       });
  //     }

  //     this.markTrack(location);
  //     this.lastLocation = location;
  //   });
  // }

  // private markTrack(location) {
  //   let pinColor;

  //   if (location.speed >= this.greenSpeed) {
  //     pinColor = 'green';
  //   } else if (location.speed < this.greenSpeed && location.speed >= this.yellowSpeed) {
  //     pinColor = 'yellow';
  //   } else {
  //     pinColor = 'red';
  //   }

  //   var pushpin = new Microsoft.Maps.Pushpin(
  //     new Microsoft.Maps.Location(location.latitude, location.longitude), { color: pinColor });

  //   this.tracksLayer.add(pushpin);
  // }

}
