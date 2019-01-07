import { CargoWiseFilter } from './../../providers/freight-api.service';
import { NgForm } from '@angular/forms';
import { Component, ViewEncapsulation } from '@angular/core';
import { MyNavService } from './../../providers/my-nav.service';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ShipmentFilters } from '../../interfaces/shipment-filters';


@Component({
  selector: 'page-shipment-search',
  templateUrl: 'shipment-search.html',
  styleUrls: ['./shipment-search.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShipmentSearchPage {
//  filters: ShipmentFilters ={cargowisecode:"",shipmentno:"",orderno:"",datefrom:"",dateto:"",openshipments:true};
  constructor(
    public actionSheetCtrl: ActionSheetController,
    public inAppBrowser: InAppBrowser,
    public router: Router,
    public navCtrl: NavController,
    public navService: MyNavService
  ) {}

  ionViewDidEnter() {
  }

  listShipments(form: NgForm) {
    // const cargowisefilters = new Array<CargoWiseFilter>();
    // cargowisefilters.push(new CargoWiseFilter('cargowisecode', 'cargowisecode', "" ));
    // cargowisefilters.push(new CargoWiseFilter('shipmentNumber', 'shipmentNumber', this.filters.shipmentno));
    // cargowisefilters.push(new CargoWiseFilter('orderNumber', 'orderNumber',this.filters.orderno));
    // cargowisefilters.push(new CargoWiseFilter('DateFrom', 'DateFrom', this.filters.datefrom));
    // cargowisefilters.push(new CargoWiseFilter('OpenShipments', 'OpenShipments', this.filters.openshipments));

    // this.navService.push(cargowisefilters);
    
    this.navCtrl.navigateForward('shipments');
  }
}
