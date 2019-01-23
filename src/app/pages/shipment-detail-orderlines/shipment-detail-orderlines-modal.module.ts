import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ShipmentDetailsOrderLinesModal } from './shipment-detail-orderlines-modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ShipmentDetailsOrderLinesModal],
  entryComponents: [],
  bootstrap: [ShipmentDetailsOrderLinesModal],
  exports: [ShipmentDetailsOrderLinesModal] // ?
})
export class ShipmentDetailsOrderLinesModalModule {}
