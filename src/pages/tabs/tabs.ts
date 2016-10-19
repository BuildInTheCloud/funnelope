import { Component } from '@angular/core';

//-- app pages for tabs
import { SummaryPage } from '../summary/summary';
import { ReadPage } from '../read/read';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tabSummary: any = SummaryPage;
  tabRead: any = ReadPage;
  tabProfile: any = ProfilePage;
  tabSettings: any = SettingsPage;
  tabAbout: any = AboutPage;

  constructor() {

  }
}
