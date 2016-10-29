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
  downloading: boolean = false;

  constructor(public navCtrl: NavController, public feeds: Feeds) {

  }

  refreshNews() {
    this.downloading = true;
    this.status = "Loading Updates ....";
    this.feeds.refreshNews().then(
      data => {
        this.status = "Refresh Completed<br/>" + Date();
        this.downloading = false;
      },
      error => { this.errorMessage = <any>error; this.status = <any>error; }
    );
  }

}
