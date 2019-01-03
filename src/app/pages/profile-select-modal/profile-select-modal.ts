import { Profile } from './../../providers/freight-api.service';
import { UserData } from './../../providers/user-data';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'profile-select-modal',
  templateUrl: './profile-select-modal.html'
})
export class ProfileSelectModal {

  constructor(private modalController: ModalController,
    public router: Router,
    public userData: UserData) { }

  closeModal() {
    this.modalController.dismiss();
  }

  onProfileSelected(profile: Profile) {
    this.userData.changeProfile(profile);
    // this.userData.selectedProfile = profile;

    this.router.navigateByUrl('/home');

    this.closeModal();
  }

}
