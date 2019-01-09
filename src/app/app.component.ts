import { TransportLeg } from './providers/freight-api.service';
import { environment } from './../environments/environment.prod';
import { NetworkService } from './providers/network.service';
import { MyNavService } from './providers/my-nav.service';
import { AboutModal } from './pages/about-modal/about-modal';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Events, MenuController, Platform, ModalController, NavController } from '@ionic/angular';

import { UserData } from './providers/user-data';
import { ProfileSelectModal } from './pages/profile-select-modal/profile-select-modal';

import * as moment from 'moment'; // TODO: remove;
import { GlobalService } from './providers/global.service';
import { truncate } from 'fs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Shipments',
      url: '/shipments',
      icon: 'boat'
    },
    {
      title: 'Reports',
      url: '/reports',
      icon: 'stats'
    },
    {
      title: 'Notifications',
      url: '/event-notifications',
      icon: 'notifications'
    },
    {
      title: 'Subscribe',
      url: '/subscriptions',
      icon: 'mail'
    }
    // {
    //   title: 'Test Map',
    //   url: '/map',
    //   icon: 'map',
    //   data: {
    //     transportLeg: { // Some data from S00975554
    //       '$id': '20',
    //       'estimatedArrival': '2018-11-16T15:29:00',
    //       'estimatedDeparture': '2018-11-15T15:29:00',
    //       'actualArrival': moment().subtract(1, 'days').toDate(), // null,
    //       'actualDeparture': null,
    //       'portOfDischarge': 'USSEA',
    //       'portOfLoading': 'USTIW',
    //       'voyageNumber': '0185E',
    //       'vesselName': 'EVER SIGMA',
    //       'transportMode': 0,
    //       'legType': 2,
    //       'carrier': null,
    //       'customValues': null,
    //       'VesselLloydsIMO': '9300439'
    //     }        
    //   }     
    // }
  ];

  // appPages = [
  //   {
  //     title: 'Schedule',
  //     url: '/app/tabs/(schedule:schedule)',
  //     icon: 'calendar'
  //   },
  //   {
  //     title: 'Shipments',
  //     url: '/app/tabs/(speakers:speakers)',
  //     icon: 'contacts'
  //   },
  //   { title: 'Map', url: '/app/tabs/(map:map)', icon: 'map' },
  //   {
  //     title: 'About',
  //     url: '/app/tabs/(about:about)',
  //     icon: 'information-circle'
  //   }
  // ];

  // tigersPages = [
  //   {
  //     title: 'Schedule',
  //     url: '/app/tabs/(schedule:schedule)',
  //     icon: 'calendar'
  //   },
  //   {
  //     title: 'Shipments',
  //     url: '/app/tabs/(speakers:speakers)',
  //     icon: 'contacts'
  //   },
  //   {
  //     title: 'Reports',
  //     url: '/app/tabs/(reports:reports)',
  //     icon: 'contacts'
  //   },
  //   { title: 'Events', url: '/app/tabs/(map:map)', icon: 'map' },
  //   {
  //     title: 'Events Subscription',
  //     url: '/app/tabs/(about:about)',
  //     icon: 'information-circle'
  //   }
  // ];
  loggedIn = false;
  isSplitViewDisabled = true;
  isMenuDisabled = true;

  constructor(
    private events: Events,
    private menu: MenuController,
    private router: Router,
    private userData: UserData,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    private navService: MyNavService,
    private network: NetworkService,
    private global: GlobalService,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();    
      this.splashScreen.hide();

      this.network.initializeNetworkEvents();

      this.global.isDevice = this.platform.is('cordova');

      this.isMenuDisabled = false || environment.production;
      this.isSplitViewDisabled = false || environment.production;
    });
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.updateLoggedInStatus(true);

      this.isSplitViewDisabled = false;
      this.isMenuDisabled = false;
    });

    this.events.subscribe('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    this.events.subscribe('user:logout', () => {
      this.updateLoggedInStatus(false);

      this.isSplitViewDisabled = true;
      this.isMenuDisabled = true;
    });
  }

  selectTab(index: number, fallbackUrl: string) {
    const tabs = document.querySelector('ion-tabs');
    let promise: Promise<any> = null;
    if (tabs) {
      promise = tabs.componentOnReady();
      promise.then(() => {
        return tabs.select(index);
      });
    } else {
      promise = this.navigate(fallbackUrl);
    }
    return promise.then(() => {
      return this.menu.toggle();
    });
  }

  navigate(url: string, data?: any) {

    if (data) {
      this.navService.push(data);
    }

    return this.navCtrl.navigateRoot(url);
    // return this.router.navigateByUrl(url);
  }

  logout() {
    this.userData.logout().then(() => {
      return this.navigate('/login');
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.router.navigateByUrl('/tutorial');
  }

  async presentAboutModal() {
    const modal = await this.modalCtrl.create({
      component: AboutModal
    });

    modal.present();
  }

  async presentProfileSelectModal() {
    
    const modal = await this.modalCtrl.create({
      component: ProfileSelectModal,
      componentProps: {
        selectionRequired: false
      }
    });

    modal.present();
  }
}
