import { GlobalService } from './../../providers/global.service';
import { OrderLine } from './../../providers/freight-api.service';
import { FreightApiService, Shipment, ModeType, TransportLeg } from '../../providers/freight-api.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpClient } from '@angular/common/http';
import { ToastController, LoadingController, NavController, ActionSheetController, NavParams, Events, Tabs } from '@ionic/angular';
import { forEach } from '@angular/router/src/utils/collection';
import { MyNavService } from '../../providers/my-nav.service';

@Component({
  selector: 'page-shipment-detail',
  templateUrl: 'shipment-detail.html',
  styleUrls: ['./shipment-detail.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShipmentDetailPage {
  public shipment: Shipment;
  @ViewChild(Tabs) tabRef: Tabs;
  constructor(
    public actionSheetCtrl: ActionSheetController,
    public inAppBrowser: InAppBrowser,
    public loading: LoadingController,
    public http: HttpClient,
    public freightApiService: FreightApiService,
    public toastCtrl: ToastController,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    private navService: MyNavService,
    private global: GlobalService
  ) {}

  async ionViewDidEnter() {

    if (this.tabRef) {

      const tabIndex = this.route.snapshot.paramMap.get('tabIndex');
      this.tabRef.select(tabIndex == null ? 0 : +tabIndex);
    }

    // TODO: Return to saved scroll position (https://github.com/joanroig/Ionic4-restore-scroll-position).

    const spinner = await this.loading.create();

    spinner.present().then(() => {
      
      this.freightApiService.GetShipment(this.route.snapshot.paramMap.get('ShipmentRef')).subscribe((result: Shipment) => {

        this.shipment =  result;
         if (this.shipment != null) {
           const orgConsignee = this.shipment.organizations.filter(o => o.organizationType === 0);
           if (orgConsignee.length > 0) {
             this.shipment.Consignee = orgConsignee[0];
           }
           const orgConsignor = this.shipment.organizations.filter(o => o.organizationType === 1);
           if (orgConsignor.length > 0) {
             this.shipment.Shipper = orgConsignor[0];
           }
           this.shipment.milestones = result.milestones;
           this.shipment.orders = result.orders;
           this.shipment.transportLegs = result.transportLegs;
           this.shipment.containers = result.containers;
           this.shipment.ShipmentNo = this.route.snapshot.paramMap.get('ShipmentRef');
          //  Get references
          if (this.shipment.references != null) {
              this.shipment.ShipmentNumber = this.shipment.references[0].Value;
          }       

         }
        spinner.dismiss();

        // TODO: Delete test data.
        // const line = new OrderLine();
        // line.Description = 'This is an order line with a long name.';
        // if (this.shipment.orders.length) {
        //   if (!this.shipment.orders[0].OrderLines) {
        //     this.shipment.orders[0].OrderLines = new Array<OrderLine>();
        //   }
        //   this.shipment.orders[0].OrderLines.push(line);
        //   this.shipment.orders[0].OrderLines.push(line);
        //   this.shipment.orders[0].OrderLines.push(line);
        //   this.shipment.orders[0].OrderLines.push(line);
        // }
        

      }, error =>  spinner.dismiss());
    });
  }

  isTransportModeValid(mode) {
    if ((mode === ModeType.SEA) || (mode === ModeType.AIR)) {
      return true;
    }
    return false;
  }

  getVesselIdentifierType(mode: ModeType) {
    if (mode === ModeType.SEA) {
      return 'IMO';
    } else if (mode === ModeType.AIR) {
      return 'Flight No.';
    } else {
      return null;
    }
  }

  getVesselIdentifier(leg: TransportLeg) {
    if (leg.transportMode === ModeType.SEA) {
      return leg.VesselLloydsIMO;
    } else if (leg.transportMode === ModeType.AIR) {
      return leg.voyageNumber;
    } else {
      return null;
    }
  }

  viewTransportLeg(leg: TransportLeg) {

    // First check that we have a vessel identifier.
    if (!this.getVesselIdentifier(leg)) {
      
      let identifierType = this.getVesselIdentifierType(leg.transportMode);
      identifierType = identifierType ? identifierType : 'Vessel Identifier';

      this.presentToast(`No ${identifierType}. This is required to load geolocation.`);

      return;
    }

    this.navService.push({
      transportLeg: leg,
      returnToShipment: this.shipment.ShipmentNo
    });

    this.navCtrl.navigateForward('map');

  }

  getMapIcon(leg: TransportLeg) {

    return `../../../assets/img/${
      leg.transportMode === ModeType.AIR ? 'Pin-Blue-Air.png' : 'Pin-Blue-Sea.png'
    }`;
  }

  async presentToast(toastMessage: string) {

    const toast = await this.toastCtrl.create(
      this.global.getToastConfiguration(toastMessage)
    );
    
    await toast.present();
  }
}
