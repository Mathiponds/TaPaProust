package tapaproust.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tapaproust.backend.entity.Book;
import tapaproust.backend.entity.Favorite;
import tapaproust.backend.entity.User;
import tapaproust.backend.repository.FavoriteRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {
    @Autowired
    private UserService userService;
    @Autowired
    private BookService bookService;
    @Autowired
    private FavoriteRepository favoriteRepository;

    public void addToFavorites(long userId, long bookId) {
        Favorite favorite = new Favorite();
        User u = userService.getUserById(userId);
        Book b = bookService.getBookById(bookId);
        favorite.setUser(u);
        favorite.setBook(b);
        favoriteRepository.save(favorite);
    }

    public void removeFromFav(long userId, long bookId) {
        User u = userService.getUserById(userId);
        Book b = bookService.getBookById(bookId);
        Favorite f = checkFavoriteExists(favoriteRepository.findByUserAndBook(u,b), "user and book", u.getId()+""+b.getId());
        favoriteRepository.delete(f);
    }

    public List<Book> getFavBooksOfUser(User u) {
        List<Book> lb = new ArrayList<>();
        for(Favorite f : favoriteRepository.findByUser(u)){
            lb.add(f.getBook());
        }
        return new ArrayList<>(lb);
    }

    private Favorite checkFavoriteExists(Optional<Favorite> of, String name, String value){
        if(!of.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "favorite with "+name+" : " + value + " not found");
        }
        return of.get();
    }
}
