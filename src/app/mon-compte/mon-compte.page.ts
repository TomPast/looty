import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {entry} from "../classement-defaites/classement-defaites.page";

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
    nb_defaites : 0,
    pourcentage_victoire : 0.0
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
        //Récupération de l'image de profil, email, pseudo et uid
        console.log("UID" + user.uid);
        console.log("email " + user.email);
        console.log("pseudo " + user.displayName);
        console.log("img " + user.photoURL);

        this.dataUser.email = user.email;
        this.dataUser.pseudo = user.displayName;

        //Récupération et calcul des statistiques de jeu
        this.afDB.database.ref("users").child(user.uid).once("value", (snapshot, prevChildKey) => {
          this.dataUser.nb_parties = snapshot.val().nb_parties;
          this.dataUser.nb_defaites = snapshot.val().nb_defaites;
          this.dataUser.nb_victoires = snapshot.val().nb_victoires;
          if(this.dataUser.nb_parties != 0){
            this.dataUser.pourcentage_victoire = parseFloat((this.dataUser.nb_victoires / this.dataUser.nb_parties).toFixed(2));
          }
        });
        var storage = this.afSG.storage;
        var pathReference = storage.ref(user.photoURL);
        pathReference.getDownloadURL().then(url => {
          this.dataUser.img = url;
          this.loaded = true;
          this.changeRef.detectChanges();
        }).catch(error => {
          this.dataUser.img = "assets/img/avatar.png"; //Si erreur on affiche l'avatar de base
          this.loaded = true;
        });
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
