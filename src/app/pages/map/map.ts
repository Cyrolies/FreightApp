import { MyNavService } from './../../providers/my-nav.service';
import { FreightApiService, ModeType, TransportLegResult, Position, Geography, TransportLeg } from './../../providers/freight-api.service';
import { Component, ElementRef, ViewChild, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';

import { LoadingController, NavController } from '@ionic/angular';

import { MapHostService } from '../../providers/map-host-service';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { BingMapsService } from '../../providers/bing-maps-service';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    MapHostService
  ]
})
export class MapPage implements OnInit, OnDestroy {

  // Configuration: ------------------------------------
  readonly pinIconDimensions = { // TODO: Provide multiple icons for different screen sizes.
    x: 25,
    y: 32
  };
  readonly circleIconDimensions = {
    x: 32,
    y: 32
  };

  readonly doDrawLineForCompleteLeg = true;
  
  // -------------------------------------------------

  transportLeg: TransportLeg;

  fromPort: Microsoft.Maps.Location;
  toPort: Microsoft.Maps.Location;
  currentFreightLocation: Microsoft.Maps.Location;

  returnToShipment: string;

  readonly routingTabIndex = 2;


  @ViewChild('map') mapElement: ElementRef;

  private _mapHostInitialisedSource = new BehaviorSubject<boolean>(false);
  mapHostInitialised$ = this._mapHostInitialisedSource.asObservable(); // Observable stream; subscribers will automatically receive updated values.

  constructor(
    private mapHostService: MapHostService,
    private freightApiService: FreightApiService,
    public loading: LoadingController,
    public navService: MyNavService,
    public navCtrl: NavController
  ) { }
  
  ngOnInit() {
    this.mapHostService
    .initialize(this.mapElement.nativeElement)
    .then((success) => {
      this._mapHostInitialisedSource.next(true);
    }, (error) => {
      this._mapHostInitialisedSource.next(false);
    });
    
    // this.mapHostInitialized = true;
  }
  ngOnDestroy() {

    if (this._mapHostInitialisedSource.value === true) {
      this.mapHostService.uninitialize();
    }
  }

  async ionViewDidEnter() {

    const params = this.navService.pop();
    this.returnToShipment = params['returnToShipment'];
    this.transportLeg = params['transportLeg'];

    if (!this.transportLeg) {

      // TODO: display error.
      return;
    }

    // Sea shipment test-----------------------------------------
      // this.transportLeg.transportMode = ModeType.SEA;
      // this.transportLeg.VesselLloydsIMO = '9300439';
      // this.transportLeg.voyageNumber = '';
      // this.transportLeg.portOfLoading = 'USTIW';
      // this.transportLeg.portOfDischarge = 'USSEA';
      // this.transportLeg.actualArrival = moment().subtract(1, 'days').toDate();
      // const shipmentNumber = 'S00975554';
      // const legSequence = 2;

    // Air shipment test-----------------------------------------
      // this.transportLeg.transportMode = ModeType.AIR;
      // this.transportLeg.VesselLloydsIMO = '';
      // this.transportLeg.voyageNumber = 'SA123';
      // this.transportLeg.portOfLoading = 'USSEA';
      // this.transportLeg.portOfDischarge = 'NLAMS';
      // this.transportLeg.actualArrival = moment().subtract(1, 'days').toDate();
      // const shipmentNumber = 'S01004325';
      // const legSequence = 1;

  
    // Get vessel position:

    const spinner = await this.loading.create();
    await spinner.present();

    try {

      if (this.legIsComplete()) {
        // Already arrived  

        this.currentFreightLocation = null;

      } else {

        if (this.transportLeg.transportMode === ModeType.SEA) {
        
          // const imoNumber = await this.getImoNumber(shipmentNumber, legSequence); 

          const vesselPosition = await this.freightApiService.GetShipGeoLoc(this.transportLeg.VesselLloydsIMO).toPromise();
  
          if (vesselPosition &&
            !this.invalidCoordinates(+vesselPosition.LAT, +vesselPosition.LON)) {
            
            this.currentFreightLocation = new Microsoft.Maps.Location(vesselPosition.LAT, vesselPosition.LON);

          } else {
            // Position data is not available for some reason.
            // TODO: Display error message?

            this.currentFreightLocation = null;

          }          
  
        } else if (this.transportLeg.transportMode === ModeType.AIR) {
  
          const vesselPosition = await this.freightApiService.GetAirlineGeoLoc(this.transportLeg.voyageNumber).toPromise();
  
          if (vesselPosition && vesselPosition.geography && 
            !this.invalidCoordinates(vesselPosition.geography.latitude, vesselPosition.geography.longitude)) {
            
            this.currentFreightLocation = new Microsoft.Maps.Location(vesselPosition.geography.latitude, vesselPosition.geography.longitude);

          } else {
            // Position data is not available for some reason.
            // TODO: Display error message?

            this.currentFreightLocation = null;

          }          
  
  
        } else {
          
          throw new Error(`${this.transportLeg.transportMode} is not a recognised transport mode.`);
        }

      }

      // Get geography of ports:

      const portDetails = await this.freightApiService.GetPortDetails([this.transportLeg.portOfLoading, this.transportLeg.portOfDischarge]).toPromise();

      const fromPortDetail = portDetails.filter(p => p.Code === this.transportLeg.portOfLoading).pop();
      const toPortDetail = portDetails.filter(p => p.Code === this.transportLeg.portOfDischarge).pop();

      this.fromPort = new Microsoft.Maps.Location(fromPortDetail.Latitude, fromPortDetail.Longitude);
      this.toPort = new Microsoft.Maps.Location(toPortDetail.Latitude, toPortDetail.Longitude);

    } catch (err) {

      console.log(err);

      return;
    
    }
    
    // const imoNumber = '9300439';
    // const flightNumber = 'SA410'; // == SAA410

    // let position;
    // this.freightApiService.GetShipGeoLoc(imoNumber)
    // .subscribe(res => {
    //   position = res;
    // });

    // this.freightApiService.GetAirlineGeoLoc(flightNumber)
    // .subscribe(res => {
    //   position = res;
    // });



    // Wait for map to be ready:
    if (this._mapHostInitialisedSource.value === false) {

      const mapHostInitialisedSubscription = this.mapHostInitialised$
        .subscribe((isMapHostInitialised: boolean) => {

          if (!isMapHostInitialised) {
            return;
          }

          mapHostInitialisedSubscription.unsubscribe();
          
          // Map is ready to use! Can now use Microsoft.Maps Api.
          console.log('Map is ready!');

          spinner.dismiss();
          this.onMapReady();

        }

      );
    } else {

      spinner.dismiss();
      this.onMapReady();
    }
  }

