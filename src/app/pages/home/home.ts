import { map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { FreightApiService, FreightMilestone } from './../../providers/freight-api.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import 'chartjs-plugin-labels';

import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['./home.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage {

  constructor(
    public router: Router,
    public userData: UserData,
    public freightService: FreightApiService,
    public loading: LoadingController
  ) {

    const rootStyle = getComputedStyle(document.body);
    // const lateColor = rootStyle.getPropertyValue('--ion-color-secondary');
    // const openColor = rootStyle.getPropertyValue('--ion-color-mybackground');


    this.colors = {
      primary: rootStyle.getPropertyValue('--ion-color-primary'),
      secondary: rootStyle.getPropertyValue('--ion-color-secondary'),
      mybackground: rootStyle.getPropertyValue('--ion-color-mybackground'),
      white: '#ffffff'
    };

    // TODO: Add transparency
    this.chartColors = [
      { 
        backgroundColor: [this.colors.mybackgroundopenColor, this.colors.secondary],
        borderColor: [this.colors.mybackgroundopenColor, this.colors.secondary]
      }
    ];

    this.chartOptions = {
      legend: {
        display: false
      },
      events: [],
  
      labels: {
          // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
          render: 'default',
   
          // precision for percentage, default is 0
          precision: 0,
   
          // identifies whether or not labels of value 0 are displayed, default is false
          showZero: true,
   
          // font size, default is defaultFontSize
          fontSize: 12,
   
          // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
          fontColor: [this.colors.primary, this.colors.white],
   
          // font style, default is defaultFontStyle
          fontStyle: 'normal',
   
          // font family, default is defaultFontFamily
          fontFamily: '\'Lucida Sans Unicode\', \'Lucida Grande\', sans-serif',
   
          // draw text shadows under labels, default is false
          textShadow: false,
   
          // draw label in arc, default is false
          // bar chart ignores this
          arc: true,
   
          // position to draw label, available value is 'default', 'border' and 'outside'
          // bar chart ignores this
          // default is 'default'
          position: 'default',
   
          // draw label even it's overlap, default is true
          // bar chart ignores this
          overlap: true,
   
          // show the real calculated percentages from the values and don't apply the additional logic to fit the percentages to 100 in total, default is false
          showActualPercentages: true
        }
      };
  }

  // Doughnut
  public colors = undefined;
  public chartType = 'pie';
  public chartLabels: string[] = ['Open', 'Late'];
  public chartData: number[] = [];
  public chartColors: any[] = undefined;

  public chartOptions = undefined;

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  async ionViewWillEnter() {

    const testCargoWiseCode = 'SIMFISSEA';
    const shipmentNo = '';
    const orderNo = '';
    const openShipments = true;
    const fromDate = moment().subtract(6, 'months').toDate();
    const toDate = moment().toDate();

    const spinner = await this.loading.create();
    spinner.present().then(() => {
       this.freightService
       .GetShipments(testCargoWiseCode, 
          shipmentNo,
          orderNo,
          fromDate,
          toDate,
          openShipments
        ).subscribe((shipments: FreightMilestone[]) => {
        
        const totalShipmentsCount = shipments.length;
        let lateCount = 0;

        shipments.forEach(shipment => {

          if (!!shipment.EstimatedDelivery) { // Not null, undefined, empty string
          
            if (moment(shipment.EstimatedDelivery, 'MMM DD YYYY hh:mm A') < moment()) {
              lateCount++;
            }
          }
        });      

        const openShipmentsCount = totalShipmentsCount - lateCount;

        this.chartData = [openShipmentsCount, lateCount];

        spinner.dismiss();

       }, error =>  spinner.dismiss());
     });
  }
}

