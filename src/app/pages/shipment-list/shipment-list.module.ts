import { MyComponentsModule } from './../../my-components/my-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ShipmentListPage } from './shipment-list';
import { ShipmentListPageRoutingModule } from './shipment-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MyComponentsModule,
    ShipmentListPageRoutingModule
  ],
  declarations: [ShipmentListPage],
})
export class ShipmentListModule {}
