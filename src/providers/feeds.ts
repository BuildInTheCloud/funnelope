import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Feeds {
  data: any;
  constructor(public http: Http) {

  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }
    // don't have the data yet
    return new Promise(resolve => {
      this.http.get('/api').subscribe(res => {
        this.data = this.processRawFeed(res.json());
        resolve(this.data);
      });
    });
  }

  processRawFeed(data) {
    console.log(data);
    return data;
  }

}
