import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SubscriptionsPage } from './subscriptions';
import { SubscriptionsPageRoutingModule } from './subscriptions-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionsPageRoutingModule
  ],
  declarations: [SubscriptionsPage],
})
export class SubscriptionsModule {}
