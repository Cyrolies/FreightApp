import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FreightApiService {

  readonly baseApi = 'http://192.168.10.176/staging/FreightAPI/';
  // tslint:disable-next-line:max-line-length
  readonly token = 'xEr2jrPyUf1g75byz5LMc2XImNUGAOJEC97zhqGAb9WSxbR4dOMFn3XvHwuKCZ-wiGoKJWUqltEOPQmNvkNHJJGRAjfRbfOukS2lbMm-HtUZHc-A8CoUlLTF3WUu4WcJEPLNuegoCZa2apodEMeEmmf1UDTEcXwqMNhgtto_QXMa4vVWJRX0cdv0lG-EvOE0vjWtYDltmu5oZBB1aJ33DxqdqF4lYurWslBopIx2LV3nZyPVhzTjfqqmaaHbUD8SwDoXqvSmWKllL6E9rx_efvYf-zsX6SaoKWPm1KWN5PKYT1XhyP6h31rG4oFisBJd4pbkV0FEtjgyl5oEob5-6soEZVC5t0qK1HHplXdLRD9TLr6Pv0y3ZYAQ8SEZI0MAZCeQN6QXzG-dulT9LLLVHdniq8U6EfmMxZaVuW4KAk5CcQ8ehQDDdvNdjMliTNAJJ69ff3zk0T1zxteoIZArQbnB2LozANMRNCLkdLcszXeZJEUdaoHxEdHBOCUsa-wYktk2oEnX4nOm6hwZlMJPUBKAhHL8tVCUJ8gr-1mRSKw';
  readonly useOAuth = false;


  constructor() { }

  /**
   * GetEventSubscriptions
   */
  public GetEventSubscriptions() {
    console.log('FreightApiService: Get event subscriptions.');
  }
}
