import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Feeds } from '../../providers/feeds';

@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html'
})

export class FeedsPage {
  feedIndex: any = [];
  errorMessage: any;

  constructor(public navCtrl: NavController, public feeds: Feeds) {

  }

  ngOnInit() {this.loadData();}

  loadData() {
    this.feedIndex = this.feeds.getMasterList();
  }

}
