import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FreightSpendPage } from './freightspend';

const routes: Routes = [
  {
    path: '',
    component: FreightSpendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreightSpendPageRoutingModule { }
