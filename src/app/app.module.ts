import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule} from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireStorageModule} from '@angular/fire/storage';

import { Camera } from '@ionic-native/camera/ngx';
import {HttpClientModule} from '@angular/common/http';

export const firebaseConfig = {
  apiKey: 'AIzaSyCJMIDZM7YzXMrZyISCzTNSPSTa4QVMiEY',
  authDomain: 'looty-f0719.firebaseapp.com',
  databaseURL: 'https://looty-f0719.firebaseio.com',
  projectId: 'looty-f0719',
  storageBucket: 'looty-f0719.appspot.com',
  messagingSenderId: '659577575117',
  appId: '1:659577575117:web:3c67795382bf73eea27b84',
  measurementId: 'G-NPVJ8Q9T8G'
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
