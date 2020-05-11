import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import increment = firebase.database.ServerValue.increment;

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

let players : any[];


// A chaque fois qu'un joueur passe en attente d'une partie, on vérifie si on a atteint NUM_PLAYERS joueurs en attente et si c'est le cas on crée une partie
exports.onNewPlayer = functions
    .region('europe-west1')
    .database
    .ref('/waitingRoom/{playerId}')
    .onCreate((snapshot, context) => {
        let parent = admin.database().ref("/waitingRoom");
        parent.once("value")
            .then(function(parentSnapshot) {
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
                        admin.database().ref("/games/"+GameId).child("players").child(String(childSnapshot.key)).update({
                            num_joueur : index,
                            etat : 'mine',
                            status : 'jeu',
                            nb_diamant_total : 0,
                            nb_diamant_manche : 0
                        })
                        index++;
                    });

                    admin.database().ref("/games").child(GameId).update({//On crée une partie avec les joueurs dedans
                        manche : 1,
                        playerEnAttente : '',
                        playerEnJeu : players,
                        nb_joueurs_total : numChildren,
                        nb_joueurs_mine : numChildren,
                    })
                }
            })
        return null;
    });

// A chaque fois qu'on passe à une nouvelle manche, on tire au hasard les cartes de jeu.
exports.onNewManche = functions
    .region('europe-west1')
    .database
    .ref('/games/{gameID}/manche')
    .onUpdate((snapshot, context) => {
        let foo = Array.from(Array(30).keys());
        foo = melange(foo);

        let nb_joueurs = 0;
        admin.database().ref("/games/"+context.params.gameID+"/nb_joueurs_total").once("value").then(function(parentSnapshot) {
            nb_joueurs= parentSnapshot.val();
            admin.database().ref("/games").child(context.params.gameID).update({
                cartes : foo,
                carte_en_cours : 0,
                playerEnAttente : '',
                nb_joueurs_mine : nb_joueurs,
                nb_joueurs_camp : 0
            })
        })


        return null;
    });

exports.onFinMancheMine = functions
    .region('europe-west1')
    .database
    .ref('/games/{gameID}/nb_joueurs_camp')
    .onWrite((snapshot, context) => {
        admin.database().ref("/games/"+context.params.gameID+"/nb_joueurs_camp").once("value").then(function(Snapshot) {
            let nb_joueurs = 0;
            if(Snapshot.key != null && Snapshot.val()!=0) {
                admin.database().ref("/games/" + context.params.gameID + "/nb_joueurs_total").once("value").then(function(parentSnapshot) {
                    nb_joueurs = parentSnapshot.val();
                    console.log("VALEUR : " + Snapshot.val());
                    console.log("NBJOUEUR : " + nb_joueurs);
                    if (nb_joueurs == +Snapshot.val()) {
                        //FIN DE LA MANCHE
                        admin.database().ref("/games").child(context.params.gameID).update({
                            manche: increment(1)
                        })
                    }
                })
            }
        })
        return null;
    });

exports.onFirstManche = functions
    .region('europe-west1')
    .database
    .ref('/games/{gameID}/manche')
    .onCreate((snapshot, context) => {

        let foo = Array.from(Array(30).keys());
        foo = melange(foo);

        let nb_joueurs = 0;
        admin.database().ref("/games/"+context.params.gameID+"/nb_joueurs_total").once("value").then(function(parentSnapshot) {
            nb_joueurs= parentSnapshot.val();
            admin.database().ref("/games").child(context.params.gameID).update({
                cartes : foo,
                carte_en_cours : 0,
                playerEnAttente : '',
                nb_joueurs_mine : nb_joueurs,
                nb_joueurs_camp : 0
            }).then(function(Snapshot) {
                admin.database().ref("/games/"+context.params.gameID+"/players").once("value").then(function(parentSnapshot) {
                    parentSnapshot.forEach(function(childSnapshot) {
                        console.log("TEST : "+context.params.gameID);
                        admin.database().ref("/users").child(String(childSnapshot.key)).update({
                            partie_en_cours: context.params.gameID
                        })
                    });
                });
            });
        })
        return null;
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
