import { Injectable, Provider } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class Feeds {
  public feedMaster: any = [];
  public feedsRaw: any = [];
  public cache: any = [];

  constructor(public http: Http, public storage: Storage) {
    this.getFeedMaster();
  }

  public getFeedMaster(): any {
    if (this.cache.length == 0) {
      this.http.get("assets/data/feeds.json")
        .map(res => res.json())
        .subscribe(data => {
          this.feedMaster = data;
          this.buildNewsCache();
        })
      ;
    } else {
      console.log("CACHE", this.cache);
    }
  }

  public init(): Promise<any> {
    return Promise.resolve(true);
  }

  public load(): any {
    return this.storage.get('savedFeeds').then(data => {
      let objFromString = JSON.parse(data);
      if (data !== null && data !== undefined) {
        return JSON.parse(data);
      }
    });
  }

  private buildNewsCache(): any {
    this.feedMaster.forEach(feed => { this.featchFeed(feed); });
  }

  private featchFeed(feed: any) {
    //-- {"key": "gamespot-news", "type": "rss", "icon": "", "logo": "", "url": "http://www.gamespot.com/feeds/news/"},
    var url: string = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22'+encodeURIComponent(feed.url)+'%22&format=json';
    this.http.get(url).subscribe(res => {
      var newFeed: any = feed;
      newFeed.feed = this.processRawFeed(res.json(), feed.type);
      this.feedsRaw.push(newFeed);
      if (this.feedsRaw.length >= this.feedMaster.length) {
        this.mergeFeeds();
      }
    });
  }

  private mergeFeeds() {
    this.feedMaster.forEach(source => {
      console.log("mergeFeeds", source.feed);
      source.feed.forEach(news => {
        this.cache.push(news);
      });
      this.storage.set('savedFeeds', JSON.stringify(this.cache) );
      console.log("STORE SAVE", this.cache);
    });
  }

  private processRawFeed(data, type) {
    if (type == "rss") {
      return data.query.results.item;
    }
    if (type == "atom") {
      return data.query.results.item;
    }
  }

}

