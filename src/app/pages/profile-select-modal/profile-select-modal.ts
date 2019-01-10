import { Profile } from './../../providers/freight-api.service';
import { UserData } from './../../providers/user-data';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'profile-select-modal',
  templateUrl: './profile-select-modal.html'
})
export class ProfileSelectModal {

  selectionRequired: boolean;

  constructor(private modalController: ModalController,
    public router: Router,
    public navCtrl: NavController,
    public userData: UserData) { }

  goBack() {
    if (this.selectionRequired) {
      this.userData.logout().then(() => {
        this.navCtrl.navigateRoot('/login');
        this.closeModal();
      });
    } else {
      this.closeModal();
    }
  }

  closeModal() {       
    this.modalController.dismiss();   
  }

  onProfileSelected(profile: Profile) {
    this.userData.changeProfile(profile);
    // this.userData.selectedProfile = profile;

    this.navCtrl.navigateRoot('/home');
    // this.router.navigateByUrl('/home');

    this.closeModal();
  }

}