   async getImoNumber(shipmentNumber: string, sequenceOfThisLeg: number): Promise<string> {

    const legResults = await this.freightApiService.GetIMONumbers(shipmentNumber).toPromise();

    return legResults
      .filter(l => +l.Sequence === sequenceOfThisLeg)
      .pop()
      .IMONumber;
  }

  onMapReady() {

    this.mapHostService.clearAllPushpins();

    // Draw current location first, so that it will overlay POD/POL if necessary.
    if (this.currentFreightLocation) { 
      
      this.mapHostService.addIconPushpin(
        this.currentFreightLocation,
        'Current Location',
        this.transportLeg.transportMode === ModeType.AIR ? 'assets/img/Pin-Blue-Air.png' : 'assets/img/Pin-Blue-Sea.png',
        new Microsoft.Maps.Point(Math.ceil(this.pinIconDimensions.x / 2), this.pinIconDimensions.y)
      );

    }

    this.mapHostService.addIconPushpin(
      this.fromPort,
      'Port of Loading',
      'assets/img/Sm-ADD.png',
      new Microsoft.Maps.Point(Math.ceil(this.circleIconDimensions.x / 2), this.circleIconDimensions.y)
    );

    this.mapHostService.addIconPushpin(
      this.toPort,
      'Port of Discharge',
      'assets/img/Sm-ATA.png',
      new Microsoft.Maps.Point(Math.ceil(this.circleIconDimensions.x / 2), this.circleIconDimensions.y)
    );

    if (this.currentFreightLocation) {

      this.mapHostService.setViewToIncludeLocations([this.fromPort, this.toPort, this.currentFreightLocation]);   
    
    } else {

      this.mapHostService.setViewToIncludeLocations([this.fromPort, this.toPort]);

    }

    if (this.legIsComplete() && this.doDrawLineForCompleteLeg) {

      this.mapHostService.drawLine([this.fromPort, this.toPort]);

    }     
  }

  legIsComplete(actualArrival?: Date) {

    const arrivalDate = actualArrival ? actualArrival : this.transportLeg.actualArrival;

    return arrivalDate && (arrivalDate < new Date());
  }

  invalidCoordinates(latitude: number, longitude: number) {

    // Coordinates should not be exactly zero.
    return (Math.abs(latitude) < Number.EPSILON && Math.abs(longitude) < Number.EPSILON);

  }

  navigateBack() {

    const returnUrl = `shipment-details/${this.returnToShipment}/${this.routingTabIndex}`;
    this.navCtrl.navigateBack(returnUrl);
  }
}
