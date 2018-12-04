import { FreightApiService } from './../../providers/freight-api.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'page-subscriptions',
  templateUrl: 'subscriptions.html',
  styleUrls: ['./subscriptions.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubscriptionsPage {
  tracks: {name: string, isChecked: boolean}[] = [];
  topics: {$id: string, name: string, code: string, isChecked: boolean}[] = [
    {
      $id: '2',
      name: 'Cargo Booked',
      code: 'ADD',
      isChecked: true
    },
    {
      $id: '3',
      name: 'ATA',
      code: 'ATA',
      isChecked: false
    },

  ];

  constructor(
    public freightApiService: FreightApiService,
    public router: Router
  ) {}

  ionViewDidEnter() {
    // this.freightApiService.GetEventSubscriptions().subscribe((subscriptions: any[]) => {
    //   this.subscriptions = subscriptions;
    // });
    console.log('SubscriptionsPage: this.ionViewDidEnter');
  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.topics.forEach(topic => {
      topic.isChecked = false;
    });
  }

}
