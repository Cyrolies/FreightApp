import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { plainToClass } from 'class-transformer';
import { stringify } from '../../../node_modules/@angular/core/src/util';

export class CargoWiseFilter {
  constructor(readonly Name: string, readonly DatabaseColumnName: string, readonly Value: string) {}
}

export class EventTopic {
  $id: string;
  name: string;
  code: string;
  private subscribers: number;

  get isSubscribed() {
    return this.subscribers > 0;
  }
  set isSubscribed(isSubscribed: boolean) {
    this.subscribers = Number(isSubscribed);
  }

  // constructor(values: Object = {}) {
  //   Object.assign(this, values);
  // }
}

export class ShipmentEvent {
  $id: string;
  Id: number;
  ConsigneeCode: string;
  Consignee: string;
  ConsignorCode: string;
  Consignor: string;
  EventCode: string;
  ShipmentNo: string;
  EventDescription: string;
  AdditionalInfo: string;
  ActualDate: Date | null;
  EstimatedDate: Date | null;
  CreateDateTime: Date | null;
}

export class Shipment {
  Status: string;
  HouseBill: string;
  TransportMode: string;
  ConsigneeRef: string;
  ShipmentRef: string;
  PortOfLoading: string;
  Shipper: string;
  Consignee: string;
  Origin: string;
  Destination: string;
  EstimatedDeparture: string;
  PortOfDischarge: string;
  EstimatedDelivery: string;
  CargoBooked: string;
  Pickup: string;
  ActualDeparture: string;
  ImportCustomsClearance: string;
  TruckerNotified: string;
  ActualDelivery: string;
  ParcelDelivered: string;
  Inco: string;
  Weight: number;
  Volume: number;
  WeightUnit: string;
  VolumeUnit: string;
  LocalClient: string;
  JS_SystemCreateTimeUtc: Date;
}



@Injectable({
  providedIn: 'root'
})
export class FreightApiService {

  constructor(public http: HttpClient) { }

  /**
   * GetEventSubscriptions
   */
  public GetEventSubscriptions(): Observable<EventTopic[]> {

    console.log('FreightApiService: Get event subscriptions.');

    const endpoint = environment.freightApiUrl + 'FreightShipping/GetEventSubscriptions';

    const params = new HttpParams()
      .set('userName', environment.defaultUser);

    return this.http
    .get(endpoint, {params})
    .pipe(map(response => {
      const topics = response['topics'];

      return plainToClass(EventTopic, topics);
      // return topics.map((topic) => new EventTopic(topic));
    }));
    // .pipe(catchError(error => {
    //       console.log(`Failed request for Subscriptions. Details: ${error}`);

    //       return of(new Array<EventTopic>());
    //     }
    //   ));
  }

  public GetShipmentEvents(cargoWiseCode: string): Observable<ShipmentEvent[]> {

    console.log('FreightApiService: Get shipment events.');

    const endpoint = environment.freightApiUrl + 'FreightShipping/GetShipmentEvents';

    const params = new HttpParams()
      .set('cargowisecode', cargoWiseCode)
      .set('userName', environment.defaultUser);

    return this.http
    .get(endpoint, {params})
    .pipe(map((events: object[]) => {

      return plainToClass(ShipmentEvent, events);
    }));
  }

  public GetShipments(cargoWiseCode: string,
    shipmentNo: string,
    orderNo: string,
    fromDate: Date,
    toDate: Date,
    includeOpenShipments: boolean): Observable<Shipment[]> {

    console.log('FreightApiService: Get shipments.');

    const endpoint = environment.freightApiUrl + 'FreightShipping/GetShipments';

    const filters = new Array<CargoWiseFilter>();
      filters.push(new CargoWiseFilter('cargowisecode', 'cargowisecode', cargoWiseCode));
      filters.push(new CargoWiseFilter('shipmentNumber', 'shipmentNumber', shipmentNo));
      filters.push(new CargoWiseFilter('orderNumber', 'orderNumber', orderNo));
      filters.push(new CargoWiseFilter('DateFrom', 'DateFrom', fromDate != null ? fromDate.toDateString() : ''));
      filters.push(new CargoWiseFilter('DateTo', 'DateTo', toDate != null ? toDate.toDateString() : ''));
      filters.push(new CargoWiseFilter('OpenShipments', 'OpenShipments', includeOpenShipments ? '1' : '0'));

    const params = new HttpParams()
      .set('parameters', JSON.stringify(filters));

    return this.http
    .get(endpoint, {params})
    .pipe(map((shipments: object[]) => {

      return plainToClass(Shipment, shipments);
    }));
  }

  public SubscribeToShipmentEvents (topics: EventTopic[]): Observable<boolean> {

    console.log('FreightApiService: Subscribe to shipment events.');

    const endpoint = environment.freightApiUrl + 'FreightShipping/SubscribeToShipmentEvents';

    const body = {
      userName: environment.defaultUser,
      eventCodes: topics
        .filter(topic => topic.isSubscribed)
        .map(topic => topic.code)
    };

    return this.http
      .post(endpoint, body)
      .pipe(map(response => !!response)); // Return isSuccessful.
  }
}
