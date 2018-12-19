import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FreightMilestonePage } from './freightmilestone';
// import { PopoverPage } from '../about-popover/about-popover';
import { FreightMilestonePageRoutingModule } from './freightmilestone-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreightMilestonePageRoutingModule
  ],
  declarations: [FreightMilestonePage],
 // entryComponents: [PopoverPage],
  bootstrap: [FreightMilestonePage],
})
export class FreightMilestoneModule {}
