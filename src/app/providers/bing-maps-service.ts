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
      // Will not rerun the BingMaps external script (<script type="text/javascript" async="" defer="" src="http://www.bing.com/api/maps/mapcontrol?branch=release&amp;clientApi=bingmapsfleettracker&amp;callback=bingMapsCallback"></script>)
    }

    const mapsCallback = 'bingMapsCallback';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;  
    script.id = 'bingMaps';
    
    script.src = `http://www.bing.com/api/maps/mapcontrol?branch=release&clientApi=bingmapsfleettracker&callback=${ mapsCallback }`;

    this.loadPromise = new Promise<void>((resolve: Function, reject: Function) => {
      window[mapsCallback] = () => {

        // Callback => Map resources have now been loaded.        
        resolve();
      };
      script.onerror = (error: Event) => { 
        
        console.log(error);
        
        reject(error);
      };
    });

    // Remove old script, if any (No practical consequence; just keep document clean):
    const old = document.getElementById(script.id);
    if (old) {
      old.parentNode.removeChild(old);
    }
    
    // Run/re-run the BingMaps script (will trigger above 'resolve()' when complete):
    document.body.appendChild(script);

    return this.loadPromise;
  }

  createMap(element: HTMLElement, options: Microsoft.Maps.IMapLoadOptions): Promise<Microsoft.Maps.Map> {
    return this.load().then(() => {

      return new Microsoft.Maps.Map(element, options); // Create instance of Map class after required resources have been loaded. 
    });
  }

  uninitialize() {
    this.loadPromise = null; // Force the document to re-run the BingMaps script.
  }
}
