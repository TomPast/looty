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
  playersDisplay;

  constructor(private route: ActivatedRoute,private afDB : AngularFireDatabase, private afSG : AngularFireStorage) {
    this.GAME = new game();
  }

  ionViewWillEnter(){
    this.GAMEID = this.route.snapshot.params['GAMEID'];
    this.getPlayersNameAndPicture();
    this.afDB.database.ref('/games/').child(this.GAMEID).on("value", (snapshot, prevChildKey) => {
      this.GAME = snapshot.val();
      console.dir(this.GAME);
      console.log(Array.isArray(this.GAME.players));
      console.log(this.GAME.players[0].status);

    });
  }

  ngOnInit() {

  }

  getPlayers(){
    this.afDB.database.ref("/games/").child(this.GAMEID).child('players').on("value", (parentSnapshot, prevChildKey) => {
      this.players = new Array<player>();
      parentSnapshot.forEach((childSnapshot)=> {
        this.players.push(childSnapshot.val());
      });
    });
  }

  getPlayersNameAndPicture(){
    this.playersDisplay= new Array<playerDisplay>()
    this.afDB.database.ref("/games/").child(this.GAMEID).child('players').once("value", (parentSnapshot, prevChildKey) => {
      parentSnapshot.forEach((childSnapshot)=> {
        this.afDB.database.ref("/users/").child(childSnapshot.val().uid).once("value", (snapshot, prevChildKey2) => {
          let playerD = new playerDisplay(childSnapshot.val().uid,snapshot.val().pseudo, snapshot.val().profile_picture, this.afSG);
          this.playersDisplay.push(playerD);
        });
      });
    });
  }

  getPseudo(UID:string): string{
    this.afDB.database.ref("/users/").child(UID).once("value", (snapshot, prevChildKey2) => {
      console.log(snapshot.val().pseudo);
      return snapshot.val().pseudo;
    });
    return '';
  }

  getImage(UID:string): string{
    this.afDB.database.ref("/users/").child(UID).once("value", (snapshot, prevChildKey2) => {
      let storage = this.afSG.storage;
      let pathReference = storage.ref(snapshot.val().profile_picture);
      pathReference.getDownloadURL().then(url => {
        return url;
      });
    });
    return '';
  }

}
