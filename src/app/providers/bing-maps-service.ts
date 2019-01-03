// Adapted from: https://github.com/Microsoft/Bing-Maps-Fleet-Tracker
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class BingMapsService {
  private loadPromise: Promise<void>;

  constructor() { }

  load(): Promise<void> {
    if (this.loadPromise) {
      return this.loadPromise;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;

    const mapsCallback = 'bingMapsCallback';
    script.src = `http://www.bing.com/api/maps/mapcontrol?branch=release&clientApi=bingmapsfleettracker&callback=${ mapsCallback }`;

    this.loadPromise = new Promise<void>((resolve: Function, reject: Function) => {
      window[mapsCallback] = () => {

        // Callback => Map resources have now been loaded.
        
        resolve();
      };
      script.onerror = (error: Event) => { 
        
        // this.logger.error('maps script error' + error);
        
        reject(error);
      };
    });

    document.body.appendChild(script);

    return this.loadPromise;
  }

  createMap(element: HTMLElement, options: Microsoft.Maps.IMapLoadOptions): Promise<Microsoft.Maps.Map> {
    return this.load().then(() => {

      return new Microsoft.Maps.Map(element, options); // Create instance of Map class after required resources have been loaded. 
    });
  }
}
