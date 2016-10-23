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
  shouldShowCancel: boolean = true;


  constructor(public navCtrl: NavController, public feeds: Feeds) {
  }

  ngOnInit() {this.loadData();}

  loadData() {
    this.feeds.load().then(
      data => {
        this.feed = data;
        this.feedRAW = data;
        this.feed = data;
      },
      error => { this.feedRAW = []; this.feed = []; this.errorMessage = <any>error; }
    );
  }

  showDetails(indexKey, event) {
    event.srcElement.parentNode.className = "hideIT";
    event.srcElement.parentNode.nextElementSibling.className = "showIT";
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

}
