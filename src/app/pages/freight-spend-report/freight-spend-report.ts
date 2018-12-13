import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';
import { FreightApiService } from '../../providers/freight-api.service';
import { LoadingController, NavController, Events } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-freight-spend-report',
  templateUrl: 'freight-spend-report.html',
  styleUrls: ['./freight-spend-report.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FreightSpendReportPage {

  constructor(
    public freightApiService: FreightApiService,
    public router: Router,
    public loading: LoadingController,
    public http: HttpClient,
    private userData: UserData,
    public navCtrl: NavController,
    private events: Events
  ) {}
}
