import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FreightMilestonePage } from './freightmilestone';

const routes: Routes = [
  {
    path: '',
    component: FreightMilestonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreightMilestonePageRoutingModule { }
