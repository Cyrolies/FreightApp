import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FreightShipmentPage } from './freightshipment';

const routes: Routes = [
  {
    path: '',
    component: FreightShipmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreightShipmentPageRoutingModule { }
