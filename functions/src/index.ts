import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import increment = firebase.database.ServerValue.increment;

const onNewPlayer = require('./onNewPlayer');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

exports.onNewPlayer = onNewPlayer.onNewPlayer;

// A chaque fois qu'on passe à une nouvelle manche, on tire au hasard les cartes de jeu.
exports.onNewManche = functions
    .region('europe-west1')
    .database
    .ref('/games/{gameID}/manche')
    .onUpdate((snapshot, context) => {
        let foo = Array.from(Array(30).keys());
        foo = melange(foo);

        let nb_joueurs = 0;
        return snapshot.after.ref.parent!.child('nb_joueurs_total').once('value').then((data)=>{
            nb_joueurs = data.val();
        }).then(()=>{
            admin.database().ref("/games").child(context.params.gameID).update({
                cartes : foo,
                carte_en_cours : 0,
                playerEnAttente : 0,
                nb_joueurs_mine : nb_joueurs,
                nb_joueurs_camp : 0
            });
        }).then(()=>{
            admin.database().ref('/games/'+context.params.gameID+'/players').once('value').then((snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    let nb_diamant_manche = childSnapshot.val().nb_diamant_manche;
                    childSnapshot.ref.update({
                        etat: 'mine',
                        nb_diamant_manche: 0,
                        nb_diamant_total: increment(nb_diamant_manche),
                        status:'jeu'
                    });
                });
            });
        })
    });

exports.onFinTour = functions //DES QUE TOUS LES JOUEURS SONT EN ATTENTE, C'EST LA FIN DU TOUR -> les joueurs en mine ne sont plus en attente
    .region('europe-west1')
    .database
    .ref('/games/{gameID}/playerEnAttente')
    .onUpdate((snapshot, context) => {
        let nb_playerattente:number;
        nb_playerattente= snapshot.after.val();
        let nb_player_total =0;
        let nb_player_camp =0;

        return snapshot.after.ref.parent!.child('nb_joueurs_total').once('value').then((data) => {
            nb_player_total = data.val();
        }).then(() => {
            snapshot.after.ref.parent!.child('nb_joueurs_camp').once('value').then((data2) => {
                nb_player_camp = data2.val();
            }).then(() => {
                if (nb_player_total == nb_player_camp){
                    admin.database().ref("/games").child(context.params.gameID).update({
                        manche: increment(1)
                    })
                } else if (nb_playerattente == nb_player_total) { //FIN DU TOUR -> on reset le nombre de joueur en attente
                    snapshot.after.ref.set(nb_player_camp).then(() => {
                        admin.database().ref('/games/'+context.params.gameID+'/players').orderByChild('etat').equalTo('mine').once('value').then((snapshot) => {
                            snapshot.forEach((childSnapshot) => {
                                console.log('min');
                                childSnapshot.ref.child('status').set('jeu');
                            });
                        });
                    });
                }
            });
        });
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
