import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recherche-partie',
  templateUrl: './recherche-partie.page.html',
  styleUrls: ['./recherche-partie.page.scss'],
})
export class RecherchePartiePage implements OnInit {
  user_id ='';
  pseudo = '';
  listUserWaiting = [];


  ref_waiting = firebase.database().ref('waitingRoom');

  constructor(public afDB : AngularFireDatabase,public afAuth: AngularFireAuth,private changeRef: ChangeDetectorRef, private router: Router) {

  }

  ionViewWillEnter(){
    //Récupération des info du joueur connecté, si pas connecté on le redirige vers la page de connexion
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        console.log("UID" + user.uid);
        this.user_id = user.uid;
        this.pseudo = user.displayName;
        this.listUserWaiting = [];
        this.getUsersWaiting(); //Récupération et affichage de tous les utilisateurs en attente
        this.getCurrentGame();
        this.userWait(); //L'utilisateur passe en attente
      } else {
        this.router.navigateByUrl('/connexion');
      }
    });
  }

  ionViewWillLeave(){
    this.userLeaveQueue();
    this.ref_waiting.off();
    this.afDB.database.ref(this.user_id).child('partie_en_cours').off();
  }

  //------------------------------
  //Place l'utilisateur en attente
  //------------------------------
  userWait() {
    firebase.database().ref('waitingRoom/' + this.user_id).set({
      isWaiting: true
    }).then(()=>{
      console.log("PLAYER "+this.user_id+" IS WAITING...");
    });
  }

  //---------------------------------------------------------------------------------------------------------
  //Rempli listUserWaiting avec les pseudo des personnes attendant de trouver une partie (autoactualisation)
  //---------------------------------------------------------------------------------------------------------
  getCurrentGame() {
    //Récupération des UID des personnes présentes dans la waitingRoom
    this.afDB.database.ref('/users/'+this.user_id).child('partie_en_cours').on("value", (snapshot, prevChildKey) => {
      if(snapshot.val() != ''){
        this.router.navigateByUrl('/partie/'+snapshot.val());
      }
    })
  }

  //-----------------------------------------
  //Récupère la liste des joueurs en attente
  //-----------------------------------------
  getUsersWaiting(){
    //Récupération des UID des personnes présentes dans la waitingRoom
    this.ref_waiting.on("value", (snapshot, prevChildKey) => {
      this.listUserWaiting = [];
      snapshot.forEach(childSnapshot => {
        let ref_uid = firebase.database().ref('users/'+ childSnapshot.key);

        //Récupération du pseudo des personnes à partir de l'UID précédemment trouvé
        ref_uid.once("value", (snapshot, prevChildKey) => {
          console.log("JOUEUR EN ATTENTE : "+ snapshot.val().pseudo);
          this.listUserWaiting.push(snapshot.val().pseudo);
          console.log("LISTE : "+this.listUserWaiting);
          if (!this.changeRef['destroyed']) {
            this.changeRef.detectChanges();
          }
        });
      });
    })
  }

  //--------------------------------
  //Retire l'utilisateur de la queue
  //--------------------------------
  userLeaveQueue(){
    let ref = firebase.database().ref('waitingRoom/'+ this.user_id);
    ref.remove();
  }

  ngOnInit() {

  }


}
