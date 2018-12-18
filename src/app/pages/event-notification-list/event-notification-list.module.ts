import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { EventNotificationListPage } from './event-notification-list';
import { EventNotificationListPageRoutingModule } from './event-notification-list-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    EventNotificationListPageRoutingModule
  ],
  declarations: [EventNotificationListPage],
})
export class EventNotificationListModule {}
