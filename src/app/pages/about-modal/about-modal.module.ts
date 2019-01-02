import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AboutModal } from './about-modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [AboutModal],
  entryComponents: [],
  bootstrap: [AboutModal],
  exports: [AboutModal] // ?
})
export class AboutModalModule {}
