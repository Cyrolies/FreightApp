import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShipmentDetailPage } from './shipment-detail';

const routes: Routes = [
  {
    path: ':ShipmentRef/:tabIndex',
    component: ShipmentDetailPage,
    pathMatch: 'full'
  },
  {
    path: ':ShipmentRef',
    component: ShipmentDetailPage,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentDetailPageRoutingModule { }
