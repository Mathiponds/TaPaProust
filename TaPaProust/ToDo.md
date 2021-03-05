Front 

- [x] Ajouter mes livres
- [x] Système de favoris
- [x] Améliorer la recherche
- [x] Pouvoir passer d'un input à l'autre
- [ ] Page mon profil
- [x] Regarder comment mettre l'appli sur internet
- [ ] l'app cherche directement dès le début _> gérer mieux les font
- [x] regarder l'état dans le modifier livre et dans verfication 
- [x] regarder comment recharger les livres après la modification
- [x] api pour register
- [x] envoyer un mail après la registration
- [x] verifier toutes les input pour le register
- [x] bouton pour quand on a vendu le livre
- [x] refaire message What's app
- [ ] ajout photo dans la db
- [x] restructurer les fichiers
- [x] faire en sorte que quand on appuie à coté dans le login ça enlève le clavier
- [ ] s'occuper des erreur de l'API
- [ ] regarder si dans l'API on peut utiliser application/x-www-form-urlencoded
- [ ] enlever le bottomtab quand le clavier monte
- [ ] bloquer les /admin

API

// essayer de faire en sorte s'il y a une petite faute d'ortographe ce soit pas grave
getBooks(String title, String author, string edition)

// lien pour enlever le livre dans le message 
booksold(long bookId, long secureBookId)

addToFavorites(long bookId)
removeFromFavorites(long bookId)

modifyNumber(Principal principal)
modifyPassWord(Principal principal)

Ajouter de la sécurité dans les request surtout sur les post ou les gens ne puissent pas faire n'importe quoi
