import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Feeds } from '../../providers/feeds';
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})

export class SummaryPage {
  feed: any = [];
  errorMessage: any;

  constructor(public navCtrl: NavController, public feeds: Feeds) {
    this.loadData();
  }

  loadData() {
    this.feeds.load().then(
      data => {
        console.log(data.results.item);
        this.feed = data.results.item;
      },
      error => { this.feed = []; this.errorMessage = <any>error; }
    );

  }
}
