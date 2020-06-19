import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import increment = firebase.database.ServerValue.increment;

exports.onFinTour = functions //DES QUE TOUS LES JOUEURS SONT EN ATTENTE, C'EST LA FIN DU TOUR -> les joueurs en mine ne sont plus en attente
    .region('europe-west1')
    .database
    .ref('/games/{gameID}/playerEnAttente')
    .onUpdate((snapshot, context) => {
        let nb_playerattente:number;
        nb_playerattente= snapshot.after.val();
        if(nb_playerattente>0){
            let nb_player_total =0;
            let nb_player_camp =0;

            return snapshot.after.ref.parent!.child('nb_joueurs_total').once('value').then((data) => {
                nb_player_total = data.val();
            }).then(() => {
                snapshot.after.ref.parent!.child('nb_joueurs_camp').once('value').then((data2) => {
                    nb_player_camp = data2.val();
                }).then(() => {
                    if (nb_player_total == nb_player_camp){
                        console.log('Appel distribution diamant attente');
                        distribution(context.params.gameID).then(() => {
                            admin.database().ref("/games").child(context.params.gameID).update({
                                manche: increment(1)
                            })
                        });
                    } else if (nb_playerattente == nb_player_total) { //FIN DU TOUR -> on reset le nombre de joueur en attente
                        console.log('Appel distribution diamant attente');
                        distribution(context.params.gameID).then(() => {
                            snapshot.after.ref.set(nb_player_camp).then(() => {
                                admin.database().ref('/games/'+context.params.gameID+'/players').orderByChild('etat').equalTo('mine').once('value').then((snapshot) => {
                                    snapshot.forEach((childSnapshot) => {
                                        childSnapshot.ref.child('status').set('jeu');
                                    });
                                });
                                admin.database().ref("/games").child(context.params.gameID).update({
                                    carte_en_cours: increment(1)
                                });
                            });
                        });
                    }
                });
            });
        }
        return;
    });



function distribution(gameID : string){
    let nb_diamant_attente = 0;
    let nb_diamant_distribue = 0;
    //Récupération valeur diamant en attente
    return admin.database().ref('/games/'+gameID).child('nb_diamant_attente').once('value').then((data) => {
        nb_diamant_attente = data.val();
        let nb_joueur_rentre = 0;
        //Récupération nb joueur qui viennent de rentrer
        admin.database().ref('/games/'+gameID+'/players').orderByChild('etat').equalTo('rentre').once('value').then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                nb_joueur_rentre++;
            });
            if(nb_joueur_rentre > 0){
                console.log('nb_diamant_attente = '+ nb_diamant_attente + ' | nb joueur = '+nb_joueur_rentre);
                //Distribution des diamants en attente + maj des états
                admin.database().ref('/games/'+gameID+'/players').orderByChild('etat').equalTo('rentre').once('value').then((snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        nb_diamant_distribue += Math.floor(nb_diamant_attente/nb_joueur_rentre);
                        let nb_diamant_manche = childSnapshot.val().nb_diamant_manche;
                        childSnapshot.ref.update({
                            etat : 'camp',
                            nb_diamant_total : increment(Math.floor(nb_diamant_attente/nb_joueur_rentre)+nb_diamant_manche),
                            nb_diamant_manche : 0
                        });
                    });
                }).then(() => {
                    admin.database().ref('/games/'+gameID).update({
                        nb_diamant_attente: nb_diamant_attente-nb_diamant_distribue
                    });
                })
            }
        });
    })
}
