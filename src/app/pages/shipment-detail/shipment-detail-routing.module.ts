import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShipmentDetailPage } from './shipment-detail';

const routes: Routes = [
  {
    path: ':ShipmentRef',
    component: ShipmentDetailPage,
  },
  {
    path: ':ShipmentRef/map',
    loadChildren: '../map/map.module#MapModule',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentDetailPageRoutingModule { }
