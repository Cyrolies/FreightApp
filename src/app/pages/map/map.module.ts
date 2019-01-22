import { MapPopover } from './map-popover';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MapPage } from './map';
import { MapPageRoutingModule } from './map-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MapPageRoutingModule
  ],
  declarations: [
    MapPage,
    MapPopover
  ],
  entryComponents: [
    MapPopover
  ]
})
export class MapModule { }
