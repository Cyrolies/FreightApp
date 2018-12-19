import { FreightApiService } from './../../providers/freight-api.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ShipmentEvent } from '../../providers/freight-api.service';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-event-notification-list',
  templateUrl: 'event-notification-list.html',
  styleUrls: ['./event-notification-list.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventNotificationListPage {
  notifications: ShipmentEvent[] = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public freightService: FreightApiService,
    public userData: UserData,
    public router: Router,
    public navCtrl: NavController
  ) {}

  ionViewDidEnter() {
    // Retrieve x-months worth of notifications, according to spec in server config.
    // this.freightService.GetShipmentEvents(this.userData.selectedProfile.CargoWiseCode)
    this.freightService.GetShipmentEvents('SIMFISSEA') // TODO: Remove hardcoded cargowise code.
    .subscribe((result: ShipmentEvent[]) => {
      this.notifications = result;
      this.notifications.sort(this.eventDateComparer).reverse();
    });
  }

  eventDateComparer(a: ShipmentEvent, b: ShipmentEvent) {
    if (a.CreateDateTime < b.CreateDateTime) {
      return -1;
    } else if (a.CreateDateTime > b.CreateDateTime) {
      return 1;
    }
    return 0;
  }

}
