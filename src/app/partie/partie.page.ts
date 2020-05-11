import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {game, player, playerDisplay} from '../data/game';

@Component({
  selector: 'app-partie',
  templateUrl: './partie.page.html',
  styleUrls: ['./partie.page.scss'],
})



export class PartiePage implements OnInit {

  GAMEID = '';
  GAME: game;
  playersDisplay= new Map<string, playerDisplay>();

  constructor(private route: ActivatedRoute,private afDB : AngularFireDatabase) {
    this.GAME = new game();
  }

  ionViewWillEnter(){
    this.GAMEID = this.route.snapshot.params['GAMEID'];
    this.afDB.database.ref('/games/').child(this.GAMEID).on("value", (snapshot, prevChildKey) => {
      this.GAME = snapshot.val();
      console.dir(snapshot.val());

      console.log(this.GAME.manche);
      console.log(this.GAME.cartes[0]);
      console.log(this.GAME.playerEnJeu[0]);
    })
    console.dir(this.GAME);
    this.getPlayers();
    this.getPlayersNameAndPicture()
    console.dir(this.GAME);
  }

  ngOnInit() {
  }

  getPlayers(){
    this.afDB.database.ref("/games/").child(this.GAMEID).child('players').on("value", (parentSnapshot, prevChildKey) => {
      parentSnapshot.forEach((childSnapshot)=> {
        console.log(childSnapshot.key);
        this.GAME.players.set(childSnapshot.key,childSnapshot.val());
      });
    });
  }

  getPlayersNameAndPicture(){
    this.afDB.database.ref("/games/").child(this.GAMEID).child('players').on("value", (parentSnapshot, prevChildKey) => {
      parentSnapshot.forEach((childSnapshot)=> {
        console.log(childSnapshot.key);
        this.afDB.database.ref("/users/").child(String(childSnapshot.key)).once("value", (snapshot, prevChildKey2) => {
          let playerD = new playerDisplay(snapshot.val().pseudo, snapshot.val().profile_picture);
          console.dir(playerD);
          this.playersDisplay.set(snapshot.key,playerD);
        });
      });
    });
  }

}
