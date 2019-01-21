import { MyNavService } from './../../providers/my-nav.service';
import { FreightApiService, ModeType, TransportLeg } from './../../providers/freight-api.service';
import { Component, ElementRef, ViewChild, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';

import { LoadingController, NavController, ToastController } from '@ionic/angular';

import { MapHostService } from '../../providers/map-host-service';
import { BehaviorSubject } from 'rxjs';
import { GlobalService } from '../../providers/global.service';


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
  isUnavailable = {
    vesselNumber: false,
    vesselPosition: false,
    fromPortDetails: false,
    toPortDetails: false
  };

  returnToShipment: string;

  readonly routingTabIndex = 2;

  createdToastInstances: any[];


  @ViewChild('map') mapElement: ElementRef;

  private _mapHostInitialisedSource = new BehaviorSubject<boolean>(false);
  mapHostInitialised$ = this._mapHostInitialisedSource.asObservable(); // Observable stream; subscribers will automatically receive updated values.

  constructor(
    private mapHostService: MapHostService,
    private freightApiService: FreightApiService,
    public loading: LoadingController,
    public navService: MyNavService,
    public navCtrl: NavController,
    private global: GlobalService,
    private toastCtrl: ToastController
  ) { }
  
  ngOnInit() {
    this.mapHostService
    .initialize(this.mapElement.nativeElement)
    .then(() => {
      this._mapHostInitialisedSource.next(true);
    }, () => {
      this._mapHostInitialisedSource.next(false);
    });    
  }
  
  ngOnDestroy() {

    if (this._mapHostInitialisedSource.value === true) {
      this.mapHostService.uninitialize();
    }
  }

  async ionViewDidEnter() {

    this.createdToastInstances = [];

    const params = this.navService.pop();
    this.returnToShipment = params['returnToShipment'];
    this.transportLeg = params['transportLeg'];

    if (!this.transportLeg) {
      this.onMapFailedToLoad();
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


    this.isUnavailable = {
      vesselNumber: false,
      vesselPosition: false,
      fromPortDetails: false,
      toPortDetails: false
    };
  
    // Get vessel position:

    const spinner = await this.loading.create();
    await spinner.present();

    try {

      if (this.legIsComplete()) {
        
        // Already arrived
        this.currentFreightLocation = null;

      }  else {

        if (!this.isTransportModeValid(this.transportLeg.transportMode)) {
          throw new Error(`${this.transportLeg.transportMode} is not a recognised transport mode.`);
        }

        await this.setCurrentFreightLocation(this.getVesselIdentifier(this.transportLeg));
      }

      // Get geography of ports:

      const portDetails = await this.freightApiService.GetPortDetails([this.transportLeg.portOfLoading, this.transportLeg.portOfDischarge]).toPromise();

      const fromPortDetail = portDetails && portDetails.length
        ? portDetails.filter(p => p.Code === this.transportLeg.portOfLoading).pop()
        : null;

      const toPortDetail = portDetails && portDetails.length
        ? portDetails.filter(p => p.Code === this.transportLeg.portOfDischarge).pop()
        : null;

      if (fromPortDetail) {
        this.fromPort = new Microsoft.Maps.Location(fromPortDetail.Latitude, fromPortDetail.Longitude);
      } else {
        this.fromPort = null;
        this.isUnavailable.fromPortDetails = true;
      }

      if (toPortDetail) {
        this.toPort = new Microsoft.Maps.Location(toPortDetail.Latitude, toPortDetail.Longitude);
      } else {
        this.toPort = null;
        this.isUnavailable.toPortDetails = true;
      }    

    } catch (err) {

      console.log(err);
      spinner.dismiss();

      this.onMapFailedToLoad();

      return;    
    }
    
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

  async ionViewDidLeave() {
    this.createdToastInstances.forEach(toast => 
      toast && toast.dismiss() // Should not cause issues even if toast was already dismissed.
    );
  }

  async setCurrentFreightLocation(vesselNumber: string) {

    if (!vesselNumber) {

      this.currentFreightLocation = null;
      this.isUnavailable.vesselNumber = true;

    } else {

      const vesselPosition = await this.freightApiService.GetShipGeoLoc(vesselNumber).toPromise();
    
      if (vesselPosition &&
        !this.invalidCoordinates(+vesselPosition.LAT, +vesselPosition.LON)) {
        
        this.currentFreightLocation = new Microsoft.Maps.Location(vesselPosition.LAT, vesselPosition.LON);

      } else {

        this.currentFreightLocation = null;
        this.isUnavailable.vesselPosition = true;
      } 
    }
  }

  onMapFailedToLoad() {
    this.presentToast('Failed to load map details.');
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

    if (this.fromPort) {
      this.mapHostService.addIconPushpin(
        this.fromPort,
        'Port of Loading',
        'assets/img/Sm-ADD.png',
        new Microsoft.Maps.Point(Math.ceil(this.circleIconDimensions.x / 2), this.circleIconDimensions.y)
      );
    }

    if (this.toPort) {
      this.mapHostService.addIconPushpin(
        this.toPort,
        'Port of Discharge',
        'assets/img/Sm-ATA.png',
        new Microsoft.Maps.Point(Math.ceil(this.circleIconDimensions.x / 2), this.circleIconDimensions.y)
      );
    }

    const drawnMapLocations = [this.fromPort, this.toPort, this.currentFreightLocation]
      .filter(ml => !!ml); // Filter out flags for which there is no data.

    if (drawnMapLocations.length > 0) {
      this.mapHostService.setViewToIncludeLocations(drawnMapLocations); 
    }      

    if (this.legIsComplete() && this.fromPort && this.toPort && this.doDrawLineForCompleteLeg) {

      this.mapHostService.drawLine([this.fromPort, this.toPort]);
    }

    // Alert user to missing data:
    if (this.isUnavailable.fromPortDetails || this.isUnavailable.toPortDetails || this.isUnavailable.vesselPosition) {

      const missingDataMsg =  
        (`${this.isUnavailable.fromPortDetails 
          ? 'Port of Loading, ' : ''
        }${this.isUnavailable.toPortDetails 
          ? 'Port of Discharge, ' : ''
        }${this.isUnavailable.vesselPosition
          ? 'Current Vessel Location' : ''}`
        ).replace(/,\s*$/, ''); // Remove trailing commas.

      this.presentToast(
        `Data are not available for: ${missingDataMsg}.`
        , true
      );
    }

    // (Show the vessel-number-error toast second, so that it will be on top.)
    if (this.isUnavailable.vesselNumber) {

      let identifierType = this.getVesselIdentifierType(this.transportLeg.transportMode);
      identifierType = identifierType ? identifierType : 'Vessel Identifier';
    
      this.presentToast(`No ${identifierType} is available. This is required to obtain current vessel location.`,
        true);    
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
      return leg.VesselLloydsIMO.trim();
    } else if (leg.transportMode === ModeType.AIR) {
      return leg.voyageNumber.trim();
    } else {
      return null;
    }
  }

  isTransportModeValid(mode: ModeType) {
    return (mode === ModeType.SEA) 
      || (mode === ModeType.AIR);
  }

  navigateBack() {

    const returnUrl = `shipment-details/${this.returnToShipment}/${this.routingTabIndex}`;
    this.navCtrl.navigateBack(returnUrl);
  }

  async presentToast(toastMessage: string, doRequireDismissal = false) {

    const toast = await this.toastCtrl.create(
      this.global.getToastConfiguration(toastMessage, doRequireDismissal)
    );

    this.createdToastInstances.push(toast);
    
    await toast.present();
  }
}
