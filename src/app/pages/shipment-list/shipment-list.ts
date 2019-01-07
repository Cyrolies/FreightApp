import { FreightApiService, FreightMilestone } from '../../providers/freight-api.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpClient } from '@angular/common/http';
import { ToastController, LoadingController, NavController, ActionSheetController, NavParams, Events } from '@ionic/angular';
import { MyNavService } from './../../providers/my-nav.service';
import { ShipmentFilters } from '../../interfaces/shipment-filters';
// import { CargoWiseFilter } from './../../providers/freight-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-shipment-list',
  templateUrl: 'shipment-list.html',
  styleUrls: ['./shipment-list.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShipmentListPage {
  freightmilestones: FreightMilestone[] = new Array<FreightMilestone>();
  public filters: ShipmentFilters = { cargowisecode: '', shipmentno: '', orderno: '', datefrom: '', dateto: '', openshipments: true };
  
  public hideFilters = true;
  constructor(
    public actionSheetCtrl: ActionSheetController,
    public inAppBrowser: InAppBrowser,
    public loading: LoadingController,
    public http: HttpClient,
    public freightApiService: FreightApiService,
    public toastCtrl: ToastController,
    public router: Router,
    public navCtrl: NavController,
    public navService: MyNavService
  ) {}

  async ionViewDidEnter() {
    
  }

  async listShipments(form: NgForm) {
    const spinner = await this.loading.create();
  
    spinner.present().then(() => {
      
    this.freightApiService.GetShipments('SIMFISSEA', this.filters.shipmentno, this.filters.orderno, this.filters.datefrom, this.filters.dateto, this.filters.openshipments).subscribe((result: FreightMilestone[]) => {
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
