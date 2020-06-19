import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-classement-nb-parties',
  templateUrl: './classement-nb-parties.page.html',
  styleUrls: ['./classement-nb-parties.page.scss'],
})
export class ClassementNbPartiesPage implements OnInit {

  classementPartie: entry[] = [];

  constructor(private afDB : AngularFireDatabase, private afSG : AngularFireStorage) { }

  ngOnInit() {
    this.classementPartie = [];
    this.afDB.database.ref("users").orderByChild("nb_parties").once("value", (parentSnapshot, prevChildKey) => {
      parentSnapshot.forEach((childSnapshot)=> {
        console.log(childSnapshot.val().pseudo);
        this.classementPartie.push(new entry(childSnapshot.val().pseudo, childSnapshot.val().nb_parties, childSnapshot.val().profile_picture));
      });
    }).then(()=>{
      this.classementPartie.forEach((element, index, array) =>{
        this.afSG.storage.ref(array[index].imageURL).getDownloadURL().then(url => {
          array[index].imageURL = url;
        });
      });
      this.classementPartie = this.classementPartie.slice().reverse();
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