import { NgModule, APP_INITIALIZER, Provider } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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
    Storage,
    { provide: Feeds,
        useFactory: (config: Feeds) => () => config.init(),
        deps: [],
        multi: true
    }
  ]
})

export class AppModule {

}
