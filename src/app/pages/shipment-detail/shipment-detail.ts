import { GlobalService, EventCode } from './../../providers/global.service';
import { ShipmentDetailsOrderLinesModal } from './../shipment-detail-orderlines/shipment-detail-orderlines-modal';
import { FreightApiService, Shipment, ModeType, TransportLeg, OrderLine, Order } from '../../providers/freight-api.service';
import { Component, ViewEncapsulation, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpClient } from '@angular/common/http';
import { ToastController, LoadingController, NavController, ActionSheetController, NavParams, Events, Tabs, ModalController } from '@ionic/angular';
import { forEach } from '@angular/router/src/utils/collection';
import { MyNavService } from '../../providers/my-nav.service';
import { Reference } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'page-shipment-detail',
  templateUrl: 'shipment-detail.html',
  styleUrls: ['./shipment-detail.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShipmentDetailPage implements OnInit, OnDestroy {
  public shipment: Shipment;
  public shipmentNumber: string;
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
    public global: GlobalService,
    public router: Router,
    public modalCtrl: ModalController,
  ) {}


  async ngOnInit() {
    await this.loadShipment();

    // Only set initial tab once in the component's lifecycle.
    //  Thereafter, preserve the tab selection.

    if (this.tabRef) {
      this.tabRef.select(0);
    }

  }

  ngOnDestroy() {
    console.log('Detail page destroyed.');
  }

  async loadShipment() {

    this.shipmentNumber = this.route.snapshot.paramMap.get('ShipmentRef');

    const spinner = await this.loading.create();

    spinner.present().then(() => {
      
      this.freightApiService.GetShipment(this.shipmentNumber).subscribe((result: Shipment) => {

        // tslint:disable-next-line:no-debugger
        // debugger;

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

           this.shipment.milestones = this.shipment.milestones.sort((m1, m2) => {
              const code1 = EventCode[m1.EventCode as keyof typeof EventCode];
              const code2 = EventCode[m2.EventCode as keyof typeof EventCode];

              return this.global.compareCodes(code1, code2);
            });


           this.shipment.transportLegs = result.transportLegs;
           this.shipment.containers = result.containers;
           this.shipment.ShipmentNo = this.shipmentNumber;
           this.shipment.references = result.references;
          //  Get references
          if (this.shipment.references != null) {
            for (const ref of this.shipment.references) {
              // Not empty and not shipment number
             if (ref.value !== null) {
               if (!(ref.referenceType = '5')) {
               this.shipment.ReferenceAll = this.shipment.ReferenceAll != null ? this.shipment.ReferenceAll + '-' : ''  + ref.value;
               }
             }
           
          }

          if (result.orders != null) {
              
              result.orders.forEach( (order) => {       
                let refDetails: string = null;
                
                order.References.forEach ( (refer) => {
                  if ( refer.value !== null && refer.value !== '0' ) {
                    console.log(order.ReferencesAll);
                    console.log(refer.value);
                    
                    if ((refDetails || '').search(refer.value) === -1) {  
                     refDetails = refDetails != null ? refDetails + ', ' + refer.value : refer.value;
                     console.log(refDetails);
                    }
                  }
                });
                order.ReferencesAll = refDetails;
              });
              this.shipment.orders = result.orders;
            
          }
            
          }       

         }
        spinner.dismiss();        

      }, error =>  spinner.dismiss());
    });
  }

  async presentOrderItemsModal(ord: Order) {
    const modal = await this.modalCtrl.create({
      component: ShipmentDetailsOrderLinesModal,
      componentProps: {
        'order': ord
      },
      backdropDismiss: false,
      keyboardClose: true
    });

    modal.present();
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

    // The check for a valid vessel identifier (IMO/Flight# is performed by the map component).

    this.navService.push({
      transportLeg: leg,
      returnToShipment: this.shipment.ShipmentNo
    });

    // The first option doesn't seem to allow navigatin back and fourth:
    //    this.navCtrl.navigateForward(['./map'], true, { relativeTo: this.route});
    this.navCtrl.navigateForward(`/shipments/details/${this.shipmentNumber}/map`);
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
