import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {player} from "../data/game";
import {AngularFireStorage} from "@angular/fire/storage";


@Component({
  selector: 'app-classement-defaites',
  templateUrl: './classement-defaites.page.html',
  styleUrls: ['./classement-defaites.page.scss'],
})



export class ClassementDefaitesPage implements OnInit {
  classementDefaite: entry[] = [];

  constructor(private afDB : AngularFireDatabase, private afSG : AngularFireStorage) { }


  ngOnInit() {
    this.classementDefaite = [];
    this.afDB.database.ref("users").orderByChild("nb_defaites").once("value", (parentSnapshot, prevChildKey) => {
      parentSnapshot.forEach((childSnapshot)=> {
        console.log(childSnapshot.val().pseudo);
        this.classementDefaite.push(new entry(childSnapshot.val().pseudo, childSnapshot.val().nb_defaites, childSnapshot.val().profile_picture));
      });
    }).then(()=>{
      this.classementDefaite.forEach((element, index, array) =>{
        this.afSG.storage.ref(array[index].imageURL).getDownloadURL().then(url => {
          array[index].imageURL = url;
        });
      });
      this.classementDefaite = this.classementDefaite.slice().reverse();
    })
  }

}
export class entry {
  pseudo: string = '';
  nb: number = 0;
  imageURL : string = '';

  constructor(pseudo :string, nb:number, imageURL:string){
    this.pseudo = pseudo;
    this.nb = nb;
    this.imageURL = imageURL;
  }
}