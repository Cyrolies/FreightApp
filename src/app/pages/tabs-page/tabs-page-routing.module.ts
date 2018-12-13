import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs-page';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { SessionDetailPage } from '../session-detail/session-detail';
import { ShipmentDetailPage } from '../shipment-detail/shipment-detail';
import { ShipmentListPage } from '../shipment-list/shipment-list';
import { ReportsPage } from '../reports/reports';
import { SubscriptionsPage } from '../subscriptions/subscriptions';



const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      // tab one
      {
        path: 'schedule',
        component: SchedulePage,
        outlet: 'schedule'
      },
      {
        path: 'session/:sessionId',
        component: SessionDetailPage,
        outlet: 'schedule'
      },
      // tab two
      {
        path: 'speakers',
        component: ShipmentListPage,
        outlet: 'speakers'
      },
      {
        path: 'session/:sessionId',
        component: SessionDetailPage,
        outlet: 'speakers'
      },
      {
        path: 'speaker-details/:speakerId',
        component: ShipmentDetailPage,
        outlet: 'speakers'
      },
      // tab three
      {
        path: 'map',
        component: MapPage,
        outlet: 'map'
      },
      // tab four
      {
        path: 'about',
        component: AboutPage,
        outlet: 'about'
      },
      // tab five
      {
        path: 'reports',
        component: ReportsPage,
        outlet: 'reports'
      },
      // tab six
      {
        path: 'subscriptions',
        component: SubscriptionsPage,
        outlet: 'subscriptions'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
