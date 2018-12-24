import { map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { FreightApiService, FreightMilestone } from './../../providers/freight-api.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import 'chartjs-plugin-labels';

import { UserData } from '../../providers/user-data';
import { round } from 'lodash';
import { BaseChartDirective } from 'ng2-charts';

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
        backgroundColor: [this.getRgbString(this.colors.mybackground, 0.8), this.getRgbString(this.colors.secondary, 0.8)],
        borderColor: [this.colors.mybackground, this.colors.secondary]
      }
    ];

    this.chartOptions.plugins.labels.fontColor = [this.colors.primary, this.colors.white];
  }

  // Doughnut

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;
  
  public colors = undefined;
  public chartType = 'pie';
  public chartLabels: string[] = ['OPEN', 'LATE'];
  public chartData: number[] = [];
  public chartColors: any[] = undefined;

  public chartOptions = {
    legend: {
      display: false
    },
    events: [],

    elements: {
      arc: {
          borderWidth: 0
      }
    },

    plugins: {

      labels: {
          // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
          render: (args: any) => {
            return `${args.value}%\n${args.label}`;
          },
  
          // precision for percentage, default is 0
          precision: 0,
  
          // identifies whether or not labels of value 0 are displayed, default is false
          showZero: true,
  
          // font size, default is defaultFontSize
          fontSize: 17,
  
          // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
          fontColor: undefined,
  
          // font style, default is defaultFontStyle
          fontStyle: 'normal',
  
          // font family, default is defaultFontFamily
          fontFamily: '\'Lucida Sans Unicode\', \'Lucida Grande\', sans-serif',
  
          // draw text shadows under labels, default is false
          textShadow: false,
  
          // draw label in arc, default is false
          // bar chart ignores this
          arc: false,
  
          // position to draw label, available value is 'default', 'border' and 'outside'
          // bar chart ignores this
          // default is 'default'
          position: 'default',
  
          // draw label even it's overlap, default is true
          // bar chart ignores this
          overlap: true,
  
          // show the real calculated percentages from the values and don't apply the additional logic to fit the percentages to 100 in total, default is false
          showActualPercentages: true,

          // add padding when position is `outside`
          // default is 2
          outsidePadding: 2,

          // add margin of text when position is `outside` or `border`
          // default is 2
          textMargin: 12
        }
      }
    };

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

        this.chartData = [Math.round(openShipmentsCount / totalShipmentsCount * 100), 
          Math.round(lateCount / totalShipmentsCount * 100)];

        // If smallest slice has width less tha 12%, show labels outside chart.
        if (Math.min(this.chartData[0], this.chartData[1]) < 12) {
          this.chartOptions.plugins.labels.position = 'outside';
          this.chartOptions.plugins.labels.fontColor = [this.colors.white, this.colors.white];
        }

        this.reloadChart();

        spinner.dismiss();

       }, error =>  spinner.dismiss());
     });
  }

  reloadChart() {
    if (this.chart !== undefined) {
       this.chart.chart.destroy();
       this.chart.chart = 0;

       this.chart.data = this.chartData;
       this.chart.labels = this.chartLabels;
       this.chart.chartType = this.chartType;
       this.chart.options = this.chartOptions;
       this.chart.colors = this.chartColors;

       this.chart.ngOnInit();
    }
  }

  getRgbString(hexCode: string, opacity: number) {
    const convert = require('color-convert');

    const rgbArray: number[] = convert.hex.rgb(hexCode);

    return `rgb(${rgbArray[0]},${rgbArray[1]},${rgbArray[2]},${opacity})`;
  }
}

