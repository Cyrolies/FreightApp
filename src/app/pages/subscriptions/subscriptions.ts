import { HttpClient } from '@angular/common/http';
import { FreightApiService, EventTopic } from '../../providers/freight-api.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController, NavController, NavParams, Events } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { UserData } from '../../providers/user-data';
import { GlobalService } from '../../providers/global.service';


@Component({
  selector: 'page-subscriptions',
  templateUrl: 'subscriptions.html',
  styleUrls: ['./subscriptions.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubscriptionsPage {

  topics: EventTopic[] = new Array<EventTopic>();
  private userName: string;

  constructor(
    public freightApiService: FreightApiService,
    public router: Router,
    public toastCtrl: ToastController,
    public loading: LoadingController,
    public http: HttpClient,
    private userData: UserData,
    public navCtrl: NavController,
    private events: Events,
    private global: GlobalService
  ) {}

  async ionViewDidEnter() {

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
    this.freightApiService.GetEventSubscriptions(this.userName).subscribe((topics: EventTopic[]) => {
      
      spinner.dismiss();

      this.topics = topics;

    }, (error) =>  {

      spinner.dismiss();

      this.topics = [];

      console.log(error);
      this.presentToast('Failed to fetch Subscription Topics from Server.');  
    });
  }

  onCannotObtainUserName() {
    this.presentToast('Could not obtain Username. Please logout and re-login.');
    this.topics = [];
  }

  resetFilters() {

    // reset all of the toggles to be checked
    this.topics.forEach(topic => {
      topic.isSubscribed = false;
    });
  }

  async save() {

    const spinner = await this.loading.create();
    await spinner.present();

    this.freightApiService.SubscribeToShipmentEvents(this.topics, this.userName).subscribe((isSuccessful: boolean) => {

      spinner.dismiss();

      // this.logBoolServerResponse('Save Suscriptions', isSuccessful);
      if (!isSuccessful) {
        this.onSavingFailed();
      }

    }, (error) => {

      spinner.dismiss();

      this.onSavingFailed();
    });

  }

  onSavingFailed() {
    this.presentToast('Failed to save Subscription to Server. Please try again later.');
  }

  logBoolServerResponse(attemptedAction: string, isSuccessful) {
    console.log(`Attempted: ${attemptedAction}. Server responded with: ${isSuccessful ? 'success' : 'failed'}.`);
  }

  async presentToast(toastMessage: string) {

    const toast = await this.toastCtrl.create(
      this.global.getToastConfiguration(toastMessage)
    );
    
    await toast.present();
  }

}
