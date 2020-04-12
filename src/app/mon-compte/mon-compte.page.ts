import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.page.html',
  styleUrls: ['./mon-compte.page.scss'],
})
export class MonComptePage implements OnInit {

  constructor(public menu: MenuController,public afAuth: AngularFireAuth, public afDB : AngularFireDatabase) {}
  ref : any;
  ionViewWillEnter() {
    this.menu.enable(true);

    /*this.afAuth.onAuthStateChanged(function(user) {
      if (user) {
        console.log("UID" + user.uid);
        console.log("email " + user.email);
        var ref = this.afDB.list('/users', ref => ref.orderByKey().equalTo(user.uid)).valueChanges();
        ref.subscribe(items => {
          console.log(items);
        });
      } else {
        // No user is signed in.
      }
    });*/
  }

  ngOnInit() {
  }

}
