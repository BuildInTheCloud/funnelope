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
    this.status = "Loading Updates ....";
    this.feeds.refreshNews().then(
      data => {
        this.status = "SUCCESS: " + JSON.stringify(data);
      },
      error => { this.errorMessage = <any>error; this.status = <any>error; }
    );
  }

}
