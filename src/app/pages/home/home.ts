import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['./home.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage {

  constructor(
    public router: Router,
    public userData: UserData
  ) {}
}
