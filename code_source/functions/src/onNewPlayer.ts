import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';



let players : any[];


// A chaque fois qu'un joueur passe en attente d'une partie, on vérifie si on a atteint NUM_PLAYERS joueurs en attente et si c'est le cas on crée une partie
exports.onNewPlayer = functions
    .region('europe-west1')
    .database
    .ref('/waitingRoom/{playerId}')
    .onCreate((snapshot, context) => {
        let parent = admin.database().ref("/waitingRoom");
        parent.once("value").then(function(parentSnapshot) {
            let NUM_PLAYERS = 2;
            let numChildren = parentSnapshot.numChildren();
            if(numChildren >= NUM_PLAYERS){
                console.log("Création de jeu");
                let GameId = '';
                players = [];
                parentSnapshot.forEach(function(childSnapshot) {
                    players.push(childSnapshot.key);
                    GameId += childSnapshot.key;

                    let ref = admin.database().ref('waitingRoom/'+ childSnapshot.key);//On retire les joueurs de la salle d'attente
                    ref.remove();
                });

                let index = 0;
                parentSnapshot.forEach(function(childSnapshot) {
                    admin.database().ref("/games/"+GameId).child("players").child(index.toString()).update({
                        uid : String(childSnapshot.key),
                        etat : 'mine',
                        status : 'jeu',
                        nb_diamant_total : 0,
                        nb_diamant_manche : 0
                    })
                    index++;
                    admin.database().ref("/users").child(String(childSnapshot.key)).update({
                        partie_en_cours: GameId
                    })
                });
                let foo : Array<number> = [1,1,2,2,3,3,4,5,5,7,9,9,11,11,13,14,14,15,17,20,20,20,21,21,21,22,22,22,23,23,23,24,24,24];
                foo = melange(foo);
                admin.database().ref("/games").child(GameId).update({//On crée une partie avec les joueurs dedans
                    cartes : foo,
                    manche : 1,
                    carte_en_cours : 0,
                    playerEnAttente : 0,
                    nb_joueurs_total : numChildren,
                    nb_joueurs_mine : numChildren,
                    nb_diamant_attente : 0,
                    nb_joueurs_camp : 0
                }).then((value)=>{return null;});
            }
        })
    });

//Permet de mélanger les cartes de manière aléatoire (Mélange de Fisher-Yates)
//Source de l'algorithme : https://github.com/Daplie/knuth-shuffle
function melange(array: any[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

