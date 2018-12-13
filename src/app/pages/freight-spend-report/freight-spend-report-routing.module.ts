import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FreightSpendReportPage } from './freight-spend-report';

const routes: Routes = [
  {
    path: '',
    component: FreightSpendReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreightSpendReportPageRoutingModule { }
