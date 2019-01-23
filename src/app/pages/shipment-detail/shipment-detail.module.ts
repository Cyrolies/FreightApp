import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentDetailsOrderLinesModalModule } from './../shipment-detail-orderlines/shipment-detail-orderlines-modal.module';
import { ShipmentDetailPage } from './shipment-detail';
import { ShipmentDetailPageRoutingModule } from './shipment-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ShipmentDetailPageRoutingModule,
    ShipmentDetailsOrderLinesModalModule,
  ],
  declarations: [
    ShipmentDetailPage,
  ]
})
export class ShipmentDetailModule { }
