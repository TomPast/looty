
// A chaque fois qu'on passe à une nouvelle manche, on tire au hasard les cartes de jeu.
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import increment = firebase.database.ServerValue.increment;

exports.onNewManche = functions
    .region('europe-west1')
    .database
    .ref('/games/{gameID}/manche')
    .onUpdate((snapshot, context) => {
        let foo : Array<number> = [1,1,2,2,3,3,4,5,5,7,9,9,11,11,13,14,14,15,17,20,20,20,21,21,21,22,22,22,23,23,23,24,24,24];
        foo = melange(foo);

        let nb_joueurs = 0;
        return snapshot.after.ref.parent!.child('nb_joueurs_total').once('value').then((data)=>{
            nb_joueurs = data.val();
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
            }).then(() => {
                admin.database().ref("/games").child(context.params.gameID).update({
                    cartes : foo,
                    carte_en_cours : 0,
                    playerEnAttente : 0,
                    nb_joueurs_mine : nb_joueurs,
                    nb_joueurs_camp : 0,
                    nb_diamant_attente : 0
                });
            });
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
