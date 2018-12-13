import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShipmentDetailPage } from './shipment-detail';

const routes: Routes = [
  {
    path: ':id',
    component: ShipmentDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentDetailPageRoutingModule { }
