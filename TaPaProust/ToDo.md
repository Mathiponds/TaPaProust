Front 

- [ ] Ajouter mes livres
- [ ] Système de favoris
- [ ] Autocompletion dans la recherche
- [ ] Pouvoir passer d'un input à l'autre
- [ ] Page mon profil
- [ ] Regarder comment mettre l'appli sur internet 

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