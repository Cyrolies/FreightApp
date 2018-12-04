import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ReportsPage } from './reports';
// import { PopoverPage } from '../about-popover/about-popover';
import { ReportsPageRoutingModule } from './reports-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsPageRoutingModule
  ],
  declarations: [ReportsPage],
 // entryComponents: [PopoverPage],
  bootstrap: [ReportsPage],
})
export class ReportsModule {}
