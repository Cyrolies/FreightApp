import { FreightApiService, Shipment } from '../../providers/freight-api.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpClient } from '@angular/common/http';
import { ToastController, LoadingController, NavController, ActionSheetController, NavParams, Events } from '@ionic/angular';


@Component({
  selector: 'page-shipment-detail',
  templateUrl: 'shipment-detail.html',
  styleUrls: ['./shipment-detail.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShipmentDetailPage {
  shipment: Shipment;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public inAppBrowser: InAppBrowser,
    public loading: LoadingController,
    public http: HttpClient,
    public freightApiService: FreightApiService,
    public toastCtrl: ToastController,
    public route: ActivatedRoute,
    public navCtrl: NavController
  ) {}

  async ionViewDidEnter() {

    const spinner = await this.loading.create();

    spinner.present().then(() => {
      this.freightApiService.GetShipment(this.route.snapshot.paramMap.get('ShipmentRef')).subscribe((result: Shipment) => {

        this.shipment =  result;

        spinner.dismiss();

      }, error =>  spinner.dismiss());
    });
  }

}
