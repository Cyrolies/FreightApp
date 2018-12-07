import { ShipmentEvent } from './../../providers/freight-api.service';
import { HttpClient } from '@angular/common/http';
import { FreightApiService, EventTopic } from '../../providers/freight-api.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';


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
    public http: HttpClient
  ) {}

  async ionViewDidEnter() {

    const spinner = await this.loading.create();

    spinner.present().then(() => {
      this.freightApiService.GetEventSubscriptions().subscribe((topics: EventTopic[]) => {

        this.topics = topics;

        spinner.dismiss();

      }, error =>  spinner.dismiss());
    });


    // }, (error) => {

    //   // Console.log(`Failed to get Subscriptions from FreightApi.\nDetails:\n${JSON.stringify(error)}`);

    //   this.presentToast().then(() => {});

    //   this.topics = new Array<EventTopic>();

    // });
  }

  resetFilters() {

    // reset all of the toggles to be checked
    this.topics.forEach(topic => {
      topic.isSubscribed = false;
    });
  }

  // async presentErrorToast() {
  //   const toast = await this.toastCtrl.create({
  //     message: 'Failed to retrieve Subscriptions.',
  //     duration: 5000,
  //     position: 'middle',
  //     showCloseButton: true
  //   });

  //   await toast.present();
  // }

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
  }

  logBoolServerResponse(attemptedAction: string, isSuccessful) {

    console.log(`Attempted: ${attemptedAction}. Server responded with: ${isSuccessful ? 'success' : 'failed'}.`);

  }

}
