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
  searchFor: string = "";
  shouldShowCancel: boolean = false;

  constructor(public navCtrl: NavController, public feeds: Feeds) {

  }

  ngOnInit() {this.loadData();}

  loadData() {
    this.feedIndex = this.feeds.getMasterList();
  }

  selectFeed(event, feedKey, index) {
    var isSelected: boolean = document.getElementById("card"+index).className == "card-selected" ? true : false;
    if (isSelected) {
      document.getElementById("card"+index).className = "card-notselected"
    } else {
      document.getElementById("card"+index).className = "card-selected"
    }
  }

  onSearchCancel(event) {
    /*
    this.feed = this.feedRAW;
    */
  }

  onSearchInput(event) {
    /*
    var searchText = event.target.value;
    if (searchText == "" || searchText == undefined) {
      this.feed = this.feedRAW;
    } else {
      this.feed = [];
      for (var x = 0; x < this.feedRAW.length; x++) {
        if (this.feedRAW[x].title && searchText) {
          if (this.feedRAW[x].title.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
            this.feed.push(this.feedRAW[x]);
          }
        } else if (this.feedRAW[x].description && searchText) {
          if (this.feedRAW[x].description.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
            this.feed.push(this.feedRAW[x]);
          }
        }
      }
    }
    */
  }

}
