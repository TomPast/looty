import {storage} from 'firebase';
import {AngularFireStorage} from '@angular/fire/storage';

export class game {
    carte_en_cours: number = 0;
    cartes: number[] = [99, 98, 97];
    manche: number = 2;
    nb_joueur_camp: number = 0;
    nb_joueur_mine: number = 0;
    nb_joueur_total: number = 0;
    playerEnAttente: string = '';
    playerEnJeu: any[];
    players = new Array<player>();
}

export class player{
    etat:string= "mine";
    nb_diamant_manche:number= 0;
    nb_diamant_total:number= 0;
    num_joueur:number= 0;
    status:string= "jeu2";
}

export class playerDisplay{
    constructor(pseudo:string,imageFirebaseURL:string,public afSG : AngularFireStorage){
        this.pseudo = pseudo;
        this.imageFirebaseURL = imageFirebaseURL;
        this.imageURL = '';
        var storage = afSG.storage;
        var pathReference = storage.ref(imageFirebaseURL);
        pathReference.getDownloadURL().then(url => {
            this.imageURL = url;
        });
    }

    pseudo:string='test';
    imageFirebaseURL:string='test';
    imageURL:string='test';
}
