# Looty

Looty est un jeu développé par Tom Pastor dans le cadre du module Développement d'applications mobiles. Celui-ci reprend le principe du jeu [diamant](https://fr.wikipedia.org/wiki/Diamant_(jeu)).


## Avancement

### 12/04/2020 : Création des pages (3h00)
Création des pages statiques en partant de la maquette réalisée précédemment.


### 13/04/2020 : Authentification (5h00)
Pour l'authentification des joueurs dans l'application, j'ai utilisé FireBase Authentification qui est un module permettant la connexion et l'inscription de joueur avec un email et un mot de passe en lui associant un ID unique.

Cependant j'avais aussi besoin d'un pseudonyme et d'une photo de profil. J'ai donc dans un premier temps utilisé FireBase Storage afin d'upload une image depuis le téléphone du joueur sur les serveurs FireBase. J'ai ensuite utilisé le module FireBase Real Time Database, afin de stocker l'ID unique du joueur, son mail, son pseudo ainsi que l'URL de l'image stocké sur le serveur FireBase Storage.

Beaucoup de difficultés + beaucoup de réflexion (comment agencer les modules entre eux), première prise en main du TypeScript...

### 15/04/2020 : Mon Compte (1h30)
-Récupération des informations de l'utilisateur connecté : pseudo, mail, nombre de parties jouées, gagnées ainsi que la photo de profil
-Remplissage dynamique de la page avec ces informations

Difficultés : Récupération de la photo de profil à partir de l'URL de l'image stockée sur Firebase Storage

### 17/04/2020 : Système d'attente d'avant partie (5h00)
Je n'avais pas pensé à ça lors de la création de ma maquette. J'ai donc du réfléchir à un système de salle d'attente où les joueurs patientent jusqu'à être 5 et commencer une partie.
On a donc une page qui s'auto-actualise avec les pseudo des joueurs en attente.
Pour cela, dès qu'un joueur passe en attente, on crée une entrée sur la BDD du style : waitingRoom/UserID .
Ensuite on récupère les UID des joueurs en attente puis on récupère ensuite le pseudonyme de ces joueurs et on les affiche.

Je ne voyais vraiment pas comment faire au début pour l'attente et la création d'une salle de jeu + le jeu en lui même. J'ai résolu le premier souci à savoir l'attente des joueurs. Je pense avoir une idée pour ensuite créer la salle de jeu (FireBase Functions)
Cela reste encore très flou, et il y a peu de ressources sur internet expliquant comment utiliser Ionic et Firebase pour créer un jeu en temps réel. Cela me prend donc beaucoup de temps pour lire la doc etc... J'espère vraiment pouvoir finir mon jeu

Difficultés : Prise en main de FireBase Realtime Database (Format de la BDD n'est pas SQL mais un unique arbre JSON) + detection de changement pour actualiser la liste des joueurs en attente en temps réel (changeRef.detectChanges()) + format des requetes 



