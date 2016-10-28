import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Feeds } from '../../providers/feeds';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
  providers: []
})

export class NewsPage {
  feedRAW: any = [];
  feed: any = [];
  errorMessage: any;
  searchFor: string = "";
  shouldShowCancel: boolean = false;

  constructor(public navCtrl: NavController, public feeds: Feeds) {
  }

  ngOnInit() {this.loadData();}

  loadData() {
    this.feeds.load().then(
      data => {
        this.feedRAW = data;
        this.feed = data;
      },
      error => { this.feedRAW = []; this.feed = []; this.errorMessage = error; }
    );
  }

  showDetails(indexKey, event) {
    event.srcElement.parentNode.className = "hideIT";
    event.srcElement.parentNode.nextElementSibling.className = "showIT";
    event.srcElement.parentNode.nextElementSibling.nextElementSibling.className = "more";
  }

  hideDetails(indexKey, event) {
    event.srcElement.parentNode.className = "hideIT";
    event.srcElement.parentNode.previousElementSibling.className = "hideIT";
    event.srcElement.parentNode.previousElementSibling.previousElementSibling.className = "more";
    event.srcElement.parentNode.previousElementSibling.previousElementSibling.focus();
  }

  onSearchCancel(event) {
    this.feed = this.feedRAW;
  }

  onSearchInput(event) {
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
  }

  dateDisplay(type, pubDate) {
    if (type == 0) {
      var tmpDate: any = pubDate / (60 * 60 * 1000);
      if (tmpDate > 24) {
        var d: any = (tmpDate / 24) + "d ";
        return d;
      } else {
        return tmpDate + "h";
      }
    } else if (type == 1) {
      var tmpDate: any  = new Date(pubDate);
      return tmpDate;
    }
  }
}
