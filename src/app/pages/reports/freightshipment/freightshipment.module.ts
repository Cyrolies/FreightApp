import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FreightShipmentPage } from './freightshipment';
// import { PopoverPage } from '../about-popover/about-popover';
import { FreightShipmentPageRoutingModule } from './freightshipment-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreightShipmentPageRoutingModule
  ],
  declarations: [FreightShipmentPage],
 // entryComponents: [PopoverPage],
  bootstrap: [FreightShipmentPage],
})
export class FreightShipmentModule {}
