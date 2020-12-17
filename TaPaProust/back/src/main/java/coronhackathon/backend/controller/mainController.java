package coronhackathon.backend.controller;

import coronhackathon.backend.entity.Book;
import coronhackathon.backend.service.BookService;
import coronhackathon.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
public class mainController {
    @Autowired
    private UserService userService;
    @Autowired
    private BookService bookService;

    @GetMapping("/")
    public String hello(@RequestParam(defaultValue = "Moi") String name){ //Ajouter ?name=Votreprenom à la fin de l'URL
        return "Je m'appelle "+name;
    }

    // get all users with a certain title, author and edition
    // essayer de faire en sorte que si une entrée est vide ça soit pas un problème
    // et que s'il y a une petite faute d'ortographe ce soit pas grave
    @GetMapping("/api/getBooks")
    public List<Book> getBooks(@RequestParam String title,
                               @RequestParam String author,
                               @RequestParam String edition){
        return null;
    }


    @PostMapping("/api/addBook")
    public void addBook(@RequestBody Book book) {

    }

    @PostMapping("/api/modifyBook")
    public void modifyBook(@RequestParam long bookId, @RequestBody Book book){

    }

    @GetMapping("/api/addToFav")
    public void addToFavorites(@RequestParam long bookId){

    }

    @GetMapping("/api/removeFromFav")
    public void removeFromFavorites(@RequestParam long bookId){

    }

    // lien pour enlever le livre dans le message
    @GetMapping("/api/bookSold")
    public void bookSold(@RequestParam long bookId, @RequestParam long secureBookId){}

    @PostMapping("/api/modifyUserNumber")
    public void modifyNumber(Principal principal, @RequestParam String newNumber){

    }

    @PostMapping("/api/modifyUserPW")
    public void modifyPassWord(Principal principal){

    }


}
