import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class ClassementProviderService {

  constructor(private afDB : AngularFireDatabase, private afSG : AngularFireStorage) { }

  getClassementVictoire(){}

}

