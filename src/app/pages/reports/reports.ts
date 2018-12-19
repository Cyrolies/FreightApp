import * as pbi from 'powerbi-client';
import { ToastController, LoadingController, NavController, NavParams, Events } from '@ionic/angular';
import { Component, ViewEncapsulation } from '@angular/core';
import { FreightSpendPage} from './freightspend/freightspend';
 // import { FreightMobilePage} from "../pagefolder/pagecontroler";
@Component({
  selector: 'page-about',
  templateUrl: 'reports.html',
  styleUrls: ['./reports.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportsPage {
  
  constructor(public navCtrl: NavController) {
    
   }

 onOpenReport(rep: string) {
   
  if (rep === '0') { // Freight Spend
   this.navCtrl.navigateForward('reports/freightspend');
  }
  if (rep === '1') { // Freight Shipments
   this.navCtrl.navigateForward('reports/freightshipment');
  }
  if (rep === '2') {// Freight Milestones
   this.navCtrl.navigateForward('reports/freightmilestone');
  }
 
}
}
