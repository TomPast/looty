// Distribution des diamants aux joueurs encore en mine + ajout des diamants restants dans nb_diamant_en_attente + Détection de deux pièges = fin manche
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import increment = firebase.database.ServerValue.increment;

exports.onUpdateCartes = functions
    .region('europe-west1')
    .database
    .ref('/games/{gameID}/carte_en_cours')
    .onWrite((snapshot, context) => {
        console.log('update carte');
        let carte_en_cours = snapshot.after.val();
        let val_carte = 0;
        let nb_joueurs_mine = 0;
        let nb_diamant_distribue = 0;
        return snapshot.after.ref.parent!.child('cartes').child(carte_en_cours).once('value').then((data) => {
            val_carte = data.val();
            console.log(val_carte);
        }).then(() => {
            if (val_carte < 20) {
                console.log('carte valeur');
                //Distribution des diamants aux joueurs encore en mine
                snapshot.after.ref.parent!.child('nb_joueurs_mine').once('value').then((data) => {
                    nb_joueurs_mine = data.val();
                }).then(() => {
                    admin.database().ref('/games/' + context.params.gameID + '/players').orderByChild('etat').equalTo('mine').once('value').then((snapshot) => {
                        snapshot.forEach((childSnapshot) => {
                            nb_diamant_distribue += Math.floor(val_carte / nb_joueurs_mine);
                            childSnapshot.ref.update({
                                nb_diamant_manche: increment(Math.floor(val_carte / nb_joueurs_mine))
                            });
                        });
                    }).then(() => {
                        admin.database().ref('/games/' + context.params.gameID ).update({
                            nb_diamant_attente : increment(val_carte - nb_diamant_distribue)
                        });
                    });
                });
            }else {
                console.log('carte piege');
                //carte piege, on vérifie que l'on en a pas deux pareil -> fin manche
                snapshot.after.ref.parent!.child('cartes').once('value').then((data) => {

                    getDuplicateArrayElements(data.val(),carte_en_cours).forEach(element => {
                        if(element >= 20){ // FIN MANCHE
                            admin.database().ref('/games/' + context.params.gameID + '/players').orderByChild('etat').equalTo('mine').once('value').then((snapshot) => {
                                snapshot.forEach((childSnapshot) => {
                                    childSnapshot.ref.update({
                                        nb_diamant_manche: 0
                                    });
                                });
                            })
                            console.log('2 pieges pareil'+element);
                            admin.database().ref("/games").child(context.params.gameID).update({
                                manche: increment(1)
                            })
                        }
                    });
                })
            }
        });
    });

function getDuplicateArrayElements(arr : Array<number>, index : number){
    var sorted_arr = arr.slice(0,index+1).sort();
    var results = [];
    for (var i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] === sorted_arr[i]) {
            results.push(sorted_arr[i]);
        }
    }
    return results;
}
