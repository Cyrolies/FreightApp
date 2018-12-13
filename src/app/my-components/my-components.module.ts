import { ShipmentFilter } from './shipment-filter/shipment-filter';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    IonicModule
  ],
  declarations: [
    ShipmentFilter
  ],
  exports: [
    ShipmentFilter
  ]
})
export class MyComponentsModule { }
