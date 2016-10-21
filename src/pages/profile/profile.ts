import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FeedsPage } from '../feeds/feeds';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {

  constructor(public navCtrl: NavController) {

  }

  gotoFeedSetup() {
    this.navCtrl.push(FeedsPage);
  }

}
