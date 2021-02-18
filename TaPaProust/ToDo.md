Front 

- [x] Ajouter mes livres
- [ ] Système de favoris
- [x] Améliorer la recherche
- [x] Pouvoir passer d'un input à l'autre
- [ ] Page mon profil
- [x] Regarder comment mettre l'appli sur internet
- [ ] l'app cherche directement dès le début _> gérer mieux les font
- [x] regarder l'état dans le modifier livre et dans verfication 
- [ ] regarder comment recharger les livres après la modification
- [x] api pour register
- [ ] verifier toutes les input pour le register
- [ ] bouton pour quand on a vendu le livre
- [ ] ajout photo dans la db
- [x] restructurer les fichiers
- [ ] faire en sorte que quand on appuie à coté dans le login ça enlève le clavier
- [ ] s'occuper des erreur de l'API
- [ ] regarder si dans l'API on peut utiliser application/x-www-form-urlencoded

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
