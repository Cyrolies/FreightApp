import { FreightApiService, FreightMilestone } from '../../providers/freight-api.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpClient } from '@angular/common/http';
import { ToastController, LoadingController, NavController, ActionSheetController, NavParams, Events } from '@ionic/angular';

@Component({
  selector: 'page-shipment-list',
  templateUrl: 'shipment-list.html',
  styleUrls: ['./shipment-list.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShipmentListPage {
  freightmilestones: FreightMilestone[] = new Array<FreightMilestone>();
  
  constructor(
    public actionSheetCtrl: ActionSheetController,
    public inAppBrowser: InAppBrowser,
    public loading: LoadingController,
    public http: HttpClient,
    public freightApiService: FreightApiService,
    public toastCtrl: ToastController,
    public router: Router,
    public navCtrl: NavController
  ) {}

  async ionViewDidEnter() {

    const spinner = await this.loading.create();

    spinner.present().then(() => {
      this.freightApiService.GetShipments('SIMFISSEA', '', '', new Date('2013-01-01'), new Date('2018-12-12'), true).subscribe((result: FreightMilestone[]) => {

        this.freightmilestones =  result;

        spinner.dismiss();

      }, error =>  spinner.dismiss());
    });
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

  goToShipmentDetail(FreightMilestone: any) {
     this.navCtrl.navigateForward('shipment-details/' + FreightMilestone.ShipmentRef);
  }
}
