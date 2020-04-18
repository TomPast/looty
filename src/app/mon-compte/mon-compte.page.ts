import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.page.html',
  styleUrls: ['./mon-compte.page.scss'],
})
export class MonComptePage implements OnInit {

  dataUser = {
    email: '',
    pseudo: '',
    img : '',
    nb_parties : 0,
    nb_victoires : 0,
    poucentage_victoire: 0.0
  };

  ref : any;
  loaded : boolean;

  constructor(public menu: MenuController,public afAuth: AngularFireAuth, public afDB : AngularFireDatabase, public afSG : AngularFireStorage,private changeRef: ChangeDetectorRef) {
    this.loaded = false;
  }

  ionViewWillEnter() {
    this.menu.enable(true);
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        //Récupération de l'image de profil

        console.log("UID" + user.uid);
        console.log("email " + user.email);
        console.log("pseudo " + user.displayName);
        console.log("img " + user.photoURL);
        this.dataUser.email = user.email;
        this.dataUser.pseudo = user.displayName;
        if(this.dataUser.nb_parties != 0){
          this.dataUser.poucentage_victoire = this.dataUser.nb_victoires / this.dataUser.nb_parties;
        }
        var storage = this.afSG.storage;
        var pathReference = storage.ref(user.photoURL);
        pathReference.getDownloadURL().then(url => {
          this.dataUser.img = url;
          this.loaded = true;
          console.log("IMAGE CHARGEE");
          this.changeRef.detectChanges();
        }).catch(error => {
          this.dataUser.img = "assets/img/avatar.png"; //Si erreur on affiche l'avatar de base
          this.loaded = true;
          console.log("IMAGE BUGGEE");
        });
      } else {
        // No user is signed in.
      }
    });
  }
  ionViewCanEnter(): boolean {
    if(this.loaded == true) {
      return true;
    }
    return false;
  }
  ngOnInit() {
  }

}
