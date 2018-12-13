import { MyComponentsModule } from './../../my-components/my-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ShipmentSearchPage } from './shipment-search';
import { ShipmentSearchPageRoutingModule } from './shipment-search-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MyComponentsModule,
    ShipmentSearchPageRoutingModule
  ],
  declarations: [ShipmentSearchPage],
})
export class ShipmentSearchModule {}
