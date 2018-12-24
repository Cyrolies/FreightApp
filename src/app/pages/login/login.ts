import { ProfileSelectModal } from './../profile-select-modal/profile-select-modal';
import { AuthResult } from './../../providers/freight-api.service';
import { environment } from './../../../environments/environment';
import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { MenuController, LoadingController, ToastController, ModalController } from '../../../../node_modules/@ionic/angular';
import { FreightApiService, ApplicationUser } from '../../providers/freight-api.service';



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
    public modalCtrl: ModalController
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

      // Attempt log in:
      spinner.present().then(() => {
        this.freightApiService
        .Authenticate(this.login.username, this.login.password)
        .subscribe((result: AuthResult) => {

          if (!result.IsAuthSuccessful) {
            // Invalid login
            this.onLoginFailed();
          } else {
            this.userData.login(this.login.username, result.User);

            this.presentProfileSelectModal();
            
          }

          spinner.dismiss();

        }, (error) =>  {
          this.onLoginFailed();
          spinner.dismiss();
        });
      });
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  onLoginFailed() {
    this.presentfailedLoginToast();
  }

  async presentfailedLoginToast() {
    const toast = await this.toastCtrl.create({
      message: 'Login failed.', // Todo: Differentiate between invalid username/password and server error.
      duration: 5000,
      position: 'bottom',
      showCloseButton: false
    });

    await toast.present();
  }

  async presentProfileSelectModal() {
    const modal = await this.modalCtrl.create({
      component: ProfileSelectModal
    });

    modal.present();
  }
}
