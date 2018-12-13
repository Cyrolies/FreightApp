import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventNotificationListPage } from './event-notification-list';
const routes: Routes = [
  {
    path: '',
    component: EventNotificationListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventNotificationListPageRoutingModule {}
