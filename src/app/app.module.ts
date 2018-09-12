import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { VehiclesPage } from '../pages/vehicles/vehicles';
import { FilmsPage } from '../pages/films/films';
import { StarshipsPage } from '../pages/starships/starships';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FcmProvider } from '../providers/fcm/fcm';

import { Firebase } from '@ionic-native/firebase';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SwapiProvider } from '../providers/swapi/swapi';
import { HttpClientModule } from '@angular/common/http';

const firebase = {
  // your firebase web config
  apiKey: "AIzaSyBzRGNWdbH8e3tcnoN3xIg7rh-u-K6KnVE",
  authDomain: "skywalker-d3fc6.firebaseapp.com",
  databaseURL: "https://skywalker-d3fc6.firebaseio.com",
  projectId: "skywalker-d3fc6",
  storageBucket: "skywalker-d3fc6.appspot.com",
  messagingSenderId: "878666276571"
}

@NgModule({
  declarations: [
    MyApp,
    FilmsPage,
    VehiclesPage,
    StarshipsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FilmsPage,
    VehiclesPage,
    StarshipsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FcmProvider,
    Firebase,
    SwapiProvider
  ]
})
export class AppModule {}
