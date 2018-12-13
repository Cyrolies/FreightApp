import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { EventNotificationListPage } from './event-notification-list';
import { EventNotificationListPageRoutingModule } from './event-notification-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EventNotificationListPageRoutingModule
  ],
  declarations: [EventNotificationListPage],
})
export class EventNotificationListModule {}
