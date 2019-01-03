import { Injectable } from '@angular/core';

// Use this service to transport non-simple types between pages.
// Example usage:
//  Calling page:
//    this.myNavService.push({myObjectId: 1, myObjectName: "hello"});
//    await this.navCtrl.goForward('the-url');
//  Destination page:
//    this.myObject = this.myNavService.pop();

@Injectable({
  providedIn: 'root'
})
export class MyNavService {

  private _myParamStack: any[] = [];

  constructor( ) { }

  push(val: any) {
    this._myParamStack.push(val);
  }
  pop(): any | undefined {
    return this._myParamStack.pop();
  }

}
