import { NetworkService } from './../../providers/network.service';
import { ProfileSelectModal } from './../profile-select-modal/profile-select-modal';
import { AuthResult } from './../../providers/freight-api.service';
import { Component, ViewEncapsulation, AfterViewInit, ViewChild, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { MenuController, LoadingController, ToastController, ModalController } from '../../../../node_modules/@ionic/angular';
import { FreightApiService, ApplicationUser } from '../../providers/freight-api.service';
import { GlobalService } from '../../providers/global.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { HttpErrorResponse } from '@angular/common/http';
import { Network } from '@ionic-native/network/ngx';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage implements OnInit {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  @ViewChild('logo')
  logo: ElementRef;

  @ViewChild('loginbutton', {read: ElementRef}) 
  loginButton: ElementRef;

  doHideLogoButton = false;

  constructor(
    public freightApiService: FreightApiService,
    public userData: UserData,
    public router: Router,
    public menu: MenuController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private network: Network,
    private global: GlobalService,
    private screenOrientation: ScreenOrientation
  ) { }


  ngOnInit() {

    this.screenOrientation.onChange().subscribe(
      () => {
          console.log('Orientation Changed');

          this.doHideLogoButton = false;
          setTimeout(() => {
            this.handleLogoCollision(this.logo, this.loginButton);
          }, 200);
      }
    );
  }

  handleLogoCollision(logo: ElementRef, loginButton: ElementRef) {
    const logoTop = logo.nativeElement.getBoundingClientRect().top;
    const loginButtonBottom = loginButton.nativeElement.getBoundingClientRect().bottom;

    if (logoTop < loginButtonBottom) {
      this.doHideLogoButton = true;
    } else {
      this.doHideLogoButton = false;
    }
  }

  ionViewWillEnter() {
    // this.menu.enable(false);

    this.userData.getUsername().then((username) => {
      if (username) {
        this.login.username = username;
      } 
    });
  }

  ionViewDidEnter() {
    this.handleLogoCollision(this.logo, this.loginButton);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    // this.menu.enable(true);
  }

  async onLogin(form: NgForm) {

    this.submitted = true;

    setTimeout(() => {
      this.handleLogoCollision(this.logo, this.loginButton);
    }, 200);

    if (form.valid) {

      const spinner = await this.loading.create();

      await spinner.present();

      try {

        // If running on device, first check if has internet connectivity:
        if (this.global.isDevice && !this.isUserOnline()) {

          spinner.dismiss();

          return;
        }
                
        // Attempt log in:
        this.freightApiService
        .Authenticate(this.login.username, this.login.password)
        .subscribe((result: AuthResult) => {

          spinner.dismiss();

          if (!result.IsAuthSuccessful) {
            
            // Invalid login.
            this.onLoginFailed();

          } else if (!(result.User && result.User.Profiles && result.User.Profiles.length)) {

            // No profiles for this user.
            this.presentToast('You are not linked to any profile. Please log a call.');

          } else {            

            this.userData.login(this.login.username, result.User);

            this.presentProfileSelectModal();            
          }

        }, (error) =>  {

          if ((error instanceof HttpErrorResponse) && ((<HttpErrorResponse>error).status === 401)) {            
            this.presentToast('Invalid username or password.');

          } else {
            this.presentToast('Login failed.');
          }

          spinner.dismiss();

          this.onLoginFailed();

        });

      } catch (error) {
        spinner.dismiss();

        this.presentToast('Login failed.');

        this.onLoginFailed();
      }
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  onLoginFailed() { }

  async presentProfileSelectModal() {
    const modal = await this.modalCtrl.create({
      component: ProfileSelectModal,
      componentProps: {
        selectionRequired: true
      },
      backdropDismiss: false,
      keyboardClose: true
    });

    modal.present();
  }

  isUserOnline(): boolean {

    const isOnline = this.isOnline();

    if (isOnline) {

      return true;

    } else {

      this.presentToast('No connection could be found. Please check your WiFi or Mobile conneciton.');
           
      return false;
    } 
  }

  public isOnline() {
    return this.network.type !== 'none';
  }

  async presentToast(toastMessage: string) {

    const toast = await this.toastCtrl.create(
      this.global.getToastConfiguration(toastMessage)
    );
    
    await toast.present();
  }

}

