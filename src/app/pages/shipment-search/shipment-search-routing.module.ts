import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShipmentSearchPage } from './shipment-search';
const routes: Routes = [
  {
    path: '',
    component: ShipmentSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentSearchPageRoutingModule {}
