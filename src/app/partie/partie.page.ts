import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {game, player, playerDisplay} from '../data/game';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-partie',
  templateUrl: './partie.page.html',
  styleUrls: ['./partie.page.scss'],
})



export class PartiePage implements OnInit {
  currentuser = { uid:"",
                  pseudo:"",
  }

  currentuser_game:player = new player();

  GAMEID = '';
  GAME: game;
  index:number = 0;
  playersDisplay= new Array<playerDisplay>();

  constructor(private route: ActivatedRoute,private afDB : AngularFireDatabase, private afSG : AngularFireStorage,private afAuth: AngularFireAuth,public router: Router) {
    this.GAME = new game();
  }

  ionViewWillEnter(){
    this.GAMEID = this.route.snapshot.params['GAMEID'];
    this.getPlayersNameAndPicture(); //Récupération des pseudos et des images des joueurs dans la partie
    console.dir(this.playersDisplay);
    this.afAuth.onAuthStateChanged(user => { //Récupération de l'UID et du pseudo du joueur connecté sur l'appareil
      if (user) {
        this.currentuser.uid = user.uid;
        this.currentuser.pseudo = user.displayName;
      }
    }).then(()=>{
      console.log("UID : "+this.currentuser.uid);
      this.afDB.database.ref("users/").child(this.currentuser.uid).child("partie_en_cours").on("value",(snapshot, prevChildKey)=>{
        console.log("OKIII");
        if(snapshot.val()== ''){
          this.router.navigateByUrl('/classement');
        }
      });
    });

    this.afDB.database.ref('/games/').child(this.GAMEID).on("value", (snapshot, prevChildKey) => { // Récupération de toutes les données de jeu
      this.GAME = snapshot.val();
      this.currentuser_game = this.GAME.players.find(data => data.uid == this.currentuser.uid);
    });
    this.finPartie();
  }

  ngOnInit() {

  }

  getPlayersNameAndPicture(){
    this.afDB.database.ref("/games/").child(this.GAMEID).child('players').once("value", (parentSnapshot, prevChildKey) => {
      parentSnapshot.forEach((childSnapshot)=> {
        this.afDB.database.ref("/users/").child(childSnapshot.val().uid).once("value", (snapshot, prevChildKey2) => {
          let playerD = new playerDisplay(childSnapshot.val().uid,snapshot.val().pseudo, snapshot.val().profile_picture, this.afSG);
          this.playersDisplay.push(playerD);
        });
      });
    });
  }

  changeEtat(etatParam:string){
    if(etatParam == "mine"){
      this.afDB.database.ref("/games").child(this.GAMEID).transaction(function(game) {
        game.playerEnAttente++;
        return game;
      });
    }else if(etatParam == "rentre"){
      this.afDB.database.ref("/games").child(this.GAMEID).transaction(function(game) {
        game.nb_joueurs_camp++;
        game.nb_joueurs_mine--;
        game.playerEnAttente++;
        return game;
      });
    }

    // on change l'état du joueur qui a cliqué et on passe son status en attente (permet de limiter les actions du joueurs)
    let ref = this.afDB.database.ref("/games/").child(this.GAMEID).child("players").orderByChild("uid").equalTo(this.currentuser.uid);
    ref.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        console.log("fait");
        childSnapshot.ref.update({
          "etat" : etatParam,
          "status": 'attente'
        });
      });
    })
  }

  finPartie(){

  }

}
