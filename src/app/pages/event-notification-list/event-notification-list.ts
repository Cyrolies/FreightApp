import { FreightApiService, Profile } from './../../providers/freight-api.service';
import { Component, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, NavController, LoadingController, ToastController } from '@ionic/angular';
import { ShipmentEvent } from '../../providers/freight-api.service';
import { UserData } from '../../providers/user-data';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'page-event-notification-list',
  templateUrl: 'event-notification-list.html',
  styleUrls: ['./event-notification-list.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventNotificationListPage implements OnInit, OnDestroy {
  notifications: ShipmentEvent[] = [];
  private profileSubscription: any;
  private selectedProfile: Profile;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public freightService: FreightApiService,
    public userData: UserData,
    public router: Router,
    public navCtrl: NavController,
    private loading: LoadingController,
    private toastCtrl: ToastController,
    public global: GlobalService
  ) {}

  ngOnInit() {

    // Subscribing to selectedProfile$ serves to...
    //  i) give the current selectedProfile
    //  ii) trigger the specified function (to reload data) whenever the profile changes.
    this.profileSubscription = this.userData.selectedProfile$
       .subscribe(selectedProfile => {
          this.selectedProfile = selectedProfile;
          this.ionViewDidEnter();
      });
  }

  async ionViewDidEnter() {

    if (!(this.selectedProfile && this.selectedProfile.CargoWiseCode)) {

      this.presentToast('Could not determine selected Profile. Please logout and re-login.');

      this.notifications = [];

      return;
    }

    const spinner = await this.loading.create();
    await spinner.present();

    // Retrieve x-months worth of notifications, according to spec in server config.
    this.freightService.GetShipmentEvents(this.selectedProfile.CargoWiseCode)
      .subscribe((result: ShipmentEvent[]) => {
        this.notifications = result;
        this.notifications.sort(this.eventDateComparer).reverse();

        spinner.dismiss();
    }, (error) => {

      spinner.dismiss();

      this.notifications = [];
      
      console.log(error);
      this.presentToast('Failed to fetch Notifications from Server.');
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

  async presentToast(toastMessage: string) {

    const toast = await this.toastCtrl.create(
      this.global.getToastConfiguration(toastMessage)
    );
    
    await toast.present();
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.profileSubscription.unsubscribe();
  }

}
