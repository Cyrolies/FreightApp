import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipmentDetailPage } from './shipment-detail';
import { ShipmentDetailPageRoutingModule } from './shipment-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ShipmentDetailPageRoutingModule
  ],
  declarations: [
    ShipmentDetailPage,
  ]
})
export class ShipmentDetailModule { }
