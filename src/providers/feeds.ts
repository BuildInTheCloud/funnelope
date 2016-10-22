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
    this.feedMaster.forEach(feed => {
      //-- {"key": "gamespot-news", "type": "rss", "icon": "", "logo": "", "url": "http://www.gamespot.com/feeds/news/", "feed": ""},
      var url: string = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22'+encodeURIComponent(feed.url)+'%22&format=json';
      this.http.get(url).subscribe(res => {
        var newFeed: any = feed;
        console.log(feed);
        var rawFeed = this.processRawFeed(res.json(), feed.type);
        rawFeed.forEach(source => {
          source.icon = feed.icon;
        });
        newFeed.feed = rawFeed;
        this.feedsRaw.push(newFeed);
        if (this.feedsRaw.length >= this.feedMaster.length) {
          this.feedMaster.forEach(source => {
            source.feed.forEach(news => {
              this.cache.push(news);
            });
            this.storage.set('savedFeeds', JSON.stringify(this.cache) );
          });
        }
      });
    });
  }

  private processRawFeed(data, type) {
    if (type == "rss") {
      var returnItems = data.query.results.item;
      returnItems.forEach(source => {
        if (source.description) {
          source.description = source.description.replace(/<a /g, "<a target=\"_blank\" ")
        }
      });
      return returnItems;
    }
    if (type == "atom") {
      var returnItems = data.query.results.item;
      returnItems.forEach(source => {
        if (source.description) {
          source.description = source.description.replace(/<a /g, "<a target=\"_blank\" ")
        }
      });
      return returnItems;
    }
  }

}

