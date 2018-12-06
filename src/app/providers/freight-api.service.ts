import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';


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

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
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
      return topics.map((topic) => new EventTopic(topic));
    }));
    // .pipe(catchError(error => {
    //       console.log(`Failed request for Subscriptions. Details: ${error}`);

    //       return of(new Array<EventTopic>());
    //     }
    //   ));
  }
}
