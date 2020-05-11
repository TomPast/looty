export class game {
    carte_en_cours: number = 0;
    cartes: number[] = [99, 98, 97];
    manche: number = 2;
    nb_joueur_camp: number = 0;
    nb_joueur_mine: number = 0;
    nb_joueur_total: number = 0;
    playerEnAttente: string = '';
    playerEnJeu: any[];
    players = new Map<string, player>();
}

export class player{
    etat:string= "mine";
    nb_diamant_manche:number= 0;
    nb_diamant_total:number= 0;
    num_joueur:number= 0;
    status:string= "jeu2";
}

export class playerDisplay{
    constructor(pseudo:string,imageURL:string){
        this.pseudo = pseudo;
        this.imageURL = imageURL;
    }
    pseudo:string='test';
    imageURL:string='test';
}
