import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { Feeds } from '../providers/feeds';
//-- app pages
import { SummaryPage } from '../pages/summary/summary';
import { ReadPage } from '../pages/read/read';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';
import { FeedsPage } from '../pages/feeds/feeds';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    SummaryPage,
    ReadPage,
    ProfilePage,
    AboutPage,
    FeedsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    SummaryPage,
    ReadPage,
    ProfilePage,
    AboutPage,
    FeedsPage
  ],
  providers: [
    Feeds
  ]
})

export class AppModule {}
