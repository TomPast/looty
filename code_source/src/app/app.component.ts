import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {


  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Mon Compte',
      url: '/mon-compte',
      icon: 'person'
    },
    {
      title: 'Jouer une partie',
      url: '/recherche-partie',
      icon: 'game-controller'
    },
    {
      title: 'Règle du jeu',
      url: '/regle',
      icon: 'list'
    },
    {
      title: 'Classement',
      url: '/classement',
      icon: 'people'
    },
    {
      title: 'Deconnexion',
      url: '/sign-out',
      icon: 'people'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afAuth: AngularFireAuth,
    public afDB : AngularFireDatabase,
    public afSG : AngularFireStorage
  ) {
    this.initializeApp();
  }



  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  img : string;

  ngOnInit() {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        var storage = this.afSG.storage;
        var pathReference = storage.ref(user.photoURL);
        pathReference.getDownloadURL().then(url => {
          this.img = url;
        }).catch(error => {
          this.img = "assets/img/avatar.png"; //Si erreur on affiche l'avatar de base
        });
      }
    });
  }
}
