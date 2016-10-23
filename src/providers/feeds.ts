import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class Feeds {
  public feedMaster: any = [];
  public feedsRaw: any = [];
  public cache: any = [];

  constructor(public http: Http, public storage: Storage) {
    if (this.cache.length == 0) {
      this.init();
    } else {
      console.log("IN CACHE");
    }
  }

  public load(): any {
    return this.storage.get('savedFeeds').then(data => {
      let objFromString = JSON.parse(data);
      if (data !== null && data !== undefined) {
        return objFromString;
      }
    });
  }

  public init(): Promise<any> {
    console.log("INIT FEED");
    return Promise.resolve(
      this.http.get("assets/data/feeds.json")
        .map(res => res.json())
        .subscribe(data => {
          //console.log(1);
          this.feedMaster = data;
          this.buildNewsCache();
          return true;
        })
    );
  }

  private buildNewsCache(): any {
    this.feedMaster.forEach(feed => {
      //-- {"key": "gamespot-news", "type": "rss", "icon": "", "logo": "", "url": "http://www.gamespot.com/feeds/news/", "feed": ""},
      var url: string = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22'+encodeURIComponent(feed.url)+'%22&format=json';
      this.http.get(url).subscribe(res => {
        //console.log(2);
        var newFeed: any = feed;
        var rawFeed = this.processRawFeed(res.json(), feed.type);
        rawFeed.forEach(source => {
          //console.log(3);
          source.icon = feed.icon;
          source.logo = feed.logo;
          source.pubDate = (new Date(source.pubDate)).getTime();
        });
        newFeed.feed = rawFeed;
        this.feedsRaw.push(newFeed);
        if (this.feedsRaw.length >= this.feedMaster.length) {
          this.feedMaster.forEach(source => {
            if (source.feed) {
              source.feed.forEach(news => {
                this.cache.push(news);
              });
            }
          });
          this.cache = this.cache.sort(function(a,b){return b.pubDate - a.pubDate});
          this.storage.set('savedFeeds', JSON.stringify(this.cache) );
        }
      });
    });
  }

  private processRawFeed(data, type) {
    if (type == "rss") {
      var returnItems = data.query.results.item;
      returnItems.forEach(source => {
        if (source.description) {
          try {
            source.description = source.description.replace(/<a /g, "<a target=\"_blank\" ");
          } catch(e) {
            source.description = JSON.stringify(source.description)
            source.description = source.description.replace(/<a /g, "<a target=\"_blank\" ");
          }
        }
      });
      return returnItems;
    }
    if (type == "atom") {
      var returnItems = data.query.results.item;
      returnItems.forEach(source => {
        //console.log(7);
        if (source.description) {
          source.description = source.description.replace(/<a /g, "<a target=\"_blank\" ");
        }
      });
      return returnItems;
    }
  }

}

