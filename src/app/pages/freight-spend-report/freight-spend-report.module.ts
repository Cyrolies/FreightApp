import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FreightSpendReportPage } from './freight-spend-report';
import { FreightSpendReportPageRoutingModule } from './freight-spend-report-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreightSpendReportPageRoutingModule
  ],
  declarations: [
    FreightSpendReportPage,
  ]
})
export class FreightSpendReportModule { }
