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

  // Fonction de connexion (vérification de l'email et du password)
  login() {
    this.afAuth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password)
    .then(() => {
      console.log('Connexion réussie');
      this.dataUser = {
        email: '',
        password: ''
      };
      this.router.navigateByUrl('/mon-compte'); // Redirection vers la page mon compte
    }).catch(err => {
      this.loginError();
      console.log('Erreur: ' + err);
    });
  }

  connected: boolean;

  ngOnInit() {
  }

  // Erreur de login un toast apparait
  async loginError() {
    const toast = await this.toastController.create({
      message: 'Adresse email ou mot de passe incorrect.',
      position: 'top',
      duration: 2000
    });
    await toast.present();
  }

}
