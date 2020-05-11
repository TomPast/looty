import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {game} from '../data/game';

@Component({
  selector: 'app-partie',
  templateUrl: './partie.page.html',
  styleUrls: ['./partie.page.scss'],
})



export class PartiePage implements OnInit {

  GAMEID = '';
  GAME: game;

  constructor(private route: ActivatedRoute,private afDB : AngularFireDatabase) {
    this.GAME = new game();
  }

  ionViewWillEnter(){
    /*this.GAMEID = this.route.snapshot.params['GAMEID'];
    this.afDB.database.ref('/games/').child(this.GAMEID).on("value", (snapshot, prevChildKey) => {
      this.GAME = snapshot.val();
      console.log(this.GAME.manche);
      console.log(this.GAME.cartes[0]);
      console.log(this.GAME.playerEnJeu[0]);
    })*/
  }

  ngOnInit() {


  }


}
