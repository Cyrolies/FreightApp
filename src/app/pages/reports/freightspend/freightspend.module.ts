import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FreightSpendPage } from './freightspend';
// import { PopoverPage } from '../about-popover/about-popover';
import { FreightSpendPageRoutingModule } from './freightspend-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreightSpendPageRoutingModule
  ],
  declarations: [FreightSpendPage],
 // entryComponents: [PopoverPage],
  bootstrap: [FreightSpendPage],
})
export class FreightSpendModule {}
