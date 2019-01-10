import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShipmentListPage } from './shipment-list';

const routes: Routes = [
  { 
    path: '', 
    component: ShipmentListPage
  },
  {
    path: 'details',
    loadChildren: '../shipment-detail/shipment-detail.module#ShipmentDetailModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentListPageRoutingModule {}
