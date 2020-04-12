# Looty

Looty est un jeu développé par Tom Pastor dans le cadre du module Développement d'applications mobiles. Celui-ci reprend le principe du jeu [diamant](https://fr.wikipedia.org/wiki/Diamant_(jeu)).


## Avancement

### 12/04/2020 : Création des pages (3h00)
Création des pages statiques en partant de la maquette réalisée précédemment.


### 13/04/2020 : Authentification (5h00)
Pour l'authentification des joueurs dans l'application, j'ai utilisé FireBase Authentification qui est un module permettant la connexion et l'inscription de joueur avec un email et un mot de passe en lui associant un ID unique.

Cependant j'avais aussi besoin d'un pseudonyme et d'une photo de profil. J'ai donc dans un premier temps utilisé FireBase Storage afin d'upload une image depuis le téléphone du joueur sur les serveurs FireBase. J'ai ensuite utilisé le module FireBase Real Time Database, afin de stocker l'ID unique du joueur, son mail, son pseudo ainsi que l'URL de l'image stocké sur le serveur FireBase Storage.

Beaucoup de difficultés + beaucoup de réflexion (comment agencer les modules entre eux), première prise en main du TypeScript...


