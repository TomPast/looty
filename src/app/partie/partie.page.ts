import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {game, player, playerDisplay} from '../data/game';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-partie',
  templateUrl: './partie.page.html',
  styleUrls: ['./partie.page.scss'],
})



export class PartiePage implements OnInit {

  GAMEID = '';
  GAME: game;
  players = new Array<player>();
  playersDisplay= new Array<playerDisplay>();

  constructor(private route: ActivatedRoute,private afDB : AngularFireDatabase,private afSG : AngularFireStorage) {
    this.GAME = new game();
  }

  ionViewWillEnter(){

  }

  ngOnInit() {
    this.GAMEID = this.route.snapshot.params['GAMEID'];
    this.afDB.database.ref('/games/').child(this.GAMEID).on("value", (snapshot, prevChildKey) => {
      this.GAME = snapshot.val();
      console.dir(snapshot.val());

      console.log(this.GAME.manche);
      console.log(this.GAME.cartes[0]);
      console.log(this.GAME.playerEnJeu[0]);
      console.dir(this.GAME.players);
    })
    console.dir(this.GAME.players);
    this.getPlayers();
    this.getPlayersNameAndPicture()
    console.log(Array.isArray(this.playersDisplay));
  }

  getPlayers(){
    this.afDB.database.ref("/games/").child(this.GAMEID).child('players').on("value", (parentSnapshot, prevChildKey) => {
      this.players = new Array<player>();
      parentSnapshot.forEach((childSnapshot)=> {
        console.log(childSnapshot.key);
        this.players.push(childSnapshot.val());
      });
    });
  }

  getPlayersNameAndPicture(){
    this.afDB.database.ref("/games/").child(this.GAMEID).child('players').once("value", (parentSnapshot, prevChildKey) => {
      parentSnapshot.forEach((childSnapshot)=> {
        console.log(childSnapshot.key);
        this.afDB.database.ref("/users/").child(String(childSnapshot.key)).once("value", (snapshot, prevChildKey2) => {
          let playerD = new playerDisplay(snapshot.val().pseudo, snapshot.val().profile_picture, this.afSG);
          console.dir(playerD);
          this.playersDisplay.push(playerD);
        });
      });
    });
    console.log(Array.isArray(this.playersDisplay));
  }

}
