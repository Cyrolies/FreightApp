import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportsPage } from './reports';

const routes: Routes = [
  {
    path: '',
    component: ReportsPage
  },
  {
    path: 'freightspend',
    loadChildren: './freightspend/freightspend.module#FreightSpendModule'
  },
  {
    path: 'freightshipment',
    loadChildren: './freightshipment/freightshipment.module#FreightShipmentModule'
  },
  {
    path: 'freightmilestone',
    loadChildren: './freightmilestone/freightmilestone.module#FreightMilestoneModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsPageRoutingModule { }
