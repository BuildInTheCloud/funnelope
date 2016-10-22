import { Component } from '@angular/core';

//-- app pages for tabs
import { NewsPage } from '../news/news';
import { ProfilePage } from '../profile/profile';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tabNews: any = NewsPage;
  tabProfile: any = ProfilePage;
  tabAbout: any = AboutPage;

  constructor() {

  }
}
