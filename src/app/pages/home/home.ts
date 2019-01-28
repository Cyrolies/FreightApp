import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { map } from 'rxjs/operators';
import { LoadingController, ToastController, Content, Platform } from '@ionic/angular';
import { FreightApiService, FreightMilestone, Profile } from './../../providers/freight-api.service';
import { Component, ViewEncapsulation, ViewChild, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import 'chartjs-plugin-labels';
import { format, formatDistance, formatRelative, subMonths} from 'date-fns';
import { UserData } from '../../providers/user-data';
import { round } from 'lodash';
import { BaseChartDirective } from 'ng2-charts';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['./home.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit, OnDestroy {

  constructor(
    public router: Router,
    public userData: UserData,
    public freightService: FreightApiService,
    public loading: LoadingController,
    private global: GlobalService,
    private toastCtrl: ToastController,
    private platform: Platform
  ) {

    const rootStyle = getComputedStyle(document.body);
    // const lateColor = rootStyle.getPropertyValue('--ion-color-secondary');
    // const openColor = rootStyle.getPropertyValue('--ion-color-mybackground');

    this.colors = {
      primary: rootStyle.getPropertyValue('--ion-color-primary'),
      secondary: rootStyle.getPropertyValue('--ion-color-secondary'),
      mybackground: rootStyle.getPropertyValue('--ion-color-mybackground'),
      white: '#ffffff',
      black: '#000000' 
    };

    // TODO: Add transparency
    this.chartColors = [
      { 
        backgroundColor: [this.colors.mybackground, this.colors.secondary], // [this.getRgbString(this.colors.mybackground, 0.8), this.getRgbString(this.colors.secondary, 0.8)],
        borderColor: [this.colors.mybackground, this.colors.secondary]
      }
    ];

    this.chartOptions.plugins.labels.fontColor = [this.colors.primary, this.colors.white];
  }

  public totalShipmentsCount: number;
  public dataLoaded = false;
  private profileSubscription: any;
  private selectedProfile: Profile;

  private pageIsInView = false;

  // Pie Chart:

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  @ViewChild('content', {read: ElementRef}) pageContent: ElementRef;
  @ViewChild('theToolbar', {read: ElementRef}) theToolbar: ElementRef;
  @ViewChild('theHeader', {read: ElementRef}) theHeader: ElementRef;
  
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
          // (This is the padding between the end of the graph and the end of the canvas.)
          outsidePadding: 15,

          // add margin of text when position is `outside` or `border`
          // default is 2
          // (This is the margin between the end of the graph and the start of the label text.)
          textMargin: 10 // TODO: Check that there is enough left/right margin on canvas to support this text margin.
        }
      }
  };

  ngOnInit() {

    this.pageIsInView = false;

    // Subscribing to selectedProfile$ serves to...
    //  i) give the current selectedProfile
    //  ii) trigger the specified function (to reload data) whenever the profile changes (IF the page is in view).
    this.profileSubscription = this.userData.selectedProfile$
       .subscribe(selectedProfile => {
          this.selectedProfile = selectedProfile;
          
          if (this.pageIsInView) {
            this.loadData();
          }

    });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.profileSubscription.unsubscribe();
  }

  ionViewDidEnter() {

    this.pageIsInView = true;

    this.loadData();
  }

  ionViewDidLeave() {
    this.pageIsInView = false;
  }

  async loadData() {

    this.dataLoaded = false;

    if (!(this.selectedProfile && this.selectedProfile.CargoWiseCode)) {

      this.presentToast('Could not determine selected Profile. Please close the app and re-login.');

      this.totalShipmentsCount = null;

      return;
    }

    const cargoWiseCode = this.selectedProfile.CargoWiseCode;
    const shipmentNo = '';
    const orderNo = '';
    const openShipments = true;
    const fromDate = format(subMonths(new Date().toISOString(), 6), 'yyyy-MM-dd');
    const toDate = format(new Date().toISOString(), 'yyyy-MM-dd');

    const spinner = await this.loading.create();
    spinner.present().then(() => {
       this.freightService
       .GetShipments(cargoWiseCode, 
          shipmentNo,
          orderNo,
          fromDate,
          toDate,
          openShipments,
          false
        ).subscribe((shipments: FreightMilestone[]) => {
        
        this.dataLoaded = true;

        this.totalShipmentsCount = shipments.length;
        let lateCount = 0;

        shipments.forEach(shipment => {

          if (!!shipment.EstimatedDelivery) { // Not null, undefined, empty string
          
            if (moment(shipment.EstimatedDelivery, 'MMM DD YYYY hh:mm A') < moment()) {
              lateCount++;
            }
          }
        });      

        const openShipmentsCount = this.totalShipmentsCount - lateCount;

        this.chartData = [
          Math.round(openShipmentsCount / this.totalShipmentsCount * 100), 
          Math.round(lateCount / this.totalShipmentsCount * 100)
        ];

        // If smallest slice has width less tha 12%, show labels outside chart.
        if (Math.min(this.chartData[0], this.chartData[1]) < 12) {
          this.chartOptions.plugins.labels.position = 'outside';
           this.chartOptions.plugins.labels.fontColor = [this.colors.white, this.colors.white];

        } else {
          this.chartOptions.plugins.labels.position = 'default';
          this.chartOptions.plugins.labels.fontColor = [this.colors.primary, this.colors.white];
        }

        this.reloadChart();

        spinner.dismiss();

       }, (error) => {

        spinner.dismiss();

        this.totalShipmentsCount = null;
        
        console.log(error);
        this.presentToast('Failed to fetch shipments from CargoWise. Please try again later.');

       });

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

  async presentToast(toastMessage: string) {

    const toast = await this.toastCtrl.create(
      this.global.getToastConfiguration(toastMessage)
    );
    
    await toast.present();
  }

  getChartStyle() {

    const maxWidth = (<HTMLElement>this.pageContent.nativeElement).getBoundingClientRect().width * 0.8;

    const toolbarHeight = (<HTMLElement>this.theToolbar.nativeElement).getBoundingClientRect().height;
    const headerHeight = (<HTMLElement>this.theHeader.nativeElement).getBoundingClientRect().height;
    const availableHeight = this.platform.height() * 0.9 - toolbarHeight - headerHeight;

    const chartWidth = Math.min(availableHeight, maxWidth);
    const chartWidthString = !chartWidth || isNaN(chartWidth) ? '100%' : `${chartWidth}px`; 

    return {
      'display': 'block',
      'padding-top': '20px',
      'width': chartWidthString,
      'margin': 'auto'
    };
  }
}

