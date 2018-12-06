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
    public loading: LoadingController
  ) {}

  async ionViewDidEnter() {

    console.log('SubscriptionsPage: this.ionViewDidEnter');

    const spinner = await this.loading.create();

    spinner.present().then(() => {
      this.freightApiService.GetEventSubscriptions().subscribe((topics: EventTopic[]) => {
        console.log('Received Subscriptions from FreightApi.');

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

}
