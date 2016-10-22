import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { Feeds } from '../providers/feeds';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: [Feeds]
})

export class MyApp {
  rootPage = TabsPage;

  constructor(public platform: Platform, public feeds: Feeds) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}
