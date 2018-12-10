import { ShipmentEvent, Shipment } from './../../providers/freight-api.service';
import { HttpClient } from '@angular/common/http';
import { FreightApiService, EventTopic } from '../../providers/freight-api.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController, NavController, NavParams, Events } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-subscriptions',
  templateUrl: 'subscriptions.html',
  styleUrls: ['./subscriptions.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubscriptionsPage {

  topics: EventTopic[] = new Array<EventTopic>();

  constructor(
    public freightApiService: FreightApiService,
    public router: Router,
    public toastCtrl: ToastController,
    public loading: LoadingController,
    public http: HttpClient,
    private userData: UserData,
    public navCtrl: NavController,
    private events: Events
  ) {}

  async ionViewDidEnter() {

    // this.userData.isLoggedIn()
    //   .then((isLoggedIn: boolean) => {
    //     if (!isLoggedIn){
    //       this.events.publish('user:logout');
    //     }
    //   });

    const spinner = await this.loading.create();

    spinner.present().then(() => {
      this.freightApiService.GetEventSubscriptions().subscribe((topics: EventTopic[]) => {

        this.topics = topics;

        spinner.dismiss();

      }, error =>  spinner.dismiss());
    });
  }

  resetFilters() {

    // reset all of the toggles to be checked
    this.topics.forEach(topic => {
      topic.isSubscribed = false;
    });
  }

  async save() {
    const spinner = await this.loading.create();

    spinner.present().then(() => {
      this.freightApiService.SubscribeToShipmentEvents(this.topics).subscribe((isSuccessful: boolean) => {

        this.logBoolServerResponse('Save Suscriptions', isSuccessful);
        spinner.dismiss();

      }, error =>  spinner.dismiss());
    });

    // Test various FreightAPI methods:
    console.log('Testing FreightApi.GetShipmentEvents...');
    const testCargoWiseCode = 'SIMFISSEA';
    spinner.present().then(() => {
      this.freightApiService.GetShipmentEvents(testCargoWiseCode).subscribe((shipmentEvents: ShipmentEvent[]) => {

        spinner.dismiss();

      }, error =>  spinner.dismiss());
    });

    console.log('Testing FreightApi.GetShipments...');
    const testShipmentNumber = 'S01004368'; // ShipmentRef
    const testOrderNumber = '';
    const testDateFrom = new Date('01 Dec 2018'); // Dates compared against shipment create date.
    const testDateTo = undefined;
    const testOpenShipments = false;

    spinner.present().then(() => {
      this.freightApiService.GetShipments(testCargoWiseCode,
        testShipmentNumber,
        testOrderNumber,
        testDateFrom,
        testDateTo,
        testOpenShipments).subscribe((shipments: Shipment[]) => {

        spinner.dismiss();

      }, error =>  spinner.dismiss());
    });

    console.log('Testing FreightApi.GetShipment...');
    spinner.present().then(() => {
      this.freightApiService.GetShipment(testShipmentNumber)
      .subscribe((shipment: any) => {

        spinner.dismiss();

      }, error =>  spinner.dismiss());
    });

    console.log('Testing FreightApi.Authenticate...');
    spinner.present().then(() => {
      this.freightApiService.Authenticate(environment.defaultUser, environment.defaultPassword)
      .subscribe((authResult: any) => {

        spinner.dismiss();

      }, error =>  spinner.dismiss());
    });


  }

  logBoolServerResponse(attemptedAction: string, isSuccessful) {

    console.log(`Attempted: ${attemptedAction}. Server responded with: ${isSuccessful ? 'success' : 'failed'}.`);

  }

}
