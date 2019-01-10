import { FreightApiService, FreightMilestone, Profile } from '../../providers/freight-api.service';
import { Component, ViewEncapsulation, ViewChild , OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpClient } from '@angular/common/http';
import { ToastController, LoadingController, NavController, ActionSheetController, NavParams, Events, Datetime } from '@ionic/angular';
import { MyNavService } from './../../providers/my-nav.service';
import { ShipmentFilters } from '../../interfaces/shipment-filters';
import { UserData } from '../../providers/user-data';
import { NgForm } from '@angular/forms';
import { GlobalService } from '../../providers/global.service';
import { format } from 'date-fns';

@Component({
  selector: 'page-shipment-list',
  templateUrl: 'shipment-list.html',
  styleUrls: ['./shipment-list.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShipmentListPage implements OnInit, OnDestroy {
  freightmilestones: FreightMilestone[] = new Array<FreightMilestone>();
  displayedFreightmilestones: FreightMilestone[] = new Array<FreightMilestone>();
  readonly chunkSize = 10;
  isAllDataDisplayed = true;

  public filters: ShipmentFilters = { cargowisecode: '', shipmentno: '', orderno: '', datefrom: '', dateto: '', openshipments: true };
  private profileSubscription: any;
  private selectedProfile: Profile;
  public hideFilters = true;
  @ViewChild('myPickerFrom') myPickerFrom: Datetime;
  @ViewChild('myPickerTo') myPickerTo: Datetime;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public inAppBrowser: InAppBrowser,
    public loading: LoadingController,
    public http: HttpClient,
    public freightApiService: FreightApiService,
    public toastCtrl: ToastController,
    public router: Router,
    public navCtrl: NavController,
    public navService: MyNavService,
    public userData: UserData,
    public global: GlobalService
  ) {}

  ngOnInit() {

    this.initialiseDatePickers();

    // Subscribing to selectedProfile$ serves to...
    //  i) give the current selectedProfile
    //  ii) trigger the specified function (to reload data) whenever the profile changes.
    this.profileSubscription = this.userData.selectedProfile$
       .subscribe(selectedProfile => {
          this.selectedProfile = selectedProfile;
         // this.ionViewDidEnter();
      });
  }

  async ionViewDidEnter() {

    if (!(this.selectedProfile && this.selectedProfile.CargoWiseCode)) {
       this.presentToast('Could not determine selected Profile. Please close the app and re-login.');
       return;
    }
  }

  initialiseDatePickers() {
    const today = new Date();
    const sixMonthsAgo = (new Date()).setMonth(today.getMonth() - 6);

    this.myPickerFrom.value = format(sixMonthsAgo, 'yyyy-MM-dd');
    this.filters.datefrom = format(sixMonthsAgo, 'yyyy-MM-dd');
    this.myPickerTo.value = format(today, 'yyyy-MM-dd');
    this.filters.dateto = format(today, 'yyyy-MM-dd');
  }

  async listShipments(form: NgForm) {

    const spinner = await this.loading.create();
  
    spinner.present().then(() => {
      
    this.freightApiService.GetShipments(this.selectedProfile.CargoWiseCode, this.filters.shipmentno, this.filters.orderno,
      this.filters.datefrom, // !== '' ? format(this.filters.datefrom, 'yyyy-MM-dd') : '', //  (this.filters.datefrom['year'].text + '-' + this.filters.datefrom['month'].text + '-' + this.filters.datefrom['day'].text) : '',
      this.filters.dateto, // !== '' ? format(this.filters.dateto, 'yyyy-MM-dd') : '', // (this.filters.dateto['year'].text + '-' + this.filters.dateto['month'].text + '-' + this.filters.dateto['day'].text) : '',
      this.filters.openshipments, true).subscribe((result: FreightMilestone[]) => {

    this.freightmilestones =  result;

    this.displayedFreightmilestones = [];
    this.isAllDataDisplayed = false;
    this.displayMoreData();

    if (this.freightmilestones == null) {
      spinner.dismiss();
      this.presentToast('No shipments found try different filters');
    }
    spinner.dismiss();
      }, error =>  spinner.dismiss());
    });
  }

   displayMoreData(event?) {

    setTimeout(() => { // Required, since displayMoreData must be async.

      const nextItem = this.displayedFreightmilestones.length;
      const lastItem = Math.min(nextItem + this.chunkSize - 1, this.freightmilestones.length - 1);
      const chunk = this.freightmilestones.slice(nextItem, lastItem + 1);
  
      Array.prototype.push.apply(this.displayedFreightmilestones, chunk);
  
      if (this.displayedFreightmilestones.length === this.freightmilestones.length) {
        this.isAllDataDisplayed = true;
      }

      if (event) {
          event.target.complete();
      }

     }, 100);  // Delay by 100ms, to prevent 'smooth' scrolling.

  }

  ngOnDateFromChange(date) {
    if (typeof date !== 'string') {
    this.filters.datefrom =  (date['year'].text + '-' + date['month'].text + '-' + date['day'].text);
    }
  }
  ngOnDateToChange(date) {
    if (typeof date !== 'string') {
    this.filters.dateto =  (date['year'].text + '-' + date['month'].text + '-' + date['day'].text);
    }
  }
  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.profileSubscription.unsubscribe();
  }

  goToShipmentDetail(FreightMilestone: any) {
    this.navCtrl.navigateForward(`shipments/details/${FreightMilestone.ShipmentRef}`);
  }

  async presentToast(toastMessage: string) {

    const toast = await this.toastCtrl.create(
      this.global.getToastConfiguration(toastMessage)
    );
    
    await toast.present();
  }
    // this.confData.getSpeakers().subscribe((speakers: any[]) => {
    //   this.speakers = speakers;
    // });
   

  // goToSessionDetail(session: any) {
  //   this.router.navigateByUrl(`app/tabs/(speakers:session/${session.id})`);
  // }

  // goToSpeakerDetail(speaker: any) {
  //   this.router.navigateByUrl(
  //     `app/tabs/(speakers:speaker-details/${speaker.id})`
  //   );
  // }

  // goToSpeakerTwitter(speaker: any) {
  //   this.inAppBrowser.create(
  //     `https://twitter.com/${speaker.twitter}`,
  //     '_blank'
  //   );
  // }

  // async openSpeakerShare(speaker: any) {
  //   const actionSheet = await this.actionSheetCtrl.create({
  //     header: 'Share ' + speaker.name,
  //     buttons: [
  //       {
  //         text: 'Copy Link',
  //         handler: () => {
  //           console.log(
  //             'Copy link clicked on https://twitter.com/' + speaker.twitter
  //           );
  //           if (
  //             (window as any)['cordova'] &&
  //             (window as any)['cordova'].plugins.clipboard
  //           ) {
  //             (window as any)['cordova'].plugins.clipboard.copy(
  //               'https://twitter.com/' + speaker.twitter
  //             );
  //           }
  //         }
  //       },
  //       {
  //         text: 'Share via ...'
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel'
  //       }
  //     ]
  //   });

  //   await actionSheet.present();
  // }

  // async openContact(speaker: any) {
  //   const mode = 'ios'; // this.config.get('mode');

  //   const actionSheet = await this.actionSheetCtrl.create({
  //     header: 'Contact ' + speaker.name,
  //     buttons: [
  //       {
  //         text: `Email ( ${speaker.email} )`,
  //         icon: mode !== 'ios' ? 'mail' : null,
  //         handler: () => {
  //           window.open('mailto:' + speaker.email);
  //         }
  //       },
  //       {
  //         text: `Call ( ${speaker.phone} )`,
  //         icon: mode !== 'ios' ? 'call' : null,
  //         handler: () => {
  //           window.open('tel:' + speaker.phone);
  //         }
  //       }
  //     ]
  //   });

  //   await actionSheet.present();
  // }

 
}
