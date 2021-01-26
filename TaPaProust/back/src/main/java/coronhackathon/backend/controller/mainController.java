package coronhackathon.backend.controller;

import coronhackathon.backend.entity.Book;
import coronhackathon.backend.entity.User;
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
    public String hello(@RequestParam String name){ //Ajouter ?name=Votreprenom à la fin de l'URL
        return "Je m'appelle "+name;
    }

    @RequestMapping(path = "/helle/{name}", method = RequestMethod.GET)
    public String test2(@PathVariable String name){ //Ajouter ?name=Votreprenom à la fin de l'URL
        return "Je m'appelle "+name;
    }

//    @GetMapping("/book")
//    public Book getBook(){ //Ajouter ?name=Votreprenom à la fin de l'URL
//        return new Book();
//    }

    // get all users with a certain title, author and edition
    // essayer de faire en sorte que si une entrée est vide ça soit pas un problème
    // et que s'il y a une petite faute d'ortographe ce soit pas grave
    @GetMapping("/api/getBooks")
    public List<Book> getBooks(@RequestParam (defaultValue = "") String title,
                               @RequestParam (defaultValue = "") String author,
                               @RequestParam (defaultValue = "") String edition){
        System.out.println(title+" "+ author+" "+ edition);
        return bookService.getBooks(title, author, edition);
    }

    @GetMapping("/api/getAllBooks")
    public List<Book> getAllBooks(){
        return bookService.getAllBooks();
    }


//    @PostMapping("/addBook")
//    public void addBook(@RequestBody Book book) {
//        bookService.addBook(book);
//    }

    @PostMapping("/api/addBook")
    public void addBook(Principal principal,
                        @RequestParam String title,
                        @RequestParam String author,
                        @RequestParam String edition,
                        @RequestParam String state,
                        @RequestParam String language,
                        @RequestParam String price) {
        bookService.addBook(title, author, edition, state,
                "math@tapaproust.ch", language, price);
    }

    @PostMapping("/api/modifyBook")
    public void modifyBook(@RequestParam long bookId, @RequestBody Book book){
        bookService.modifyBook(bookId, book);
    }


    @PostMapping("/api/removeBook")
    public void modifyBook(@RequestParam long bookId){
        bookService.removeBook(bookId);
    }


    /*******************************************/
    /*************     USERS       *************/
    /*******************************************/
    @PostMapping("/api/addUser")
    public void addUser(Principal principal,
                        @RequestParam String mail,
                        @RequestParam String pwdHash,
                        @RequestParam String phone) {
        userService.addUser(mail, pwdHash, phone);
    }

    @GetMapping("/api/getAllUsers")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }



    //ToDo
    @GetMapping("/api/addToFav")
    public void addToFavorites(@RequestParam long bookId){

    }

    //ToDo
    @GetMapping("/api/removeFromFav")
    public void removeFromFavorites(@RequestParam long bookId){

    }

    //ToDo
    // lien pour enlever le livre dans le message
    @GetMapping("/api/bookSold")
    public void bookSold(@RequestParam long bookId, @RequestParam long secureBookId){}

    //ToDo
    @PostMapping("/api/modifyUserNumber")
    public void modifyNumber(Principal principal, @RequestParam String newNumber){

    }

    //ToDo
    @PostMapping("/api/modifyUserPW")
    public void modifyPassWord(Principal principal){

    }


}
