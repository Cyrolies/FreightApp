import { NetworkService } from './../../providers/network.service';
import { ProfileSelectModal } from './../profile-select-modal/profile-select-modal';
import { AuthResult } from './../../providers/freight-api.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { MenuController, LoadingController, ToastController, ModalController } from '../../../../node_modules/@ionic/angular';
import { FreightApiService, ApplicationUser } from '../../providers/freight-api.service';
import { GlobalService } from '../../providers/global.service';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public freightApiService: FreightApiService,
    public userData: UserData,
    public router: Router,
    public menu: MenuController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private network: NetworkService,
    private global: GlobalService
  ) { }

  ionViewWillEnter() {
    this.menu.enable(false);
  }
  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  async onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {

      const spinner = await this.loading.create();

      await spinner.present();

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
            // Invalid login
            this.onLoginFailed();

          } else {

            this.userData.login(this.login.username, result.User);

            this.presentProfileSelectModal();            
          }

        }, (error) =>  {

          spinner.dismiss();

          this.onLoginFailed();

        });
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  onLoginFailed() {

    this.presentToast('Login failed.');

  }

  async presentProfileSelectModal() {
    const modal = await this.modalCtrl.create({
      component: ProfileSelectModal
    });

    modal.present();
  }

  isUserOnline(): boolean {

    const isOnline = this.network.isOnline();

    if (isOnline) {

      return true;

    } else {

      this.presentToast('No connection could be found. Please check your WiFi or Mobile conneciton.');
           
      return false;
    } 
  }

  async presentToast(toastMessage: string) {

    const toast = await this.toastCtrl.create(
      this.global.getToastConfiguration(toastMessage)
    );
    
    await toast.present();
  }

}

