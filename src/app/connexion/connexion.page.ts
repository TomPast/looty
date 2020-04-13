import { Component, OnInit } from '@angular/core';
import {MenuController, ToastController} from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})



export class ConnexionPage implements OnInit {

  constructor(public menu: MenuController, public router: Router, public afAuth: AngularFireAuth, public afDB : AngularFireDatabase, public toastController: ToastController) {

  }

  dataUser = {
    email: '',
    password: ''
  };

  login() {
    this.afAuth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password)
    .then(() => {
      console.log('Connexion réussie');
      this.dataUser = {
        email: '',
        password: ''
      };
      this.router.navigateByUrl('/mon-compte');
    }).catch(err => {
      console.log('Erreur: ' + err);
    });
  }

  connected: boolean;

  ngOnInit() {
  }

  async loginError() {
    const toast = await this.toastController.create({
      message: 'Adresse email ou mot de passe incorrect.',
      position: 'top',
      duration: 2000
    });
    await toast.present();
  }

}
