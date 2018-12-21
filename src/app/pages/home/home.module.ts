import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChartsModule } from 'ng2-charts';


import { HomePage } from './home';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartsModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
  ]
})
export class HomeModule { }
