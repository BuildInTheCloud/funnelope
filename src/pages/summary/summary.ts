import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Feeds } from '../../providers/feeds';
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})

export class SummaryPage {
  feed: any;
  errorMessage: any;

  constructor(public navCtrl: NavController, public feeds: Feeds) {
    this.loadData();
  }

  loadData() {
    this.feeds.load().then(
      data => {
        this.feed = data;
        console.log(data);
      },
      error => { this.feed = null; this.errorMessage = <any>error; }
    );

  }
}
