import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProfileSelectModal } from './profile-select-modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ProfileSelectModal],
  entryComponents: [],
  bootstrap: [ProfileSelectModal],
  exports: [ProfileSelectModal] // ?
})
export class ProfileSelectModalModule {}
