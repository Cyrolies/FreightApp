/// <reference path="../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />

import { ProfileSelectModalModule } from './pages/profile-select-modal/profile-select-modal.module';
import { AboutModalModule } from './pages/about-modal/about-modal.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, Platform } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHttpInterceptor } from './providers/app-http-interceptor.service';
import { BingMapsService } from './providers/bing-maps-service';
import { HttpModule } from '@angular/http';
import { Network } from '@ionic-native/network/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpModule,

    AboutModalModule,
    ProfileSelectModalModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    InAppBrowser,
    SplashScreen,
    StatusBar,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    BingMapsService,
    Network,
    ScreenOrientation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
