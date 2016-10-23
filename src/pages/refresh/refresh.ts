import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Feeds } from '../../providers/feeds';

@Component({
  selector: 'page-refresh',
  templateUrl: 'refresh.html',
  providers: []
})

export class RefreshPage {
  errorMessage: any;
  status: any;

  constructor(public navCtrl: NavController, public feeds: Feeds) {
  }

  refreshNews() {
    this.feeds.init().then(
      data => {
        status = data;
      },
      error => { this.errorMessage = <any>error; }
    );
  }

}
