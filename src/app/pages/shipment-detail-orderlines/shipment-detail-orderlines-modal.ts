import { OrderLine, Order } from './../../providers/freight-api.service';
import { UserData } from './../../providers/user-data';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MyNavService } from './../../providers/my-nav.service';

@Component({
  selector: 'shipment-detail-orderlines-modal',
  templateUrl: './shipment-detail-orderlines-modal.html'
})
export class ShipmentDetailsOrderLinesModal {
  order: Order;

  constructor(private modalController: ModalController,
    public router: Router,
    public navCtrl: NavController,
    public navService: MyNavService,
    public userData: UserData) { }

  goBack() {
    this.modalController.dismiss();  
   }
}
