import { Component, OnInit } from '@angular/core';
import {MenuController, ToastController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import {AngularFireStorage} from '@angular/fire/storage';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx'
import { LoadingController, AlertController } from '@ionic/angular';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
  imagePath: string;
  upload: any;

  dataUser = {
    uid : '',
    email: '',
    password: '',
    pseudo: '',
    imgURL : ''
  };

  imageLoaded : boolean;

  constructor(public menu: MenuController,
              public afAuth: AngularFireAuth,
              public toastController: ToastController,
              public adDb : AngularFireDatabase,
              public afSG: AngularFireStorage,
              public camera : Camera,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public router: Router) {

    this.imageLoaded = false;

  }

  ionViewWillEnter() {
    //this.menu.enable(false);
  }

  ngOnInit() {
  }

  signUp() {
    console.log(this.dataUser.pseudo);
    if((this.imageLoaded) && (this.dataUser.pseudo != '') && (this.dataUser.email != '') && (this.dataUser.password != '')){
      this.afAuth.createUserWithEmailAndPassword(this.dataUser.email, this.dataUser.password)
          .then((data) => {
            console.log('uid',data.user.uid);
            this.dataUser.uid = data.user.uid;
            console.log('Connexion réussie');
            var user = firebase.auth().currentUser;
            var imagePath = 'user:'+data.user.uid+'/profilepic/'+ 'profilepicture.jpg';
            this.dataUser.imgURL = imagePath;
            user.updateProfile({
              displayName: this.dataUser.pseudo,
              photoURL: imagePath
            })
            this.uploadFirebase(data.user.uid).then(()=>{
              console.log('Image Path'+ imagePath);
            });
          }).catch(err => {
        this.toastMessage("Email ou mot de passe incorrect");
        console.log('Erreur: ' + err);
      });
    }else{
      this.toastMessage("Informations manquantes");
    }
  };

  async toastMessage(msg : string) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    await toast.present();
  }

  writeUserData(userId, email, pseudo, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      pseudo: pseudo,
      email: email,
      profile_picture : imageUrl,
      nb_parties : 0,
      nb_victoires : 0,
      nb_defaites : 0,
      partie_en_cours: ''
    });

  }

  async addPhoto(source: string) {
    if (source === 'library') {
      console.log('library');
      const libraryImage = await this.openLibrary();
      this.image = 'data:image/jpg;base64,' + libraryImage;
      this.imageLoaded = true;
    } else {
      console.log('camera');
      const cameraImage = await this.openCamera();
      this.image = 'data:image/jpg;base64,' + cameraImage;
      this.imageLoaded = true;
    }
  }

  async openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 100,
      targetHeight: 100,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    return await this.camera.getPicture(options);
  }

  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 100,
      targetHeight: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }

  async uploadFirebase(profileUID: string) {
    const loading = await this.loadingController.create();
    await loading.present();
    this.imagePath = 'user:'+profileUID+'/profilepic/'+ 'profilepicture.jpg';
    this.upload = this.afSG.ref(this.imagePath).putString(this.image, 'data_url');
    this.upload.then(async () => {
      this.image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Compte crée',
        message: 'Votre compte a bien été crée !',
        buttons: ['OK']
      });
      await alert.present().then( data => {
        this.writeUserData(this.dataUser.uid, this.dataUser.email, this.dataUser.pseudo, this.dataUser.imgURL);
        this.router.navigateByUrl('/mon-compte');
      });
    });
  }


}
