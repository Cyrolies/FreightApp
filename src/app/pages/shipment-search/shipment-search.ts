import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'page-shipment-search',
  templateUrl: 'shipment-search.html',
  styleUrls: ['./shipment-search.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShipmentSearchPage {
  speakers: any[] = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public inAppBrowser: InAppBrowser,
    public router: Router,
    public navCtrl: NavController
  ) {}

  ionViewDidEnter() {
  }

  listShipments() {
    this.navCtrl.navigateForward('shipments');
  }
}
