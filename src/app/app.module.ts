import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { Feeds } from '../providers/feeds';
//-- app pages
import { SummaryPage } from '../pages/summary/summary';
import { ReadPage } from '../pages/read/read';
import { ProfilePage } from '../pages/profile/profile';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    SummaryPage,
    ReadPage,
    ProfilePage,
    SettingsPage,
    AboutPage
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
    SettingsPage,
    AboutPage
  ],
  providers: [
    Feeds
  ]
})

export class AppModule {}
