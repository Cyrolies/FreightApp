import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHttpInterceptor } from './providers/app-http-interceptor.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot()
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
    }],
  bootstrap: [AppComponent]
})
export class AppModule {}
