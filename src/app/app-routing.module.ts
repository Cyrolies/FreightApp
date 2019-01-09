import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomeModule'
  },
  {
    path: 'shipments',
    loadChildren: './pages/shipment-list/shipment-list.module#ShipmentListModule'
  },
  {
    path: 'shipment-details',
    loadChildren: './pages/shipment-detail/shipment-detail.module#ShipmentDetailModule'
  },
  
  // The Map component currently needs to be eager-loaded (should only be loaded once during the application).
  // Thus don't include the following here (move to map-routing-module):
  {
    path: 'map',
    loadChildren: './pages/map/map.module#MapModule'
  },

  {
    path: 'event-notifications',
    loadChildren: './pages/event-notification-list/event-notification-list.module#EventNotificationListModule'
  },
  {
    path: 'subscriptions',
    loadChildren: './pages/subscriptions/subscriptions.module#SubscriptionsModule'
  },
  {
    path: 'reports',
    loadChildren: './pages/reports/reports.module#ReportsModule'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule'
  },
  {
    path: 'support',
    loadChildren: './pages/support/support.module#SupportModule'
  },
  {
    path: 'about',
    loadChildren: './pages/about/about.module#AboutModule'
  },
  {
    path: 'reports/freightspend',
    loadChildren: './pages/reports/freightspend/freightspend.module#FreightSpendModule'
  },
  {
    path: 'reports/freightshipment',
    loadChildren: './pages/reports/freightshipment/freightshipment.module#FreightShipmentModule'
  },
  {
    path: 'reports/freightmilestone',
    loadChildren: './pages/reports/freightmilestone/freightmilestone.module#FreightMilestoneModule'
  }
  // {
  //   path: 'account',
  //   loadChildren: './pages/account/account.module#AccountModule'
  // },
  // {
  //   path: 'signup',
  //   loadChildren: './pages/signup/signup.module#SignUpModule'
  // },
  // {
  //   path: 'app',
  //   loadChildren: './pages/tabs-page/tabs-page.module#TabsModule'
  // },
  // {
  //   path: 'tutorial',
  //   loadChildren: './pages/tutorial/tutorial.module#TutorialModule'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
