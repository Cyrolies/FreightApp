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
  public dataLoaded = false;

  private profileSubscription: any;
  private selectedProfile: Profile;
  
  private userName: string;
  private pageIsInView = false;

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

    this.pageIsInView = false;

    // Subscribing to selectedProfile$ serves to...
    //  i) give the current selectedProfile
    //  ii) trigger the specified function (to reload data) whenever the profile changes (IF the page is in view).
    this.profileSubscription = this.userData.selectedProfile$
       .subscribe(selectedProfile => {
          this.selectedProfile = selectedProfile;

          if (this.pageIsInView) {
            this.loadData();
          }
          
      });
  }
  
  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.profileSubscription.unsubscribe();
  }

  ionViewDidEnter() {

    this.pageIsInView = true;

    this.loadData();
  }

  ionViewDidLeave() {
    this.pageIsInView = false;
  }

  async loadData() {

    this.dataLoaded = false;
   
    // Validate CW code for selected profile:
    if (!(this.selectedProfile && this.selectedProfile.CargoWiseCode)) {

      this.presentToast('Could not determine selected Profile. Please logout and re-login.');

      this.notifications = [];

      return;
    }

    const spinner = await this.loading.create();
    await spinner.present();

    // Validate username:
    try {

      this.userName = await this.userData.getUsername();
      
      if (!this.userName) {
        spinner.dismiss();
        this.onCannotObtainUserName();
        return;
      }
    } catch {
      spinner.dismiss();
      this.onCannotObtainUserName();
      return;
    }

    // Fetch data:
    //  Retrieve x-months worth of notifications, according to spec in server config.
    
    this.freightService.GetShipmentEvents(this.selectedProfile.CargoWiseCode, this.userName)
      .subscribe((result: ShipmentEvent[]) => {

        this.dataLoaded = true;

        this.notifications = result;
        this.notifications.sort(this.eventDateComparer).reverse();

        // Extend Notification object with image properties to be consumed by html:
        this.notifications.forEach((notification) => {

          const eventCode = notification.EventCode.trim().toUpperCase();
          const isLate = notification.ActualDate > notification.EstimatedDate;    
          
          notification['isImageAvailable'] = this.global.isMilestoneImageAvailable(eventCode);
          notification['imageUrl'] = notification['isImageAvailable'] 
            ? this.global.getMilestoneImageUrl(eventCode, isLate) 
            : '';
        });


        spinner.dismiss();
    }, (error) => {

      spinner.dismiss();

      this.notifications = [];
      
      console.log(error);
      this.presentToast('Failed to fetch Notifications from Server.');
    });
  }

  onCannotObtainUserName() {
    this.presentToast('Could not obtain Username. Please logout and re-login.');
    this.notifications = [];
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

}
