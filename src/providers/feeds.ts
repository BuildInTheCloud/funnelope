import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Feeds {
  data: any;
  constructor(public http: Http) {
  }

  load() {
    var feedUrl: string = "http://rss.nytimes.com/services/xml/rss/nyt/Business.xml";
    var url: string = 'https://query.yahooapis.com/v1/public/yql?q=select%20title%2Clink%2Cdescription%20from%20rss%20where%20url%3D%22'+encodeURIComponent(feedUrl)+'%22&format=json';
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }
    // don't have the data yet
    return new Promise(resolve => {
      this.http.get(url).subscribe(res => {
        this.data = this.processRawFeed(res.json());
        resolve(this.data);
      });
    });
  }

  processRawFeed(data) {
    return data.query;
  }

}
