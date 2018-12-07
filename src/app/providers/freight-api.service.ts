import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { plainToClass } from 'class-transformer';

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
