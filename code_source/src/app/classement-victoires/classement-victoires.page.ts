import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-classement-victoires',
  templateUrl: './classement-victoires.page.html',
  styleUrls: ['./classement-victoires.page.scss'],
})
export class ClassementVictoiresPage implements OnInit {

  classementVictoire: entry[] = [];

  constructor(private afDB : AngularFireDatabase, private afSG : AngularFireStorage) { }


  ngOnInit() {
    this.classementVictoire = [];
    //Récupération des joueurs triés par leur nombre de victoires
    this.afDB.database.ref("users").orderByChild("nb_victoires").once("value", (parentSnapshot, prevChildKey) => {
      parentSnapshot.forEach((childSnapshot)=> {
        console.log(childSnapshot.val().pseudo);
        this.classementVictoire.push(new entry(childSnapshot.val().pseudo, childSnapshot.val().nb_victoires, childSnapshot.val().profile_picture));
      });
    }).then(()=>{
      //Télécharge les images de profil des joueurs
      this.classementVictoire.forEach((element, index, array) =>{
        this.afSG.storage.ref(array[index].imageURL).getDownloadURL().then(url => {
          array[index].imageURL = url;
        });
      });
      this.classementVictoire = this.classementVictoire.slice().reverse();
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