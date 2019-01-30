import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ShipmentDetailsOrderLinesModal } from './shipment-detail-orderlines-modal';
import { PipeModule } from '../../pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule
  ],
  declarations: [ShipmentDetailsOrderLinesModal],
  entryComponents: [],
  bootstrap: [ShipmentDetailsOrderLinesModal],
  exports: [ShipmentDetailsOrderLinesModal] // ?
})
export class ShipmentDetailsOrderLinesModalModule {}
